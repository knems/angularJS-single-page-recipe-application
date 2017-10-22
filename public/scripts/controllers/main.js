(function(){
	'use strict';

	angular.module('app')
		.controller('RecipesController', function (dataService, $scope, $location, $route, $window) {

			dataService.getAllRecipes(function(response){
				$scope.recipes = response.data;
			});

			dataService.getAllCategories(function (response) {
				$scope.categories = response.data;
			});

			//func fires when category is changed and template displays the returned categories
			$scope.changeCategory = function(category){
				//when 'All Categories' is selected
				if(category == undefined){
					//all recipes will show
					dataService.getAllRecipes(function(response){
						$scope.recipes = response.data;
					});
				//else specfic recipes will show, based of the category
				}else{
					dataService.getRecipes(category, function(response){
						if(response.data.length == 0){
							$scope.recipes = null;
						}else {
							$scope.recipes = response.data;
						}
					});
				}
			}

			$scope.redirect = function(path) {
				$location.url(path);
			}

			$scope.delete = function(category, id){
				if(confirm('Are you sure you want to delete this recipe?')){
					dataService.deleteRecipe(id);
					if(category == undefined){
						dataService.getAllRecipes(function(response){
							$scope.recipes = response.data;

						});
					}else {
						dataService.getRecipes(category, function(response){
							if(response.data.length == 0){
								$scope.recipes = null;
							}else {
								$scope.recipes = response.data;
							}

						});
					}
					$route.reload();
				}
			}
		});

	angular.module('app')
		.controller('RecipeDetailController', function(dataService, $scope, $location, $route){

			//finding the id by the change in path, will be an empty array if the path is to add a new recipe
			let _id = $location.path().split('/').slice(2,3);

			//if the path is not empty then
			if(_id.length !== 0){
				//update the template with the given recipe id
				dataService.getRecipe(_id, function(response){
					$scope.recipe = response.data;
				});
				//else we are going to construct a default recipe, where we can set the data
			}else{
				$scope.recipe = {
	        name: "",
	        description: "",
	        category: "",
	        prepTime: "",
	        cookTime: "",
	        ingredients: [],
	        steps: []
    		};
			}
			//setting the categories
			dataService.getAllCategories(function (response) {
				$scope.categories = response.data;
			});
			//setting the food items
			dataService.getFoodItems(function (response) {
				$scope.foodItems = response.data;
			});

			//func fires when 'Save Recipe' is clicked
			$scope.redirect = function(path){
				//if the current recipe is null we will post as a new recipe
				if(!$scope.recipe._id){
					dataService.postNewRecipe($scope.recipe);
				//else means we are modifing an existing recipe and will make the put request
				}else{
					dataService.updateRecipe($scope.recipe);
				}
				//return to the root url
				$location.url(path);
			}

			$scope.cancel = function(){
				$location.url('/');
			}

			//general delete func for ingredients and steps
			$scope.delete = function(index, path){
				$scope.recipe[path].splice(index, 1);
			}

			$scope.add = function(args, path){
				let result = {};
				args.forEach((value) => {
					result.value = "";
				});
				$scope.recipe[path].push(result);
			}
		})
})();
