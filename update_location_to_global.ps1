# PowerShell script to update target market location from Dubai & India to Global across site

$fileIndex = "c:\Users\zulfi\OneDrive\Umar protfolio\index.html"
$fileClients = "c:\Users\zulfi\OneDrive\Umar protfolio\clients.html"
$fileBlog1 = "c:\Users\zulfi\OneDrive\Umar protfolio\my-seo-journey.html"
$fileBlog1Sub = "c:\Users\zulfi\OneDrive\Umar protfolio\blog\my-seo-journey.html"

# 1. Update index.html
if (Test-Path $fileIndex) {
    $content = Get-Content $fileIndex -Raw -Encoding UTF8
    $content = $content.Replace('Dubai (UAE) & India', 'Global')
    $content = $content.Replace('India & Dubai, UAE', 'Global')
    $content = $content.Replace('international clients in Dubai, UAE and domestic businesses in India', 'global clients and international businesses')
    $content = $content.Replace('for international practices in Dubai, UAE and domestic brands in India.', 'for global clients and international brands.')
    $content = $content.Replace('in Dubai & India', 'globally')
    Set-Content $fileIndex -Value $content -Encoding UTF8
    Write-Host "Updated index.html to Global target market"
}

# 2. Update clients.html
if (Test-Path $fileClients) {
    $content = Get-Content $fileClients -Raw -Encoding UTF8
    $content = $content.Replace('in India and Dubai (UAE)', 'globally')
    Set-Content $fileClients -Value $content -Encoding UTF8
    Write-Host "Updated clients.html to Global"
}

# 3. Update Blog 1 files
foreach ($f in @($fileBlog1, $fileBlog1Sub)) {
    if (Test-Path $f) {
        $content = Get-Content $f -Raw -Encoding UTF8
        $content = $content.Replace('in Dubai, UAE and domestic businesses in India', 'globally')
        Set-Content $f -Value $content -Encoding UTF8
        Write-Host "Updated $f to Global"
    }
}
