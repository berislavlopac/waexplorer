<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:attribute-set name="hr_style">
		<xsl:attribute name="align">right</xsl:attribute>
		<xsl:attribute name="width">178</xsl:attribute>
		<xsl:attribute name="size">1</xsl:attribute>
		<xsl:attribute name="noshade">noshade</xsl:attribute>
	</xsl:attribute-set>
	<xsl:attribute-set name="menu_icon_style">
		<xsl:attribute name="class">menuIcon</xsl:attribute>
		<xsl:attribute name="src">styles/icons/<xsl:value-of select="icon"/>.gif</xsl:attribute>
		<xsl:attribute name="width">16</xsl:attribute>
		<xsl:attribute name="height">16</xsl:attribute>
	</xsl:attribute-set>
	<xsl:attribute-set name="submenu_pointer">
		<xsl:attribute name="src">styles/arro.gif</xsl:attribute>
		<xsl:attribute name="border">0</xsl:attribute>
	</xsl:attribute-set>
</xsl:stylesheet>
