
'use strict';

angular.module('app')
	.service('dataService', function ($http){
		//get request to return all recipies
		this.getAllRecipes = function(callback) {
			$http.get('http://localhost:5000/api/recipes')
			.then(callback);
		}
		//get request to return all categories
		this.getAllCategories = function(callback) {
			$http.get('http://localhost:5000/api/categories')
			.then(callback);
		}
		//get request to return specific category
		this.getRecipes = function(category, callback) {
			$http.get(`http://localhost:5000/api/recipes?category=${category}`)
			.then(callback);
		}
		//get request to return specific recipie by id
		this.getRecipe = function(recipe_id, callback) {
			$http.get(`http://localhost:5000/api/recipes/${recipe_id}`)
			.then(callback);
		}
		//get request to return all fooditems avaliable for crafting recipes
		this.getFoodItems = function(callback) {
			$http.get(`http://localhost:5000/api/foodItems`)
			.then(callback);
		}
		//post request for a new recipe
		this.postNewRecipe = function(data) {
			$http.post(`/api/recipes`, data)
		}
		//put request for updating a recipe
		this.updateRecipe = function(recipe) {
			$http.put(`/api/recipes/${recipe._id}`, recipe)
		}
		//delete request by recipe id
		this.deleteRecipe = function(id) {
			$http.delete(`http://localhost:5000/api/recipes/${id}`)
		}
	});
