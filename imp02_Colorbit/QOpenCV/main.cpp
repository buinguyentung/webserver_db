// Goal
// In this tutorial you will learn how to:
// 	+ Load an image (using cv::imread )
// 	+ Create a named OpenCV window (using cv::namedWindow )
// 	+ Display an image in an OpenCV window (using cv::imshow )


#include <opencv2/core.hpp>
#include <opencv2/imgcodecs.hpp>
#include <opencv2/highgui.hpp>
#include <opencv2/imgproc.hpp>
#include <iostream>
#include <string>
#include <cstdint>
#include <memory>
#include <thread>
#include <chrono>

#include <curl/curl.h>
#include <json/json.h>

#include "HTTPRequest.hpp"

using namespace cv;
using namespace std;

typedef struct _BARCODE_INFO {
    int barcodeID;
    const int NUM_POINTS = 4;
    std::vector<int> x;
    std::vector<int> y;
} BARCODE_INFO;

const std::string url("http://localhost:3000/cam");


std::vector<BARCODE_INFO> makeHTTPRequestforRawJSON_hpp() {
    std::vector<BARCODE_INFO> barcodeList;

    try
    {
        http::Request request(url.c_str());

        // send a get request
        http::Response response = request.send("GET");
        //std::cout << response.body.data() << std::endl; // print the result

        std::string response_text (response.body.begin(), response.body.end());
        // Response looks good - done using Curl now.  Try to parse the results and print them out.
        Json::Value jsonData;
        Json::Reader jsonReader;

        if (jsonReader.parse(response_text, jsonData))
        {
            //std::cout << "Successfully parsed JSON data" << std::endl;
            //std::cout << "\nJSON data received:" << std::endl;
            //std::cout << jsonData.toStyledString() << std::endl;

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

//            std::cout << "Natively parsed:" << std::endl;
//            std::cout << "\tCamId       : " << camId << std::endl;
//            std::cout << "\tUnix timeMs : " << unixTimeMs << std::endl;
//            std::cout << "\tNumber of BR: " << numBr << std::endl;
//            for (std::vector<BARCODE_INFO>::iterator it = barcodeList.begin(); it != barcodeList.end(); ++it) {
//                std::cout << "\tID      : " << (*it).barcodeID << std::endl;
//                std::cout << "\tPos     : ";
//                for (int i = 0; i < (*it).NUM_POINTS; i++) {
//                    std::cout << (*it).x[i] << " - " << (*it).y[i] << " ; ";
//                }
//                std::cout << std::endl;
//            }
//            std::cout << std::endl;
        }
        else
        {
            std::cout << "Could not parse HTTP data as JSON" << std::endl;
            std::cout << "HTTP data was:\n" << response_text << std::endl;
        }
    }
    catch (const std::exception& e)
    {
        std::cerr << "Request failed, error: " << e.what() << std::endl;
        return barcodeList;
    }

    return barcodeList;
}


int main( int argc, char** argv )
{
    String imageName( "/home/tungbui/pic1.jpg" ); // by default
    std::cout << "Load original image: " << imageName << std::endl;
    if( argc > 1)
    {
        imageName = argv[1];
    }
    cv::Mat image;
    image = cv::imread( imageName, cv::IMREAD_COLOR ); // Read the file
    if( image.empty() )                      // Check for invalid input
    {
        cout <<  "Could not open or find the image" << std::endl ;
        return -1;
    }
    cv::namedWindow( "Display window", cv::WINDOW_AUTOSIZE ); // Create a window for display.
    //cv::imshow( "Display window", image );
    //cv::waitKey(10) & 0xFF;

    // continuously get Barcode info from Web-server and draw rectangle based on the location of 4 corners
    //int x1 = 490; int x2 = 166;
    //int y1 = 332; int y2 = 298;
    int count = 0;
    while (1) {
        std::this_thread::sleep_for(std::chrono::milliseconds(1000));
        //std::cout << "GET from " << url << std::endl;

        std::vector<BARCODE_INFO> barcodeList;
        // Get Barcode info
        barcodeList = makeHTTPRequestforRawJSON_hpp();

        // Draw rectangles
        image = cv::imread( imageName, IMREAD_COLOR );
        for (int i = 0; i < barcodeList.size(); i++) {
            std::cout << barcodeList[i].x[0] << "-" << barcodeList[i].y[0] << " ; ";
            std::cout << barcodeList[i].x[2] << "-" << barcodeList[i].y[2] << std::endl;
            cv::Point pt1 (barcodeList[i].x[0], barcodeList[i].y[0]);
            cv::Point pt2 (barcodeList[i].x[2], barcodeList[i].y[2]);
            cv::rectangle(image, pt1, pt2, cv::Scalar(0, 255, 0), 4);
        }
        std::string storedImageName( "/home/tungbui/" + std::to_string(count) + ".jpg" );
        cv::imwrite(storedImageName, image);
        std::cout << "SAVE to " << storedImageName << std::endl;
        count++;
        cv::imshow( "Display window", image );
        cv::waitKey(10) & 0xFF;
        //x2++; y2--;
    }

    return 0;
}
