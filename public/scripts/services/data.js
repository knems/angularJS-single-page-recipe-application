
'use strict';

angular.module('app')
	.service('dataService', function ($http){
		this.getAllCategories = function(callback) {
			$http.get('http://localhost:5000/api/categories')
			.then(callback);
		};
		this.getRecipes = function(category, callback) {
			$http.get(`http://localhost:5000/api/recipes?category=${category}`)
			.then(callback);
		}
		this.getRecipe = function(recipe_id, callback) {
			$http.get(`http://localhost:5000/api/recipes/${recipe_id}`)
			.then(callback);
		}
	});
