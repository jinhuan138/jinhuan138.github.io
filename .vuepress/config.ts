import { defineUserConfig } from "vuepress";
import recoTheme from "vuepress-theme-reco";
import { viteBundler } from "@vuepress/bundler-vite";
//https://theme-reco.vuejs.press/
//https://vuepress.vuejs.org/zh/guide/getting-started.html

export default defineUserConfig({
	title: "blog",
	description: "Just playing around",
	bundler: viteBundler(),
	head: [
		[
			"meta",
			{
				name: "viewport",
				content: "width=device-width,initial-scale=1,user-scalable=no",
			},
			"meta",
			{
				name: "algolia-site-verification",
				content: "E6D2EA614E8E3C33",
			},
		], //移动端优化
		["link", { rel: "icon", href: "/Blog/logo/1.jpg" }],
		[
			"script",
			{
				async: true,
				src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9017742413133429",
				crossorigin: "anonymous",
			},
		],
		[
			"meta",
			{ name: "google-adsense-account", content: "ca-pub-9017742413133429" },
		],
	],
	theme: recoTheme({
		logo: "/logo/1.jpg",
		author: "jinhuan",
		authorAvatar: "/head.jpg",
		lastUpdatedText: "",
		// series 为原 sidebar
		autoSetSeries: true,
		// series: {
		// 	"/docs/theme-reco/": [
		// 		{
		// 			text: "module one",
		// 			children: ["home", "theme"],
		// 		},
		// 		{
		// 			text: "module two",
		// 			children: ["api", "plugin"],
		// 		},
		// 	],
		// },
		navbar: [
			{ text: "Home", link: "/" },
			{
				text: "FontEnd",
				children: [
					{
						text: "vue",
						link: "/blogs/FontEnd/Vue/Vue.md",
					},
					{
						text: "vue3",
						link: "/blogs/FontEnd/Vue/Vue3.md",
					},
					{
						text: "Electron",
						link: "/blogs/FontEnd/Electron/Electron.md",
					},
				],
			},
			{
				text: "BackEnd",
				children: [
					{
						text: "NestJs",
						link: "/blogs/BackEnd/NestJs/NestJs.md",
					},
				],
			},
		],
	}),
	// debug: true,
});
