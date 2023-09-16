import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Home from "../components/home/Home";
import Publiclayout from "../components/layout/publicLayout/Publiclayout";
import Profile from "../components/profile/Profile";
import Recipe from "../components/detail/Recipe";
import Searching from "../components/search/Searching";
import Admin from "../components/admin/Admin";
import CreateRecipe from "../components/recipe/CreateRecipe";
export const publicRouter = [
	{
		element: Home,
		path: "/",
		layout: Publiclayout,
	},
	{
		element: Login,
		path: "/login",
	},
	{
		element: Register,
		path: "/register",
	},
	{
		element: Profile,
		path: "/:slug/profile",
		layout: Publiclayout,
	},
	{
		element: CreateRecipe,
		path: "/recipe/create"
	},
	{
		element: Recipe,
		path: "/recipe/:slug",
		layout: Publiclayout,
	},
	{
		element: Searching,
		path: "/search",
		layout: Publiclayout,
	},
	{
		element: Admin,
		path: "/admin/manager/:slug"
	}
];
export const adminRouter = [
	
];

export const userRouter = [

];
