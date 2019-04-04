#debug view- NEED monitor to run
set(WITH_DEBUG 0)

#internal set
project(openCVTestApp)

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
# FIND OpenCV
#########################################################
#list(APPEND CMAKE_MODULE_PATH ";/usr/local/opencv3")
#set(CMAKE_MODULE_PATH "${CMAKE_MODULE_PATH};/usr/local/opencv31")
find_package( OpenCV REQUIRED HINTS "/usr/local/opencv3")
if (OpenCV_FOUND)
  message("OpenCV found " ${OpenCV_INCLUDE_DIRS})
  include_directories(${OpenCV_INCLUDE_DIRS})
  link_directories (${OpenCV_LIBRARY_PATH})
  link_directories ("/usr/local/lib")
  link_directories ("/usr/lib")
  link_directories ("/usr/lib/x86_64-linux-gnu")
 message("OpenCV found library libraries " ${OpenCV_LIBS})
else  (OpenCV_FOUND)
 message("OpenCV not found ")
endif (OpenCV_FOUND)
#####################

#########################################################
# local lib
#########################################################

include_directories(/usr/local/include/)
link_directories(/usr/local/lib)
link_directories(/usr/local/x86_64-linux-gnu)

#####################
SET(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++11 -pthread")


#------------------------------------------------------------------------------
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
    ${OpenCV_LIBS}
)

