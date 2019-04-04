// g++ test.cpp -ljsoncpp -lcurl -o test -std=c++11
// Work with BrJpegRoute.js
// + Read info from Web-server (HTTP Request header)
// + Extract it to BARCODE_INFO
#include <cstdint>
#include <iostream>
#include <memory>
#include <string>
#include <thread>
#include <chrono>
#include <json/json.h>

#include "HTTPRequest.hpp"


typedef struct _BARCODE_INFO {
    int barcodeID;
    std::string timestamp;
    const int NUM_POINTS = 4;
    std::vector<int> x;
    std::vector<int> y;
    float Z; // (x,y,Z) represents Barcode position in Z image
} BARCODE_INFO;

const std::string url("http://localhost:3000/jpeg");


void makeHTTPRequestforRawJSON_hpp() {
    std::vector<BARCODE_INFO> barcodeList;

    try
    {
        http::Request request(url.c_str());

        // send a get request
        http::Response response = request.send("GET");
        //std::cout << response.body.data() << std::endl; // print the result

        std::cout << "GET-RESPONSE OK" << std::endl;
        std::string response_text (response.body.begin(), response.body.end());
        Json::Value jsonData;
        Json::Reader jsonReader;

        if (jsonReader.parse(response_text, jsonData))
        {
            //const std::string camId(jsonData["x-camera-id"].asString());
            const std::string timestamp(jsonData["x-shooting-time"].asString());
            const std::string numBrStr(jsonData["x-number-of-colorbit"].asString());
            const int numBr = std::stoi(numBrStr);

            Json::Value jsonDataInfo;
            Json::Reader jsonReaderInfo;
            const std::string colorbitInfo(jsonData["x-colorbit-info"].asString());
            //std::cout << "\tType        : " << jsonData["x-colorbit-info"].type() << std::endl;

            if (jsonReaderInfo.parse(colorbitInfo, jsonDataInfo)) {
                for (int i = 0; i < numBr; i++) {
                    BARCODE_INFO barcode;
                    barcode.timestamp = timestamp;
                    barcode.barcodeID = jsonDataInfo[i]["id"].asInt();
                    for (int j = 0; j < barcode.NUM_POINTS; j++) {
                        barcode.x.push_back(jsonDataInfo[i]["vertex"][j]["x"].asInt());
                        barcode.y.push_back(jsonDataInfo[i]["vertex"][j]["y"].asInt());
                    }
                    barcode.Z = 3.14;   // For example
                    barcodeList.push_back(barcode);
                }
                // Print output
                //std::cout << "\tCamId       : " << camId << std::endl;
                //std::cout << "\tTimestamp       : " << timestamp << std::endl;
                std::cout << "\tNumber of BR    : " << numBr << std::endl;
                for (std::vector<BARCODE_INFO>::iterator it = barcodeList.begin(); it != barcodeList.end(); ++it) {
                    std::cout << "\tID          : " << (*it).barcodeID << std::endl;
                    std::cout << "\tPos         : ";
                    for (int i = 0; i < (*it).NUM_POINTS; i++) {
                        std::cout << (*it).x[i] << " - " << (*it).y[i] << " ; ";
                    }
                    std::cout << std::endl;
                    std::cout << "\tTimestamp   : " << (*it).timestamp << std::endl;
                }
                std::cout << std::endl;
            }
            else {
                std::cout << "Could not parse HTTP data as JSON" << std::endl;
                std::cout << "HTTP data was:\n" << colorbitInfo << std::endl;
                return;
            }
        }
        else
        {
            std::cout << "Could not parse HTTP data as JSON" << std::endl;
            std::cout << "HTTP data was:\n" << response_text << std::endl;
            return;
        }
    }
    catch (const std::exception& e)
    {
        std::cerr << "Request failed, error: " << e.what() << std::endl;
    }

}

int main() {

    while (1) {
        std::this_thread::sleep_for(std::chrono::milliseconds(1000));
        std::cout << "GET from " << url << std::endl;

        // Choose any methods
        // Method 1: CURL
        //makeHTTPRequestforRawJSON();
        //makeHTTPRequestforRawJSON_simple();

        // Method 2: HTTPRequest.hpp
        makeHTTPRequestforRawJSON_hpp();

    }

    return 0;
}
