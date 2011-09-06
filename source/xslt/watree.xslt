<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" version="1.0" encoding="UTF-8" indent="no"/>
	<xsl:template match="item">
		<xsl:variable name="icons_path">styles/icons/</xsl:variable>
		<div class="menuBranchContainer">
			<div class="menuItemContainer">
				<xsl:if test="@id">
					<xsl:attribute name="id"><xsl:value-of select="@id"/></xsl:attribute>
				</xsl:if>
				<xsl:attribute name="ondragenter">if(draggedItem) { event.returnValue=false; this.parentElement.className = 'menuBranchContainerDragOver' };</xsl:attribute>
				<xsl:attribute name="ondragover">event.returnValue = false; if(event.srcElement == this || this.contains(event.srcElement)) this.parentElement.className = 'menuBranchContainerDragOver';</xsl:attribute>
				<xsl:attribute name="ondragleave">event.returnValue = false; this.parentElement.className = 'menuBranchContainer';</xsl:attribute>
				<xsl:attribute name="ondrop">event.returnValue = false; if(event.srcElement == this || this.contains(event.srcElement)) dropTarget = this.parentElement;</xsl:attribute>
				<xsl:attribute name="ondragstart">draggedItem = this.parentElement;</xsl:attribute>
				<xsl:attribute name="ondragend">if(dropTarget) { dropTarget.parentElement.insertBefore(draggedItem,dropTarget); dropTarget.className = 'menuBranchContainer'; dropTarget = draggedItem = null; };</xsl:attribute>
				<img align="absmiddle" class="plusMinus">
					<xsl:choose>
						<xsl:when test="@subsrc or child::item">
							<xsl:attribute name="style">cursor: pointer;</xsl:attribute>
							<xsl:attribute name="src"><xsl:value-of select="$icons_path"/>plus.gif</xsl:attribute>
							<xsl:attribute name="onclick">openCloseBranch(this.parentElement.nextSibling);</xsl:attribute>
							<xsl:attribute name="subsrc"><xsl:value-of select="@subsrc"/></xsl:attribute>
						</xsl:when>
						<xsl:otherwise>
							<xsl:attribute name="src"><xsl:value-of select="$icons_path"/>x.gif</xsl:attribute>
							<xsl:attribute name="width">9</xsl:attribute>
							<xsl:attribute name="height">9</xsl:attribute>
						</xsl:otherwise>
					</xsl:choose>
				</img>
				<a class="itemTitle">
					<xsl:if test="@context">
						<xsl:attribute name="context"><xsl:value-of select="@context"/></xsl:attribute>
					</xsl:if>
					<xsl:if test="action">
						<xsl:attribute name="class">itemTitleAction</xsl:attribute>
						<xsl:attribute name="href"><xsl:choose><xsl:when test="starts-with(action,'javascript:')"><xsl:value-of select="action"/></xsl:when><xsl:when test="action"><xsl:if test="/tree/@base"><xsl:value-of select="/tree/@base"/></xsl:if><xsl:value-of select="action"/></xsl:when><xsl:otherwise>javascript:void(0);</xsl:otherwise></xsl:choose></xsl:attribute>
					</xsl:if>
					<xsl:if test="@target">
						<xsl:attribute name="target"><xsl:value-of select="@target"/></xsl:attribute>
					</xsl:if>
					<xsl:attribute name="title"><xsl:value-of select="title"/></xsl:attribute>
					<img align="absmiddle">
						<xsl:if test="@context">
							<xsl:attribute name="context"><xsl:value-of select="@context"/></xsl:attribute>
						</xsl:if>
						<xsl:choose>
							<xsl:when test="icon">
								<xsl:attribute name="src"><xsl:value-of select="$icons_path"/><xsl:value-of select="icon"/></xsl:attribute>
							</xsl:when>
							<xsl:otherwise>
								<xsl:attribute name="src"><xsl:value-of select="$icons_path"/>any.gif</xsl:attribute>
							</xsl:otherwise>
						</xsl:choose>
					</img>
					<xsl:value-of select="title"/>
				</a>
			</div>
			<xsl:choose>
				<xsl:when test="@subsrc">
					<div class="subMenu" style="display: none;">
						<xsl:attribute name="subsrc"><xsl:value-of select="@subsrc"/></xsl:attribute>
					</div>
				</xsl:when>
				<xsl:when test="child::item">
					<div class="subMenu" style="display: none;">
						<xsl:apply-templates select="child::item"/>
					</div>
				</xsl:when>
			</xsl:choose>
		</div>
	</xsl:template>
</xsl:stylesheet>
