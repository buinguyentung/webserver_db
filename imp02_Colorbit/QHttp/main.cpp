// g++ test.cpp -ljsoncpp -lcurl -o test -std=c++11
#include <cstdint>
#include <iostream>
#include <memory>
#include <string>
#include <thread>
#include <chrono>

#include <curl/curl.h>
#include <json/json.h>

#include "HTTPRequest.hpp"


namespace
{
    std::size_t callback(
            const char* in,
            std::size_t size,
            std::size_t num,
            std::string* out)
    {
        const std::size_t totalBytes(size * num);
        out->append(in, totalBytes);
        return totalBytes;
    }
}

typedef struct _BARCODE_INFO {
    int barcodeID;
    const int NUM_POINTS = 4;
    std::vector<int> x;
    std::vector<int> y;
} BARCODE_INFO;

const std::string url("http://localhost:3000/brdata");

/*void makeHTTPRequestforRawJSON() {
    std::vector<BARCODE_INFO> barcodeList;

    CURL *curl = curl_easy_init();;
    //CURLcode res;

    if(curl) {
        // Set remote URL.
        curl_easy_setopt(curl, CURLOPT_URL, url.c_str());

        // Don't bother trying IPv6, which would increase DNS resolution time.
        curl_easy_setopt(curl, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4);

        // Don't wait forever, time out after 3 seconds.
        curl_easy_setopt(curl, CURLOPT_TIMEOUT, 3);

        // Follow HTTP redirects if necessary.
        curl_easy_setopt(curl, CURLOPT_FOLLOWLOCATION, 1L);

        // Response information.
        int httpCode(0);
        std::unique_ptr<std::string> httpData(new std::string());

        // Hook up data handling function.
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, callback);

        // Hook up data container (will be passed as the last parameter to the
        // callback handling function).  Can be any pointer type, since it will
        // internally be passed as a void pointer.
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, httpData.get());

        // Run our HTTP GET command, capture the HTTP response code, and clean up.
        curl_easy_perform(curl);
        curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &httpCode);
        curl_easy_cleanup(curl);

       if (httpCode == 200){
            std::cout << "\nGot successful response from " << url << std::endl;

            // Response looks good - done using Curl now.  Try to parse the results
            // and print them out.
            Json::Value jsonData;
            Json::Reader jsonReader;

            if (jsonReader.parse(*httpData.get(), jsonData))
            {
                std::cout << "Successfully parsed JSON data" << std::endl;
                std::cout << "\nJSON data received:" << std::endl;
                std::cout << jsonData.toStyledString() << std::endl;

                const std::string camId(jsonData["camid"].asString());
                const std::size_t unixTimeMs(jsonData["date"].asUInt64());
                const int numBr(jsonData["num"].asInt());

                for (int i = 0; i < numBr; i++) {
                    BARCODE_INFO barcode;
                    barcode.barcodeID = jsonData["code"][i]["id"].asInt();
                    for (int j = 0; j < barcode.NUM_POINTS; j++) {
                        barcode.x.push_back(jsonData["code"][i]["vertex"][j]["x"].asInt());
                        barcode.y.push_back(jsonData["code"][i]["vertex"][j]["y"].asInt());
                    }
                    barcodeList.push_back(barcode);
                }
                //const int x1(jsonData["code"][0]["vertex"][j]["x"].asInt());
                //const int y1(jsonData["code"][0]["vertex"][1]["y"].asInt());

                std::cout << "Natively parsed:" << std::endl;
                std::cout << "\tCamId       : " << camId << std::endl;
                std::cout << "\tUnix timeMs : " << unixTimeMs << std::endl;
                std::cout << "\tNumber of BR: " << numBr << std::endl;
                //for (int i = 0; i < numBr; i++) {
                //    std::cout << "\tID     : " << barcodeList[i].barcodeID << std::endl;
                //}
                for (std::vector<BARCODE_INFO>::iterator it = barcodeList.begin(); it != barcodeList.end(); ++it) {
                    std::cout << "\tID     : " << (*it).barcodeID << std::endl;
                    std::cout << "\tPos     : ";
                    for (int i = 0; i < (*it).NUM_POINTS; i++) {
                        std::cout << (*it).x[i] << " - " << (*it).y[i] << " ; ";
                    }
                    std::cout << std::endl;
                }
                std::cout << std::endl;
            }
            else
            {
                std::cout << "Could not parse HTTP data as JSON" << std::endl;
                std::cout << "HTTP data was:\n" << *httpData.get() << std::endl;
                return;
            }
        }
        else
        {
            std::cout << "Couldn't GET from " << url << " - exiting" << std::endl;
            return;
        }
    }
}*/
void makeHTTPRequestforRawJSON_simple() {
    std::vector<BARCODE_INFO> barcodeList;

    CURL *curl = curl_easy_init();
    //CURLcode res;

    curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
    curl_easy_setopt(curl, CURLOPT_TIMEOUT, 3);
    curl_easy_setopt(curl, CURLOPT_FOLLOWLOCATION, 1L);
    curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, callback);
    int httpCode(0);
    std::unique_ptr<std::string> httpData(new std::string());
    curl_easy_setopt(curl, CURLOPT_WRITEDATA, httpData.get());

    curl_easy_perform(curl);
    curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &httpCode);
    curl_easy_cleanup(curl);

    std::cout << "Couldn't GET from " << url << " - httpCode" << httpCode << std::endl;

    // Response looks good - done using Curl now.  Try to parse the results
    // and print them out.
    Json::Value jsonData;
    Json::Reader jsonReader;

    if (jsonReader.parse(*httpData.get(), jsonData))
    {
        std::cout << "Successfully parsed JSON data" << std::endl;
        std::cout << "\nJSON data received:" << std::endl;
        std::cout << jsonData.toStyledString() << std::endl;
    }
    else
    {
        std::cout << "Could not parse HTTP data as JSON" << std::endl;
        std::cout << "HTTP data was:\n" << *httpData.get() << std::endl;
        return;
    }

}

int main() {

    while (1) {
        std::this_thread::sleep_for(std::chrono::milliseconds(1000));
	std::cout << "GET from " << url << std::endl;

	//Choose any methods
	//Method 1: CURL
        //makeHTTPRequestforRawJSON_simple();

	//Method 2: HTTPRequest.hpp        
        try
        {
            http::Request request(url.c_str());

            // send a get request
            http::Response response = request.send("GET");
            std::cout << response.body.data() << std::endl; // print the result
        }
        catch (const std::exception& e)
        {
            std::cerr << "Request failed, error: " << e.what() << std::endl;
        }
    }

    return 0;
}
