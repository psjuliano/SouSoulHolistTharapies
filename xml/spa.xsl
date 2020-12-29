<?xml version = "1.0"?>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:template match="/">
        <xsl:for-each select= "spa/services/entree">
            <xsl:variable name="content" select="item"/>
            <xsl:if test="$content!=''">
                <div class= "col-4 mt-4">
                    <div class= "card text-center">
                        <img>
                            <xsl:attribute name="src">../views/img/<xsl:value-of select="img"/>.jpg</xsl:attribute>   
                        </img>
                        <div class= "card-body">
                            <h5 class="card-title">
                                <xsl:value-of select= "item"/>
                            </h5>
                            <p><xsl:value-of select="description"></xsl:value-of></p>

                            <a href="/schedule" class="btn btn-primary">Book Now</a>
                        </div>
                        <price specialOffer="true">
                            <div class="card-footer price">
                                <xsl:attribute name="specialOffer"><xsl:value-of select="specialOffer"></xsl:value-of></xsl:attribute>
                                <small class="text-muted"> 
                                <xsl:value-of select="price"/>
                                </small>
                            </div>
                        </price>
                    </div>
                </div>
            </xsl:if>
        </xsl:for-each>
    </xsl:template>
</xsl:stylesheet>