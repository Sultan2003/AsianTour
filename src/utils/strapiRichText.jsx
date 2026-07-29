import React from "react";

export const getRichTextPlainText = (value) => {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(getRichTextPlainText).join("\n");
  if (typeof value === "object") {
    if (typeof value.text === "string") return value.text;
    if (Array.isArray(value.children)) return value.children.map(getRichTextPlainText).join("");
    return "";
  }
  return "";
};

const markNode = (node, content, key) => {
  let result = content;
  if (node.bold) result = <strong key={`${key}-b`}>{result}</strong>;
  if (node.italic) result = <em key={`${key}-i`}>{result}</em>;
  if (node.underline) result = <u key={`${key}-u`}>{result}</u>;
  if (node.strikethrough) result = <s key={`${key}-s`}>{result}</s>;
  if (node.code) result = <code key={`${key}-c`}>{result}</code>;
  return result;
};

export const renderRichTextChildren = (children = [], keyPrefix = "rt") =>
  children.map((child, index) => {
    const key = `${keyPrefix}-${index}`;

    if (child.type === "link" && child.url) {
      return (
        <a key={key} href={child.url} target="_blank" rel="noreferrer">
          {renderRichTextChildren(child.children || [], key)}
        </a>
      );
    }

    if (typeof child.text === "string") {
      return markNode(child, child.text, key);
    }

    if (Array.isArray(child.children)) {
      return renderRichTextChildren(child.children, key);
    }

    return null;
  });

export const renderRichTextBlocks = (blocks = [], options = {}) => {
  const { paragraphClassName, skipBlock } = options;

  if (typeof blocks === "string") {
    return blocks.split("\n").map((line, index) => (
      <p key={index} className={paragraphClassName}>{line}</p>
    ));
  }

  if (!Array.isArray(blocks)) return null;

  return blocks.map((block, index) => {
    if (skipBlock?.(block)) return null;

    const children = renderRichTextChildren(block.children || [], `block-${index}`);

    if (block.type === "heading") {
      const HeadingTag = `h${Math.min(Math.max(block.level || 3, 1), 6)}`;
      return <HeadingTag key={index}>{children}</HeadingTag>;
    }

    if (block.type === "list") {
      const ListTag = block.format === "ordered" ? "ol" : "ul";
      return (
        <ListTag key={index}>
          {(block.children || []).map((item, itemIndex) => (
            <li key={itemIndex}>{renderRichTextChildren(item.children || [], `block-${index}-item-${itemIndex}`)}</li>
          ))}
        </ListTag>
      );
    }

    if (block.type === "quote") return <blockquote key={index}>{children}</blockquote>;

    return <p key={index} className={paragraphClassName}>{children}</p>;
  });
};

export const collectRichTextLinks = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value.flatMap(collectRichTextLinks);
  if (typeof value !== "object") return [];

  const ownLink = value.type === "link" && value.url
    ? [{ text: getRichTextPlainText(value.children).trim(), url: value.url }]
    : [];

  return [...ownLink, ...collectRichTextLinks(value.children)];
};

export const isTourConfigBlock = (block) =>
  /\b(Array|Accomodation|Accommodation|Accomadation|Priceinclude)\s*=/i.test(getRichTextPlainText(block));

const TOUR_CONFIG_PATTERN = /\b(Array|Accomodation|Accommodation|Accomadation|Priceinclude)\s*=/i;

const trimNodeAtTourConfig = (node) => {
  if (!node || typeof node !== "object") return node;

  if (typeof node.text === "string") {
    const configIndex = node.text.search(TOUR_CONFIG_PATTERN);
    return configIndex === -1
      ? node
      : { ...node, text: node.text.slice(0, configIndex).trimEnd() };
  }

  if (!Array.isArray(node.children)) return node;

  const children = [];
  for (const child of node.children) {
    const trimmedChild = trimNodeAtTourConfig(child);
    const childText = getRichTextPlainText(trimmedChild);

    if (childText) children.push(trimmedChild);
    if (isTourConfigBlock(child)) break;
  }

  return { ...node, children };
};

export const getVisibleTourDescriptionBlocks = (blocks = []) => {
  if (!Array.isArray(blocks)) return blocks;

  const firstConfigIndex = blocks.findIndex(isTourConfigBlock);
  if (firstConfigIndex === -1) return blocks;

  const visibleBlocks = blocks.slice(0, firstConfigIndex);
  const trimmedBlock = trimNodeAtTourConfig(blocks[firstConfigIndex]);

  if (getRichTextPlainText(trimmedBlock).trim()) visibleBlocks.push(trimmedBlock);
  return visibleBlocks;
};
