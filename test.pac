function FindProxyForURL(url, host)
{
   if (isInNet(host, "192.168.0.0",  "255.0.0.0"))
    {
        return "DIRECT";
    }
    else 
    {
          return "SOCKS5 localhost:1080";
    }
 
}
