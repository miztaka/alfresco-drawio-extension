/**
 * LibreOffice edit online component.
 *
 * @namespace Catalyst
 * @class Catalyst.LibreOfficeOnline
 */
// Ensure Catalyst root object exists
if (typeof Catalyst == "undefined" || !Catalyst) {
    var Catalyst = {};

}


(function () {

    /**
     * Alfresco.CustomisePages constructor.
     *
     * @param {string} htmlId The HTML id of the parent element
     * @return {Alfresco.CustomisePages} The new CustomisePages instance
     * @constructor
     */
    Catalyst.Drawio = function (htmlId) {
        return Catalyst.Drawio.superclass.constructor.call(this, "Catalyst.Drawio", htmlId, ["container"]);
    };

    YAHOO.extend(Catalyst.Drawio, Alfresco.component.Base, {
        /**
         * Object container for initialization options
         *
         * @property options
         * @type object
         */
        options: {
            nodeRef: ''
        },

        /**
         * Fired by YUILoaderHelper when required component script files have
         * been loaded into the browser.
         *
         * @method onReady
         */
        onReady: function MLO_onReady() {

            var me = this;
            var id = Alfresco.util.NodeRef(me.options.nodeRef).id;
            alert(id);
            alert(Alfresco.util.CSRFPolicy.getToken());
            alert(Alfresco.util.CSRFPolicy.getParameter());

            require(["jquery"], (function ($) {
                //var frame = '<iframe id="loleafletframe" name= "loleafletframe" allowfullscreen style="width:100%;height:100%;position:absolute;" src="https://embed.diagrams.net/" />';

                $('#loolcontainer').remove();

                var container = '<div id="loolcontainer" style="position: fixed; bottom: 50px; width: 100%; top: 96px; left: 0; background: white;"></div>';
                //var img = '<img onclick="DiagramEditor.editElement(this);" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIxMjFweCIgaGVpZ2h0PSI2MXB4IiB2aWV3Qm94PSItMC41IC0wLjUgMTIxIDYxIiBjb250ZW50PSImbHQ7bXhmaWxlIGV0YWc9JnF1b3Q7VGdBR2JKbGNJaGw3a1JuRGFxSDQmcXVvdDsgYWdlbnQ9JnF1b3Q7TW96aWxsYS81LjAgKE1hY2ludG9zaDsgSW50ZWwgTWFjIE9TIFggMTBfMTRfNikgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzgwLjAuMzk4Ny4xMDYgU2FmYXJpLzUzNy4zNiZxdW90OyBtb2RpZmllZD0mcXVvdDsyMDIwLTAyLTE5VDEyOjQ0OjI3LjY1OVomcXVvdDsgaG9zdD0mcXVvdDt0ZXN0LmRyYXcuaW8mcXVvdDsgdmVyc2lvbj0mcXVvdDtARFJBV0lPLVZFUlNJT05AJnF1b3Q7Jmd0OyZsdDtkaWFncmFtIGlkPSZxdW90O3JVdXh2bWFtZE5aMXpyTFhPbF82JnF1b3Q7IG5hbWU9JnF1b3Q7UGFnZS0xJnF1b3Q7Jmd0O2xaUExic0l3RUVXL0prc2t4Nll0V3dvcGZhaWxLcXFRMkpsNGNGdzVHZVFZU1ByMVRZaWRCeXphcmpJK21VZm1YaWRnczdSWUdMNVBYbEdBRGlnUlJjRG1BYVVocGF4NjFLUnN5VjFEcEZIQ3NRNnMxRGM0U0J3OUtBSDVJTkVpYXF2MlF4aGpsa0ZzQjR3Ymc2ZGgyZzcxY09xZVM3Z0NxNWpyYTdwV3dpWU5uZHlRamorQ2tvbWZIQkwzSnVVKzJZRTg0UUpQUGNTaWdNME1vbTJpdEppQnJ0WHp1cnlGNy9NeFpSK2piRU5pU2FmUlJxcFIwK3poUHlYdENnWXkrOWZXbnptWTVmYXJscFFTemJlVnIrZktsZVhHTmczOTBPeXdIZHVuWTFnc1g5YlBiSWU0THFlamJzUDJJM05iZWxVTkhqSUJkVDBKMkwzVVBNOWQzS3BVSDVvNVJ6QVdpZ3M3ZnRrbDdJMWZBS1pnVFZuVnVTN01lK0p1NWNRZFQ1M0RvVTlKZXU3ZU9zYmRwWkp0NTA2NEtuQWIrMk5QU284NjE4L3B2WitIUlQ4PSZsdDsvZGlhZ3JhbSZndDsmbHQ7L214ZmlsZSZndDsiIHN0eWxlPSJiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjU1LCAyNTUsIDI1NSk7Ij48ZGVmcy8+PGc+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSI2MCIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjMDAwMDAwIiBwb2ludGVyLWV2ZW50cz0iYWxsIi8+PGcgZmlsbD0iIzAwMDAwMCIgZm9udC1mYW1pbHk9IkhlbHZldGljYSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMnB4Ij48dGV4dCB4PSI1OS41IiB5PSIzNC41Ij5TdGFydDwvdGV4dD48L2c+PC9nPjwvc3ZnPg==" style="cursor:pointer;"></img>';
                $('#libreoffice-online').append(container);
                var loolContainer = $('#loolcontainer');

                //loolContainer.append(img);


                $.get('/share/proxy/alfresco/api/node/content/workspace/SpacesStore/' + id, function(data) {
                    alert(data.substring(0, 10));
                    //var jq = $(data).appendTo(loolContainer);
                    DiagramEditor.startEditing(data, function(data) {
                        console.log('onSave called.');
                        var fileObj = new File([data], 'AlfrescoTiakiIntegration_v2.drawio', {
                            type: 'application/octet-stream'
                        });
                        var formData = new FormData();
                        formData.append('filedata', fileObj);
                        formData.append('filename', 'AlfrescoTiakiIntegration_v2.drawio');
                        console.log('nodeRef is: ' + me.options.nodeRef);
                        formData.append('updateNodeRef', me.options.nodeRef);
                        formData.append('updatenameandmimetype', false);
                        formData.append('majorVersion', false);
                        formData.append('overwrite', true);
                        formData.append('createdirectory', true);
                        /*
                        Alfresco.util.Ajax.request(
                            {
                                url: Alfresco.constants.PROXY_URI + "api/upload",
                                method: Alfresco.util.Ajax.POST,
                                dataForm: formData,
                                requestContentType: 'multipart/form-data',
                                successCallback:
                                {
                                    fn: function() {
                                        alert("Data saved!!");
                                    },
                                    scope: this
                                },
                                failureCallback:
                                {
                                    fn: function() {
                                        alert("failed to save data");
                                    },
                                    scope: this
                                }
                            });
                            */
                        var headers = []
                        headers[Alfresco.util.CSRFPolicy.getParameter()] = Alfresco.util.CSRFPolicy.getToken();
                        $.ajax({
                            method: 'POST',
                            type: "POST",
                            url: "/share/proxy/alfresco/api/upload?"
                                + Alfresco.util.CSRFPolicy.getParameter()
                                + "="
                                + encodeURIComponent(Alfresco.util.CSRFPolicy.getToken()),
                            data: formData,
                            headers: headers,
                            cache: false,
                            contentType: false,
                            processData: false,
                            success: function() {
                                alert("Data Uploaded: ");
                            }
                        });
                    });
                });

                $('#loleafletframe').load(function () {
                    console.log("Loaded drawio");
                });

            }));

        }
    });
})();

/**
 * Copyright (c) 2006-2020, JGraph Ltd
 * Copyright (c) 2006-2020, Gaudenz Alder
 *
 * Usage: DiagramEditor.editElement(elt) where elt is an img or object with
 * a data URI src or data attribute or an svg node with a content attribute.
 *
 * See https://jgraph.github.io/drawio-integration/javascript.html
 */
function DiagramEditor(config, ui, done) {
    this.config = (config != null) ? config : this.config;
    this.done = (done != null) ? done : this.done;
    this.ui = (ui != null) ? ui : this.ui;
    var self = this;

    this.handleMessageEvent = function(evt) {
        if (self.frame != null && evt.source == self.frame.contentWindow &&
            evt.data.length > 0) {
            try {
                var msg = JSON.parse(evt.data);

                if (msg != null) {
                    self.handleMessage(msg);
                }
            }
            catch (e) {
                console.error(e);
            }
        }
    };
};

/**
 * Static method to edit the diagram in the given img or object.
 */
DiagramEditor.editElement = function(elt, config, ui, done) {
    return new DiagramEditor(config, ui, done).editElement(elt);
};

DiagramEditor.startEditing = function(data, callback, config, ui, done) {
    DiagramEditor.prototype.onSave = callback;
    return new DiagramEditor(config, ui, done).startEditing(data, 'xml');
}

/**
 * Global configuration.
 */
DiagramEditor.prototype.config = null;

/**
 * Protocol and domain to use.
 */
DiagramEditor.prototype.drawDomain = 'https://embed.diagrams.net/';

/**
 * UI theme to be use.
 */
DiagramEditor.prototype.ui = 'min';

/**
 * Format to use.
 */
DiagramEditor.prototype.format = 'xml';

/**
 * Specifies if libraries should be enabled.
 */
DiagramEditor.prototype.libraries = true;

/**
 * CSS style for the iframe.
 */
DiagramEditor.prototype.frameStyle = 'position:absolute;border:0;width:100%;height:100%;';

DiagramEditor.prototype.onSave = null;

/**
 * Adds the iframe and starts editing.
 */
DiagramEditor.prototype.editElement = function(elem) {
    var src = this.getElementData(elem);
    this.startElement = elem;
    var fmt = this.format;

    if (src.substring(0, 15) === 'data:image/png;') {
        fmt = 'xmlpng';
    }
    else if (src.substring(0, 19) === 'data:image/svg+xml;' ||
        elem.nodeName.toLowerCase() == 'svg') {
        fmt = 'xmlsvg';
    }

    this.startEditing(src, fmt);

    return this;
};

/**
 * Adds the iframe and starts editing.
 */
DiagramEditor.prototype.getElementData = function(elem) {
    var name = elem.nodeName.toLowerCase();

    return elem.getAttribute((name == 'svg') ? 'content' :
        ((name == 'img') ? 'src' : 'data'));
};

/**
 * Adds the iframe and starts editing.
 */
DiagramEditor.prototype.setElementData = function(elem, data) {
    var name = elem.nodeName.toLowerCase();

    if (name == 'svg') {
        elem.outerHTML = atob(data.substring(data.indexOf(',') + 1));
    }
    else {
        elem.setAttribute((name == 'img') ? 'src' : 'data', data);
    }

    return elem;
};

/**
 * Starts the editor for the given data.
 */
DiagramEditor.prototype.startEditing = function(data, format, title) {
    if (this.frame == null) {
        window.addEventListener('message', this.handleMessageEvent);
        this.format = (format != null) ? format : this.format;
        this.title = (title != null) ? title : this.title;
        this.data = data;

        this.frame = this.createFrame(
            this.getFrameUrl(),
            this.getFrameStyle());
        //document.body.appendChild(this.frame);
        document.getElementById('loolcontainer').appendChild(this.frame);
        this.setWaiting(true);
    }
};

/**
 * Updates the waiting cursor.
 */
DiagramEditor.prototype.setWaiting = function(waiting) {
    if (this.startElement != null) {
        // Redirect cursor to parent for SVG and object
        var elt = this.startElement;
        var name = elt.nodeName.toLowerCase();

        if (name == 'svg' || name == 'object') {
            elt = elt.parentNode;
        }

        if (elt != null) {
            if (waiting) {
                this.frame.style.pointerEvents = 'none';
                this.previousCursor = elt.style.cursor;
                elt.style.cursor = 'wait';
            }
            else {
                elt.style.cursor = this.previousCursor;
                this.frame.style.pointerEvents = '';
            }
        }
    }
};

/**
 * Updates the waiting cursor.
 */
DiagramEditor.prototype.setActive = function(active) {
    if (active) {
        this.previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
    }
    else {
        document.body.style.overflow = this.previousOverflow;
    }
};

/**
 * Removes the iframe.
 */
DiagramEditor.prototype.stopEditing = function() {
    if (this.frame != null) {
        window.removeEventListener('message', this.handleMessageEvent);
        document.body.removeChild(this.frame);
        this.setActive(false);
        this.frame = null;
    }
};

/**
 * Send the given message to the iframe.
 */
DiagramEditor.prototype.postMessage = function(msg) {
    if (this.frame != null) {
        this.frame.contentWindow.postMessage(JSON.stringify(msg), '*');
    }
};

/**
 * Returns the diagram data.
 */
DiagramEditor.prototype.getData = function() {
    return this.data;
};

/**
 * Returns the title for the editor.
 */
DiagramEditor.prototype.getTitle = function() {
    return this.title;
};

/**
 * Returns the CSS style for the iframe.
 */
DiagramEditor.prototype.getFrameStyle = function() {
    return this.frameStyle + ';left:' +
        document.body.scrollLeft + 'px;top:' +
        document.body.scrollTop + 'px;';
};

/**
 * Returns the URL for the iframe.
 */
DiagramEditor.prototype.getFrameUrl = function() {
    var url = this.drawDomain + '?embed=1&proto=json&spin=1';

    if (this.ui != null) {
        url += '&ui=' + this.ui;
    }

    if (this.libraries != null) {
        url += '&libraries=1';
    }

    if (this.config != null) {
        url += '&configure=1';
    }

    return url;
};

/**
 * Creates the iframe.
 */
DiagramEditor.prototype.createFrame = function(url, style) {
    var frame = document.createElement('iframe');
    frame.setAttribute('frameborder', '0');
    frame.setAttribute('style', style);
    frame.setAttribute('src', url);

    return frame;
};

/**
 * Sets the status of the editor.
 */
DiagramEditor.prototype.setStatus = function(messageKey, modified) {
    this.postMessage({ action: 'status', messageKey: messageKey, modified: modified });
};

/**
 * Handles the given message.
 */
DiagramEditor.prototype.handleMessage = function(msg) {
    if (msg.event == 'configure') {
        this.configureEditor();
    }
    else if (msg.event == 'init') {
        this.initializeEditor();
    }
    else if (msg.event == 'autosave') {
        this.save(msg.xml, true, this.startElement);
    }
    else if (msg.event == 'export') {
        this.save(msg.data, false, this.startElement);
        this.stopEditing();
    }
    else if (msg.event == 'save') {
        if (msg.exit) {
            msg.event = 'exit';
        }
        else {
            this.setStatus('allChangesSaved', false);
        }
    }

    if (msg.event == 'exit') {
        if (this.format != 'xml' && !msg.modified) {
            this.postMessage({
                action: 'export', format: this.format,
                xml: msg.xml, spinKey: 'export'
            });
        }
        else {
            this.save(msg.xml, false, this.startElement);
            this.stopEditing(msg);
        }
    }
};

/**
 * Posts configure message to editor.
 */
DiagramEditor.prototype.configureEditor = function() {
    this.postMessage({ action: 'configure', config: this.config });
};

/**
 * Posts load message to editor.
 */
DiagramEditor.prototype.initializeEditor = function() {
    this.postMessage({
        action: 'load', autosave: 1, saveAndExit: '1',
        modified: 'unsavedChanges', xml: this.getData(),
        title: this.getTitle()
    });
    this.setWaiting(false);
    this.setActive(true);
};

/**
 * Saves the given data.
 */
DiagramEditor.prototype.save = function(data, draft, elt) {
    console.log('save called');
    if (this.onSave) {
        this.onSave(data);
        return;
    }
    if (elt != null && !draft) {
        this.setElementData(elt, data);
        this.done(data, draft, elt);
    }
};

/**
 * Invoked after save.
 */
DiagramEditor.prototype.done = function() {
    // hook for subclassers
};
