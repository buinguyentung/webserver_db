Create resource group
$ az group create --name tung-eventhub-rg --location eastus
Create Event hubs namespace
$ az eventhubs namespace create --name tung-eventhub-ns-101 --resource-group tung-eventhub-rg --location eastus
Create Event hubs eventhub
$ az eventhubs eventhub create --name tung-eventhub-101 --resource-group tung-eventhub-rg --namespace-name tung-eventhub-ns-101
