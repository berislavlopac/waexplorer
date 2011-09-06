<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="xml" indent="yes"/>
	<xsl:include href="../styles/style_menu.xslt"/>
	<xsl:variable name="default_target">contentHolder</xsl:variable>
	<xsl:template match="/">
		<div id="waMenuMain">
			<xsl:for-each select="menu/itemsgroup">
				<xsl:if test="position() > 1">
					<xsl:element name="hr" use-attribute-sets="hr_style"/>
				</xsl:if>
				<xsl:for-each select="item">
					<div oncontextmenu="this.click();return false;" class="menuItem">
						<xsl:attribute name="onmouseenter">this.className = 'menuItemOver';</xsl:attribute>
						<xsl:attribute name="onmouseleave">this.className = 'menuItem';</xsl:attribute>
						<xsl:choose>
							<xsl:when test="action/@type='url'">
								<xsl:attribute name="onclick">top.document.frames('<xsl:choose><xsl:when test="@target"><xsl:value-of select="action/@target"/></xsl:when><xsl:otherwise><xsl:value-of select="$default_target"/></xsl:otherwise></xsl:choose>').location.href='<xsl:value-of select="action"/>';top.waMenuInstance.close();</xsl:attribute>
								<!-- <xsl:attribute name="title"><xsl:value-of select="action"/></xsl:attribute> -->
							</xsl:when>
							<xsl:when test="action/@type='script'">
								<xsl:attribute name="onclick"><xsl:value-of select="action"/>;top.waMenuInstance.close();</xsl:attribute>
							</xsl:when>
							<xsl:when test="action/@type='submenu'">
								<xsl:attribute name="onmouseenter">this.className = 'menuItemOver'; subMenu = new waMenu(this); subMenu.open(this);</xsl:attribute>
								<xsl:attribute name="onmouseleave">if (event.toElement) { this.className = 'menuItem'; subMenu.close(); }</xsl:attribute>
								<xsl:attribute name="context"><xsl:value-of select="action"/></xsl:attribute>
								<xsl:element name="img" use-attribute-sets="submenu_pointer">
									<xsl:attribute name="class">submenuPointer</xsl:attribute>
								</xsl:element>
							</xsl:when>
							<xsl:otherwise/>
						</xsl:choose>
						<xsl:choose>
							<xsl:when test="icon">
								<xsl:element name="img" use-attribute-sets="menu_icon_style"/>
							</xsl:when>
							<xsl:otherwise>
								<xsl:element name="img" use-attribute-sets="menu_icon_style">
									<xsl:attribute name="src">styles/x.gif</xsl:attribute>
								</xsl:element>
							</xsl:otherwise>
						</xsl:choose>
						<xsl:value-of select="title" disable-output-escaping="yes"/>
					</div>
				</xsl:for-each>
			</xsl:for-each>
		</div>
	</xsl:template>
</xsl:stylesheet>
