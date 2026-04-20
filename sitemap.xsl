<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  exclude-result-prefixes="sitemap xhtml">

  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>Sitemap — imin2uk.com</title>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f5f5f5;
            color: #333;
            padding: 40px 20px;
          }
          .container { max-width: 900px; margin: 0 auto; }
          h1 {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 6px;
            color: #111;
          }
          .subtitle {
            font-size: 14px;
            color: #666;
            margin-bottom: 28px;
          }
          .subtitle a { color: #0057b8; text-decoration: none; }
          .subtitle a:hover { text-decoration: underline; }
          table {
            width: 100%;
            border-collapse: collapse;
            background: #fff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 1px 4px rgba(0,0,0,0.08);
          }
          thead { background: #0057b8; color: #fff; }
          th {
            padding: 12px 16px;
            text-align: left;
            font-size: 13px;
            font-weight: 600;
            letter-spacing: 0.03em;
          }
          td {
            padding: 11px 16px;
            font-size: 13px;
            border-bottom: 1px solid #eee;
            vertical-align: middle;
          }
          tr:last-child td { border-bottom: none; }
          tr:hover td { background: #f0f6ff; }
          td a {
            color: #0057b8;
            text-decoration: none;
            word-break: break-all;
          }
          td a:hover { text-decoration: underline; }
          .badge {
            display: inline-block;
            font-size: 11px;
            padding: 2px 8px;
            border-radius: 99px;
            background: #e8f0fe;
            color: #0057b8;
            font-weight: 600;
          }
          .count {
            font-size: 13px;
            color: #555;
            margin-bottom: 12px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Sitemap — imin2uk.com</h1>
          <p class="subtitle">
            This sitemap is for search engines. Visit <a href="https://imin2uk.com/">imin2uk.com</a> to browse the site.
          </p>
          <p class="count">
            <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs indexed
          </p>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>URL</th>
                <th>Last Modified</th>
                <th>Freq</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td><xsl:value-of select="position()"/></td>
                  <td>
                    <a href="{sitemap:loc}">
                      <xsl:value-of select="sitemap:loc"/>
                    </a>
                  </td>
                  <td>
                    <xsl:choose>
                      <xsl:when test="sitemap:lastmod">
                        <xsl:value-of select="substring(sitemap:lastmod, 1, 10)"/>
                      </xsl:when>
                      <xsl:otherwise>—</xsl:otherwise>
                    </xsl:choose>
                  </td>
                  <td>
                    <xsl:choose>
                      <xsl:when test="sitemap:changefreq">
                        <span class="badge"><xsl:value-of select="sitemap:changefreq"/></span>
                      </xsl:when>
                      <xsl:otherwise>—</xsl:otherwise>
                    </xsl:choose>
                  </td>
                  <td>
                    <xsl:choose>
                      <xsl:when test="sitemap:priority">
                        <xsl:value-of select="sitemap:priority"/>
                      </xsl:when>
                      <xsl:otherwise>—</xsl:otherwise>
                    </xsl:choose>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
