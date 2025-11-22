import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Input, Button } from '../common';
import { useApp } from '../../context/AppContext';
import RecipeCard from './RecipeCard';
import RecipeDetail from './RecipeDetail';

export default function Recipes() {
  const { state, dispatch, actions } = useApp();
  const { recipes } = state;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Filter recipes by search
  const filteredRecipes = recipes.filter(recipe => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return recipe.name.toLowerCase().includes(query) ||
           recipe.notes?.toLowerCase().includes(query);
  });

  // Sort by date (newest first)
  const sortedRecipes = [...filteredRecipes].sort(
    (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
  );

  const handleDelete = (id) => {
    dispatch({ type: actions.DELETE_RECIPE, payload: id });
    setSelectedRecipe(null);
  };

  const handleUpdateRating = (id, rating) => {
    dispatch({
      type: actions.UPDATE_RECIPE,
      payload: { id, rating }
    });
  };

  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Συνταγές</h2>
        <span className="text-text-secondary text-sm">
          {recipes.length} συνταγές
        </span>
      </div>

      <Input
        type="text"
        placeholder="Αναζήτηση συνταγών..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        prefix={<Search className="w-5 h-5" />}
        className="mb-4"
      />

      {sortedRecipes.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
            <Plus className="w-8 h-8 text-text-muted" />
          </div>
          <p className="text-text-secondary mb-2">
            {searchQuery ? 'Δεν βρέθηκαν συνταγές' : 'Δεν έχετε αποθηκεύσει συνταγές'}
          </p>
          <p className="text-text-muted text-sm">
            Δημιουργήστε ένα mix στο Lab και αποθηκεύστε το!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => setSelectedRecipe(recipe)}
              onUpdateRating={(rating) => handleUpdateRating(recipe.id, rating)}
            />
          ))}
        </div>
      )}

      <RecipeDetail
        recipe={selectedRecipe}
        isOpen={!!selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        onDelete={() => handleDelete(selectedRecipe?.id)}
        onUpdateRating={(rating) => handleUpdateRating(selectedRecipe?.id, rating)}
      />
    </div>
  );
}
