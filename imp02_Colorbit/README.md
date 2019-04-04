# Colorbit App

Operation:

1 - Colorbit via Webcam reads colored barcode id, and 2D (x,y) position of 4 corners.  
2 - Colorbit sends the data in JSON format to Web server (written by Nodejs).  
3 - Our C++ client makes a HTTP request (GET) to Web server every seconds for the latest data.  
4 - Client parses JSON format into the desired struct.  

Step 1: Adam configuration
Using Browser to configure Adam parameters which define the Color bit operation,  
i.e., frame number, http address of Web server, etc.

Step 2: Implementing C++ Web-server
+ POST method: handle POST from Color bit, store the data to a global JSON object.
+ GET method: return the latest JSON object

Start Web-server by command:
```
$ node ./bin/www
```

Step 3: Implementing C++ Client

Load sample project by Qt (use Cmakelists.txt) or compile g++ command:
```
$ g++ main.cpp -ljsoncpp -lcurl -o httpClient -std=c++11
```
  
  

*** Necessary Libraries

[1] C++ for HTTP request  
a) HTTPRequest  
Github: https://github.com/elnormous/HTTPRequest  

// === Troubleshooting: Unknown type name 'ptrdiff_t'  
response.body.insert(response.body.end(), responseData.begin(), responseData.begin() + static_cast<ptrdiff_t>(toWrite));  
=> #include <cstddef>

b) CURL.h  
package CURL  
```
$ sudo apt-get install libcurl4-openssl-dev
```
  
[2] C++ for JSON parsing  
package JSONCPP: json.h
```
$ g++ curl_jsoncpp_example.cpp -ljsoncpp -lcurl -o example.out && ./example.out
$ g++ test.cpp -ljsoncpp -lcurl -o test -std=c++11
```
  
[3] CMakelists.txt  
For compiling Qt project

