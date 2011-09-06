<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" indent="yes"/>
	<xsl:variable name="icons_loc">styles/icons/</xsl:variable>
	<xsl:template match="menu[@type='menubar']/itemsgroup">
		<span menu="none">
			<xsl:attribute name="class">barGroup<xsl:if test="position()=last()">Last</xsl:if></xsl:attribute>
			<xsl:for-each select="item">
				<span class="barMenu" menu="bar">
					<xsl:attribute name="onclick">barMenu_onClick(this);</xsl:attribute>
					<xsl:attribute name="onmouseenter">barMenu_onMouseEnter(this);</xsl:attribute>
					<xsl:attribute name="onmouseleave">barMenu_onMouseLeave(this);</xsl:attribute>
					<xsl:attribute name="context"><xsl:value-of select="action"/></xsl:attribute>
					<xsl:value-of select="title"/>
				</span>
			</xsl:for-each>
		</span>
	</xsl:template>
	<xsl:template match="menu[@type='toolbar']/itemsgroup">
		<span menu="none">
			<xsl:attribute name="class">barGroup<xsl:if test="position()=last()">Last</xsl:if></xsl:attribute>
			<xsl:for-each select="item">
				<span class="barMenu" menu="none" align="absmiddle">
					<xsl:attribute name="onclick"><xsl:value-of select="action"/></xsl:attribute>
					<xsl:attribute name="onmouseenter">barMenu_onMouseEnter(this);</xsl:attribute>
					<xsl:attribute name="onmouseleave">barMenu_onMouseLeave(this);</xsl:attribute>
					<img border="0">
						<xsl:attribute name="src"><xsl:value-of select="$icons_loc"/><xsl:value-of select="icon"/></xsl:attribute>
						<xsl:attribute name="title"><xsl:value-of select="title"/></xsl:attribute>
						<xsl:attribute name="alt"><xsl:value-of select="title"/></xsl:attribute>
					</img>
				</span>
			</xsl:for-each>
		</span>
	</xsl:template>
</xsl:stylesheet>
