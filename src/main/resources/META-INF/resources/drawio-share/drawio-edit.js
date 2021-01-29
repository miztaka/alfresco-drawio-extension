/**
 * Drawio edit online component.
 *
 * @namespace Catalyst
 * @class Catalyst.Drawio
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
            console.log(me);
            console.log(me.options);
            var title = me.options.metadata.name.prefixedName.substring(3);
            var fmt = 'xml';
            if (title.match(/\.drawio\.png$/)) {
                fmt = 'xmlpng';
            }
            console.log(title);
            console.log(fmt);

            require(["jquery"], (function ($) {
                $('#drawiocontainer').remove();

                var container = '<div id="drawiocontainer"></div>';
                $('#libreoffice-online').append(container);
                me.getData('/share/proxy/alfresco/api/node/content/workspace/SpacesStore/' + id, fmt, function(src) {
                    DiagramEditor.startEditing('drawiocontainer', src, fmt, title, function(data, afterSaved) {
                        console.log('onSave called.');
                        console.log(typeof (data));
                        var fileObj = new File([data], title, {
                            type: 'application/octet-stream'
                        });
                        var formData = new FormData();
                        formData.append('filedata', fileObj);
                        formData.append('filename', title);
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
                                if (afterSaved) {
                                    afterSaved();
                                }
                            }
                        });
                    }, null, null, function() {
                            window.location.href = `/share/page/document-details?nodeRef=${me.options.nodeRef}`;
                    });
                });

                $('#loleafletframe').load(function () {
                    console.log("Loaded drawio");
                });

            }));

        },
        getData: function(url, fmt, callback) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function() {
                if (fmt === 'xmlpng') {
                    var reader = new FileReader();
                    reader.onloadend = function() {
                        callback(reader.result);
                    }
                    reader.readAsDataURL(xhr.response);
                } else {
                    callback(xhr.responseText);
                }
            };
            console.log(url);
            xhr.open('GET', url);
            if (fmt === 'xmlpng') {
                xhr.responseType = 'blob';
            }
            xhr.send();
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
function DiagramEditor(id, config, ui, done) {
    this.config = (config != null) ? config : this.config;
    this.done = (done != null) ? done : this.done;
    this.ui = (ui != null) ? ui : this.ui;
    this.container = document.getElementById(id);
    var self = this;

    this.handleMessageEvent = function(evt) {
        console.log('received event:', evt);
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
/*
DiagramEditor.editElement = function(elt, config, ui, done) {
    return new DiagramEditor(config, ui, done).editElement(elt);
};
*/

DiagramEditor.startEditing = function(id, data, type, title, callback, config, ui, done) {
    DiagramEditor.prototype.onSave = callback;
    return new DiagramEditor(id, config, ui, done).startEditing(data, type, title);
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

/**
 * Callback function when a document is saved
 */
DiagramEditor.prototype.onSave = null;

/**
 * Adds the iframe and starts editing.
 */
/*
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
*/

/**
 * Adds the iframe and starts editing.
 */
/*
DiagramEditor.prototype.getElementData = function(elem) {
    var name = elem.nodeName.toLowerCase();

    return elem.getAttribute((name == 'svg') ? 'content' :
        ((name == 'img') ? 'src' : 'data'));
};
*/

/**
 * Adds the iframe and starts editing.
 */
/*
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
*/

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
        this.container.appendChild(this.frame);
        //this.setWaiting(true);
    }
};

/**
 * Updates the waiting cursor.
 */
/*
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
*/

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
        this.container.removeChild(this.frame);
        this.setActive(false);
        this.frame = null;
        this.done();
    }
};

/**
 * Send the given message to the iframe.
 */
DiagramEditor.prototype.postMessage = function(msg) {
    console.log('postMessage: ', msg);
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

    /*
    if (this.ui != null) {
        url += '&ui=' + this.ui;
    }
    */

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
    console.log('Handle message:', msg);
    var self = this;
    if (msg.event == 'configure') {
        this.configureEditor();
    }
    else if (msg.event == 'init') {
        this.initializeEditor();
    }
    else if (msg.event == 'autosave') {
        //this.save(msg.xml, true, this.startElement);
    }
    else if (msg.event == 'export') {
        fetch(msg.data)
            .then(res => res.blob())
            .then(blob => {
                console.log('Save blob...');
                this.save(blob, false, msg.message.exit);
            });
    }
    else if (msg.event == 'save') {
        if (msg.xml) {
            if (this.format === 'xmlpng') {
                this.postMessage({
                    action: 'export',
                    format: 'xmlpng',
                    xml: msg.xml,
                    spinKey: 'export',
                    exit: !!msg.exit,
                });
                return;
            } else {
                this.save(msg.xml, false, msg.exit);
            }
        }
    }

    if (msg.event == 'exit') {
        this.stopEditing();
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

    console.log(this.data);

    if (this.isDataEmpty()) {
        this.postMessage({
            action: 'template',
            autosave: '0', saveAndExit: '1',
            modified: 'unsavedChanges'
        });
    } else {
        this.postMessage({
            action: 'load', autosave: '0', saveAndExit: '1',
            modified: 'unsavedChanges', xml: this.getData(),
            title: this.getTitle()
        });
    }
    //this.setWaiting(false);
    this.setActive(true);
};

/**
 * Saves the given data.
 */
DiagramEditor.prototype.save = function(data, draft, exit) {
    console.log('save called', data);
    var self = this;
    if (this.onSave) {
        self.spinner('Saving...');
        this.onSave(data, function() {
            self.spinner(null);
            self.setStatus('allChangesSaved', true);
            if (exit) {
                self.stopEditing();
            }
        });
    }
};

/**
 * Invoked after save.
 */
DiagramEditor.prototype.done = function() {
    // hook for subclassers
};

DiagramEditor.prototype.spinner = function(msg) {
    if (!msg) {
        this.postMessage({
            action: 'spinner',
            show: false,
        });
    } else {
        this.postMessage({
            action: 'spinner',
            message: msg,
        });
    }
}

DiagramEditor.prototype.isDataEmpty = function() {
    if (this.format === 'xmlpng') {
        var chunk = this.data.split(',');
        if (chunk.length < 2 || chunk[1].length === 0) {
            return true;
        }
        return false;
    }
    return this.data.length === 0;
}
