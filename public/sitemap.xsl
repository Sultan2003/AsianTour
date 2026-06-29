<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:html="http://www.w3.org/TR/REC-html40"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html>
      <head>
        <title>XML Sitemap</title>
        <style type="text/css">
          body { margin: 0; background: #b7d7ed; color: #555; font-family: Arial, Helvetica, sans-serif; font-size: 14px; }
          .header { margin: 0 2%; padding: 18px 24px 12px; background: #f4f4f4; border-radius: 0 0 6px 6px; text-align: center; font-size: 24px; }
          .header code { display: inline-block; margin-left: 12px; padding: 12px 16px; background: #ddd; border-radius: 5px; color: #4d5b6a; font-size: 20px; font-family: Arial, Helvetica, sans-serif; }
          .count { text-align: center; font-weight: 700; font-size: 18px; margin: 16px 0 36px; }
          .panel { margin: 0 2%; background: #f4f4f4; border-radius: 5px 5px 0 0; padding: 26px 24px 0; }
          .notice { color: #0086c9; font-size: 18px; font-weight: 700; text-decoration: underline; margin: 12px 0 24px; }
          table { width: 100%; border-collapse: collapse; background: #f4f4f4; }
          th { color: #000; font-size: 16px; font-weight: 400; text-align: center; padding: 10px; border-bottom: 1px solid #ddd; }
          td { padding: 5px 6px; border-bottom: 1px solid #d9d9d9; color: #555; white-space: nowrap; }
          td.index { color: #000; text-align: right; width: 28px; padding-right: 8px; }
          td.url { width: 100%; white-space: normal; }
          a { color: #0086c9; font-size: 18px; text-decoration: underline; }
          .pill { display: inline-block; padding: 2px 5px; border: 1px solid #ddd; border-radius: 4px; background: #fafafa; color: #666; font-style: italic; }
        </style>
      </head>
      <body>
        <div class="header">XML Sitemap - <code><xsl:value-of select="substring-before(sitemap:urlset/sitemap:url[1]/sitemap:loc, substring-after(substring-after(sitemap:urlset/sitemap:url[1]/sitemap:loc, '://'), '/'))"/><xsl:value-of select="substring-before(substring-after(sitemap:urlset/sitemap:url[1]/sitemap:loc, '://'), '/')"/>/</code></div>
        <div class="count">The number of pages in this sitemap file: <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></div>
        <div class="panel">
          <div class="notice">↕ Displaying first 1000 entries when viewing in browser, click to expand the full sitemap</div>
          <table>
            <tr><th colspan="2">URL</th><th>Last Modified</th><th>Change Frequency</th><th>Priority</th></tr>
            <xsl:for-each select="sitemap:urlset/sitemap:url[position() &lt;= 1000]">
              <tr>
                <td class="index"><xsl:value-of select="position()"/></td>
                <td class="url"><a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a></td>
                <td><span class="pill"><xsl:value-of select="sitemap:lastmod"/></span></td>
                <td><span class="pill"><xsl:value-of select="sitemap:changefreq"/></span></td>
                <td><span class="pill"><xsl:value-of select="format-number(number(sitemap:priority), '0.0000')"/></span></td>
              </tr>
            </xsl:for-each>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
