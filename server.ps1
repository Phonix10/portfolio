$port = 5500
$ip = "192.168.0.187"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://${ip}:${port}/")

try {
    $listener.Start()
    Write-Host "`n===============================================" -ForegroundColor Cyan
    Write-Host " SERVER IS RUNNING" -ForegroundColor Green
    Write-Host "===============================================" -ForegroundColor Cyan
    Write-Host "`n1. Connect your phone to the same Wi-Fi network"
    Write-Host "2. Open Chrome/Safari on your phone"
    Write-Host "3. Type this EXACT link: " -NoNewline
    Write-Host "http://${ip}:${port}/" -ForegroundColor Yellow
    Write-Host "`nPress Ctrl+C in this window to stop the server."
} catch {
    Write-Host "`n[ERROR] Failed to start server." -ForegroundColor Red
    Write-Host "You MUST run this command in an Administrator terminal to open a network port!" -ForegroundColor Yellow
    Write-Host "Right-click PowerShell -> 'Run as Administrator', navigate to this folder, and try again.`n"
    exit
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $path = $request.Url.LocalPath
        if ($path -eq "/") { $path = "/index.html" }
        
        $localPath = Join-Path $PWD.Path $path.Replace("/", "\")

        if (Test-Path $localPath -PathType Leaf) {
            $content = [System.IO.File]::ReadAllBytes($localPath)
            
            $ext = [System.IO.Path]::GetExtension($localPath).ToLower()
            switch ($ext) {
                ".html" { $response.ContentType = "text/html" }
                ".css"  { $response.ContentType = "text/css" }
                ".js"   { $response.ContentType = "application/javascript" }
                ".png"  { $response.ContentType = "image/png" }
                ".svg"  { $response.ContentType = "image/svg+xml" }
                ".pdf"  { $response.ContentType = "application/pdf" }
                default { $response.ContentType = "application/octet-stream" }
            }
            
            $response.ContentLength64 = $content.Length
            $response.OutputStream.Write($content, 0, $content.Length)
            Write-Host "[200 OK] served $path" -ForegroundColor DarkGray
        } else {
            $response.StatusCode = 404
            Write-Host "[404 Not Found] $path" -ForegroundColor Red
        }
        $response.Close()
    } catch {
        # Ignore context errors if closed
    }
}
