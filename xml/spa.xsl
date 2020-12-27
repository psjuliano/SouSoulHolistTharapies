<?xml version = "1.0"?>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:template match="/">
        <xsl:for-each select= "spa/services/entree">
        <div class= "col-sm-6">
        <div class= "card">
        <div class= "card-body">
        <h4 class="card-title">
        <xsl:value-of select= "item">
        
        </xsl:value-of>
        </h4>
        <a href="#" class="btn btn-primary">Book Now</a>
        </div>
        </div>
        </div>
        
        </xsl:for-each>

    </xsl:template>
</xsl:stylesheet>