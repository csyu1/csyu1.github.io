$( function(){
    var model = {
        init: function() {
            localStorage.clear();
            if(!localStorage.catlist) {
                localStorage.catlist = JSON.stringify([]);
            }
        },
        
        add: function(obj){
            var data = JSON.parse(localStorage.catlist);
            data.push(obj);
            localStorage.catlist = JSON.stringify(data);
        },
        
        getCurrentCat: function() {
            return this.currentCat;
        },
        
        editCurrentCat: function(cat) {
            var data = JSON.parse(localStorage.catlist);
            data[cat.key].name = cat.name;
            data[cat.key].count = cat.count;
            data[cat.key].image = cat.image;
            this.currentCat.name = cat.name;
            this.currentCat.count= cat.count;
            this.currentCat.image = cat.image;
            localStorage.catlist = JSON.stringify(data);
            
        },
        
        setCurrentCat: function(cat) {
            this.currentCat = cat;
        },
        
        getAllCats: function() {
            return JSON.parse(localStorage.catlist);
        },
        
        increment: function() {
            this.currentCat["count"]++;
        }
        
    };
    
    var octopus = {
        editCat: function(cat) {
            model.editCurrentCat(cat);
            catListView.render();
            catShowingView.render();
        },
        
        imageClicked: function() {
            model.increment();
            catShowingView.renderCount();
        },
        
        addNewCat: function(cat) {
            var newCat ={
                name: cat.name,
                count: 0,
                image: cat.image,
                key: this.keyCount
            } 
            model.add(newCat);
            console.log("new Cat");
            console.log(newCat);
            this.keyCount++;
            if(!model.getCurrentCat()){
                model.setCurrentCat(newCat);
            }
        },
        
        changeCat: function(cat) {
            model.setCurrentCat(cat);
            catShowingView.render();
        },
        
        init: function() {
            this.keyCount = 0;
            model.init();
            catShowingView.init();
            adminView.init();
        },
        
        getAllCats: function() {
            return model.getAllCats();
        },
        
        getCurrentCat: function() {
            return model.getCurrentCat();
        },
        
        renderCatList: function() {
            catListView.render();
        }
        
    };
    
    var catListView = {
        render: function() {
            $('#cat-list').html('');
            var htmlStr = '';
            var catList = octopus.getAllCats();
            console.log(catList);
            for( var i = 0; i < catList.length; i++ ) {
                var catli = document.createElement('li');
                catli.innerHTML = catList[i].name;
                catli.addEventListener( 'click', function(catCopy) {
                    return function(){
                        octopus.changeCat( catCopy );
                    }
                }(catList[i]));
                $('#cat-list').append(catli);
            }
        }
    };
    
    var catShowingView = {
        init: function() {
            $('#cat-img').on('click', function(){
                octopus.imageClicked();
            });
        },
        render: function() {
            var cat= octopus.getCurrentCat();
            $('#cat-name').text(cat.name);
            $('#cat-img').attr('src', cat.image);
            $('#cat-count').text(cat.count);
        },
        renderCount: function() {
            var cat= octopus.getCurrentCat();
            $('#cat-count').text(cat.count);
        }
    };
    
    var adminView = {
        init: function() {
            $("#cat-admin").toggle();
            $("#admin").on('click',  function(){
                var cat= octopus.getCurrentCat();
                $("#cat-name-input").val(cat.name);
                $("#cat-count-input").val(cat.count);
                $("#cat-image-input").val(cat.image);
                $("#cat-admin").toggle();
            });
            
            $("#cat-edit-form").submit(function(e){
                var newCat = {
                    name: $("#cat-name-input").val(),
                    count: $("#cat-count-input").val(),
                    image: $("#cat-image-input").val(),
                    key: octopus.getCurrentCat().key
                };
                console.log("current");
                console.log(octopus.getCurrentCat());
                octopus.editCat( newCat );
                $('#cat-admin').toggle();
            });
            $("#cancel").on('click', function() {
               $("#cat-admin").toggle(); 
            });
            
        }
    };
    
    
    octopus.init();
    var cat= {
        name: "Dr. KittyWhiskers",
        image: "cat_picture1.jpg",
        count: 0
    };
    octopus.addNewCat( cat );
    octopus.addNewCat( {
        name: "Dr. KittyWhiskers Jr.",
        image: "cat_picture2.jpeg",
        count: 0
    });
    octopus.addNewCat( {
        name: "Dr. KittyWhiskers Sr.",
        image: "cat_picture3.jpeg",
        count: 0
    });
    octopus.renderCatList();
});