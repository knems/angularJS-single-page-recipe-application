(function(){
	'use strict';

	angular.module('app')
		.controller('RecipesController', function (dataService, $scope, $location, $route) {
			$scope.getAllCategories = dataService.getAllCategories(function (response) {
				$scope.categories = response.data;
			});

			$scope.changeCategory = function(category){
				dataService.getRecipes(category, function(response){
					if(response.data.length == 0){
						$scope.recipes = null;
					}else {
						$scope.recipes = response.data;
					}
				});
			}

			$scope.showRecipe = function(id){
				$location.path(`edit/:${id}`);
			}
		});

	angular.module('app')
		.controller('RecipeDetailController', function(dataService, $scope, $location, $route){
			let _id = $location.path().split('/').slice(2,3);
			dataService.getRecipe(_id, function(response){
				$scope.recipe = response.data;
			});
		})
})();
