angular.module(APP_NAME_CONTROLLERS).controller('TreeController', ['KnowledgeRepository',
    function(KnowledgeRepository) {
        var repository = new KnowledgeRepository();

        var json = createJSON();
        spaceTree(json);

        function createJSON() {
            var json = {
                id: "root",
                name: "Arbre de décision",
                children: []
            };

            var conclusions = repository.getConclusions();

            for(var i=0; i<conclusions.length; i++) {
                var conclusion = conclusions[i];
                var children = {
                    id: parse("conclusion %s: %s", i, conclusion.name),
                    name: chunkName(conclusion.name),
                    children: [],
                    data: {type: "conclusion"}
                };

                for(var j=0; j<conclusion.facts.length; j++) {
                    var factName = conclusion.facts[j];
                    var fact = repository.getFact(factName);
                    var children2 = {
                        id: parse("fact%s%s: %s", i, j, fact.name),
                        name: chunkName(fact.name),
                        children: [],
                        data: {type: fact.type}
                    };

                    if(fact.type == "intermediate") {
                        for (var k = 0; k < fact.parents.length; k++) {
                            var fact2 = fact.parents[k];
                            children2.children.push({
                                id: parse("factchild%s%s%s: %s", i, j, k, fact2.name),
                                name: chunkName(fact2.name),
                                children: [],
                                data: {type: fact2.type}
                            });
                        }
                    }

                    children.children.push(children2);
                }
                json.children.push(children);
            }

            return json;
        }

        function spaceTree(json) {
            //Create a new ST instance
            var st = new $jit.ST({
                //id of viz container element
                injectInto: 'infovis',
                //set duration for the animation
//                duration: 800,
                //set animation transition type
                transition: $jit.Trans.Quart.easeInOut,
                //enable panning
                Navigation: {
                    enable:false,
                    panning:false
                },
                //set node and edge styles
                //set overridable=true for styling individual
                //nodes or edges
                Node: {
                    autoWidth: true,
                    autoHeight: true,
                    type: 'rectangle',
                    color: '#aaa',
                    overridable: true
                },

                Edge: {
                    type: 'bezier',
                    overridable: true
                },

                orientation: 'top',
                subtreeOffset: 20,
                siblingOffset: 20,
                //set distance between node and its children
                levelDistance: 60,
                offsetY: 200,

//                multitree: true,
                constrained: false,
                levelsToShow: 100,

                onBeforeCompute: function(node){
//                    console.log("loading " + node.name);
                },

                onAfterCompute: function(){
//                    if(!changedToTop) {
//                        st.switchPosition("top", "animate");
//                        changedToTop = true;
//                    }
                },

                //This method is called on DOM label creation.
                //Use this method to add event handlers and styles to
                //your node.
                onCreateLabel: function(label, node){
                    label.id = node.id;
                    label.innerHTML = node.name;
                    label.onclick = function(){
//                        if(normal.checked) {
//                            st.onClick(node.id);
//                        } else {
//                            st.setRoot(node.id, 'animate');
//                        }
                    };
                    //set label styles
                    var style = label.style;
//                    style.width = 60 + 'px';
//                    style.height = 17 + 'px';
                    style.color = '#333';
                    style.fontSize = '0.9em';
                    style.textAlign= 'center';
//                    style.padding = '3px';
                },

                //This method is called right before plotting
                //a node. It's useful for changing an individual node
                //style properties before plotting it.
                //The data properties prefixed with a dollar
                //sign will override the global node style properties.
                onBeforePlotNode: function(node){
                    //add some color to the nodes in the path between the
                    //root node and the selected node.
                    if(node.data.type == "conclusion")
                        node.data.$color = "#B0CC99";
                    else if(node.data.type == "initial")
                        node.data.$color = "#ABC8E2";
                    else if(node.data.type == "intermediate")
                        node.data.$color = "#FFEFB6";
                    else
                        node.data.$color = "#ff7";
                },

                //This method is called right before plotting
                //an edge. It's useful for changing an individual edge
                //style properties before plotting it.
                //Edge data proprties prefixed with a dollar sign will
                //override the Edge global style properties.
                onBeforePlotLine: function(adj){
                    if (adj.nodeFrom.selected && adj.nodeTo.selected) {
                        adj.data.$color = "#eed";
                        adj.data.$lineWidth = 3;
                    }
                    else {
                        delete adj.data.$color;
                        delete adj.data.$lineWidth;
                    }
                }
            });
            //load json data
            st.loadJSON(json);
//compute node positions and layout
            st.compute();
//optional: make a translation of the tree
            st.geom.translate(new $jit.Complex(-200, 0), "current");
//emulate a click on the root node.
            st.onClick(st.root);
        }

        function chunkName(name) {
//            return chunk(name, 10).join('<br>')
            return name.replace(/_/g, function() {
                return '<br>';
            });
        }

        function parse(str) {
            var args = [].slice.call(arguments, 1),
                i = 0;

            return str.replace(/%s/g, function() {
                return args[i++];
            });
        }

        function chunk(str, n) {
            var ret = [];
            for(var i=0, len=str.length; i < len; i += n) {
                ret.push(str.substr(i, n))
            }
            return ret
        }
    }]);