import { createContext, useContext, useReducer, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { BOOSTERS } from '../data/boosters';
import { FLAVORS } from '../data/flavors';

// Initial state
const initialState = {
  // Inventory
  inventory: {
    boosters: [],
    bases: { pg: 500, vg: 500 },
    flavors: []
  },

  // Recipes
  recipes: [],

  // Steep Tracker
  steepEntries: [],

  // Settings
  settings: {
    roundBoosters: true,
    roundMl: 0.5,
    pgvgTolerance: 5,
    defaultNicotine: 6,
    defaultPgVg: [50, 50],
    defaultSteepDays: 10,
    // Cost tracking settings
    showCosts: true,
    basePgPricePerLiter: 8.00,
    baseVgPricePerLiter: 10.00,
    defaultBoosterPrice: 1.50,
    defaultFlavorPrice: 5.00
  },

  // Custom Products
  customBoosters: [],
  customFlavors: [],

  // UI State
  activeTab: 'mixlab',

  // Loaded recipe for "Make Again" feature
  loadedRecipe: null
};

// Action types
const ACTIONS = {
  SET_INVENTORY: 'SET_INVENTORY',
  UPDATE_INVENTORY_ITEM: 'UPDATE_INVENTORY_ITEM',
  ADD_INVENTORY_ITEM: 'ADD_INVENTORY_ITEM',
  REMOVE_INVENTORY_ITEM: 'REMOVE_INVENTORY_ITEM',

  ADD_RECIPE: 'ADD_RECIPE',
  UPDATE_RECIPE: 'UPDATE_RECIPE',
  DELETE_RECIPE: 'DELETE_RECIPE',

  ADD_STEEP: 'ADD_STEEP',
  UPDATE_STEEP: 'UPDATE_STEEP',
  DELETE_STEEP: 'DELETE_STEEP',

  UPDATE_SETTINGS: 'UPDATE_SETTINGS',

  ADD_CUSTOM_BOOSTER: 'ADD_CUSTOM_BOOSTER',
  ADD_CUSTOM_FLAVOR: 'ADD_CUSTOM_FLAVOR',

  SET_ACTIVE_TAB: 'SET_ACTIVE_TAB',

  LOAD_STATE: 'LOAD_STATE',

  // New actions
  LOAD_RECIPE_TO_LAB: 'LOAD_RECIPE_TO_LAB',
  CLEAR_LOADED_RECIPE: 'CLEAR_LOADED_RECIPE',
  CLEAR_ALL_DATA: 'CLEAR_ALL_DATA'
};

// Reducer
function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOAD_STATE:
      return { ...state, ...action.payload };

    case ACTIONS.SET_INVENTORY:
      return { ...state, inventory: action.payload };

    case ACTIONS.UPDATE_INVENTORY_ITEM:
      return {
        ...state,
        inventory: {
          ...state.inventory,
          [action.payload.category]: action.payload.category === 'bases'
            ? { ...state.inventory.bases, ...action.payload.data }
            : state.inventory[action.payload.category].map(item =>
                item.productId === action.payload.productId
                  ? { ...item, ...action.payload.data }
                  : item
              )
        }
      };

    case ACTIONS.ADD_INVENTORY_ITEM:
      return {
        ...state,
        inventory: {
          ...state.inventory,
          [action.payload.category]: [
            ...state.inventory[action.payload.category],
            action.payload.item
          ]
        }
      };

    case ACTIONS.REMOVE_INVENTORY_ITEM:
      return {
        ...state,
        inventory: {
          ...state.inventory,
          [action.payload.category]: state.inventory[action.payload.category]
            .filter(item => item.productId !== action.payload.productId)
        }
      };

    case ACTIONS.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };

    case ACTIONS.UPDATE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.map(recipe =>
          recipe.id === action.payload.id ? { ...recipe, ...action.payload } : recipe
        )
      };

    case ACTIONS.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter(recipe => recipe.id !== action.payload)
      };

    case ACTIONS.ADD_STEEP:
      return {
        ...state,
        steepEntries: [...state.steepEntries, action.payload]
      };

    case ACTIONS.UPDATE_STEEP:
      return {
        ...state,
        steepEntries: state.steepEntries.map(entry =>
          entry.id === action.payload.id ? { ...entry, ...action.payload } : entry
        )
      };

    case ACTIONS.DELETE_STEEP:
      return {
        ...state,
        steepEntries: state.steepEntries.filter(entry => entry.id !== action.payload)
      };

    case ACTIONS.UPDATE_SETTINGS:
      return {
        ...state,
        settings: { ...state.settings, ...action.payload }
      };

    case ACTIONS.ADD_CUSTOM_BOOSTER:
      return {
        ...state,
        customBoosters: [...state.customBoosters, action.payload]
      };

    case ACTIONS.ADD_CUSTOM_FLAVOR:
      return {
        ...state,
        customFlavors: [...state.customFlavors, action.payload]
      };

    case ACTIONS.SET_ACTIVE_TAB:
      return { ...state, activeTab: action.payload };

    case ACTIONS.LOAD_RECIPE_TO_LAB:
      return {
        ...state,
        loadedRecipe: action.payload,
        activeTab: 'mixlab'
      };

    case ACTIONS.CLEAR_LOADED_RECIPE:
      return { ...state, loadedRecipe: null };

    case ACTIONS.CLEAR_ALL_DATA:
      return {
        ...initialState,
        settings: state.settings // Keep settings
      };

    default:
      return state;
  }
}

// Context
const AppContext = createContext(null);

// Provider
export function AppProvider({ children }) {
  const [savedState, setSavedState] = useLocalStorage('themix-state', null);
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load saved state on mount
  useEffect(() => {
    if (savedState) {
      dispatch({ type: ACTIONS.LOAD_STATE, payload: savedState });
    }
  }, []);

  // Save state changes to localStorage
  useEffect(() => {
    const { activeTab, ...stateToSave } = state;
    setSavedState(stateToSave);
  }, [state.inventory, state.recipes, state.steepEntries, state.settings, state.customBoosters, state.customFlavors]);

  // Get all boosters (preloaded + custom)
  const getAllBoosters = () => [...BOOSTERS, ...state.customBoosters];

  // Get all flavors (preloaded + custom)
  const getAllFlavors = () => [...FLAVORS, ...state.customFlavors];

  const value = {
    state,
    dispatch,
    actions: ACTIONS,
    getAllBoosters,
    getAllFlavors
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export { ACTIONS };
