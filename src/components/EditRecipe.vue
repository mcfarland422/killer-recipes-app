<template>
    <div v-if="recipe" class="edit-recipe container">
        <h2>Edit {{ recipe.title }}</h2>
        <form @submit.prevent="EditRecipe">
            <div class="field title">
                <label for="title">Recipe Title</label>
                <input type="text" name="title" v-model="recipe.title">
            </div>
            <div v-for="(ing, index) in recipe.ingredients" :key="index" class="field">
                <label for="ingredient">Ingredient:</label>
                <input type="text" name="ingredient" v-model="recipe.ingredients[index]">
                <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add an Ingredient</label>
                <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{ feedback  }}</p>
                <button class="btn pink">Update Recipe</button>
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init'

export default {
    name: 'EditRecipe',
    data(){
        return {
            recipe: null,
            another: null,
            feedback: null
        }
    },
    methods: {
        EditRecipe(){
            console.log(this.recipe.title, this.recipe.ingredients)
        },
        addIng(){
            if(this.another){
                this.recipe.ingredients.push(this.another)
                this.another = null
                this.feedback = null
            } else {
                this.feedback = "You must enter a value to add an ingredient"
            }
        },
        deleteIng(ing){
            this.recipe.ingredients = this.recipe.ingredients.filter(ingredient => {
                return ingredient != ing
            })
        }
    },
    created(){
        let ref = db.collection('recipes').where('slug', '==', this.$route.params.recipe_slug)
        ref.get().then(snapshot => {
            snapshot.forEach(doc => {
                this.recipe = doc.data()
                this.recipe.id = doc.id
            })
        })
    },
}
</script>

<style>
.edit-recipe {
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
}
.edit-recipe h2 {
    font-size: 2em;
    margin: 20px auto;
}
.edit-recipe .field{
    margin: 20px auto;
}
.edit-recipe .delete {
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    cursor: pointer;
    font-size: 1.4em;
}
.field {
    position: relative;
}
</style>

