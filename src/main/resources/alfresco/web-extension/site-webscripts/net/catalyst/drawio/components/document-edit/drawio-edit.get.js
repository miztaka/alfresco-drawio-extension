<import resource="classpath:alfresco/site-webscripts/org/alfresco/callutils.js">

    function main() {
        var nodeRef = url.args.nodeRef,
            connector = remote.connect("alfresco");
        //try and get the Wopi service url first
        try {
            var result = connector.get('/slingshot/node/' + nodeRef.replace('://', '/'));
            if (result.status.code == status.STATUS_OK) {
                metadata = JSON.parse(result.response);
            }
            else throw ("\t\tapi returned: "+ result.status.code);
        }catch(e){
            logger.log('Error getting host url. (Using enpoint URL now):\n' + e);
        }

        model.userId = user.id;
        model.firstName = user.firstName;
        model.lastName = user.lastName;

        // Widget instantiation metadata...
        var drawioWidget = {
            id: "loolWidget",
            name: "Catalyst.Drawio",
            options: {
                nodeRef: nodeRef,
                metadata: metadata,
            }
        };
        model.widgets = [drawioWidget];

        logger.log("\n---- Ending the show ----");
    };

main();