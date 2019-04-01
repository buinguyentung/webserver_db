#debug view- NEED monitor to run
set(WITH_DEBUG 0)

#internal set
project(httpClientTestApp)

cmake_minimum_required(VERSION 2.8)
#Build mode
set(CMAKE_BUILD_TYPE "Release")
set(CMAKE_CONFIGURATION_TYPES "Release")

########################################################
# C++11 checking
#########################################################

SET(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++11 -pthread")
#####################

##################################################
#C++4.9 for c++11
##################################################
#set(CMAKE_CXX_COMPILER g++-4.9)

find_package( jsoncpp REQUIRED)

set(CURL_LIBRARY "-lcurl")
find_package(CURL REQUIRED)
include_directories($(CURL_INCLUDE_DIR))


#########################################################
# local lib
#########################################################

include_directories(/usr/local/include/)
link_directories(/usr/local/lib)
link_directories(/usr/local/x86_64-linux-gnu)


#Add excutable
#add_executable(${PROJECT_NAME} ${SRC_LIST})
set(SRC_ALL
    main.cpp
    HTTPRequest.hpp
)

add_executable(
    ${PROJECT_NAME}
    ${SRC_ALL}
)

#Link dependencies
target_link_libraries(
    ${PROJECT_NAME}
    jsoncpp
    ${CURL_LIBRARIES}
)

