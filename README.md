
# Table of Contents

1.  [创建typescript nextjs的项目](#org62f7e99)
2.  [文件结构说明](#orgbf35762)



<a id="org62f7e99"></a>

# 创建typescript nextjs的项目

    npx create-next-app@latest learning-react --typescript


<a id="orgbf35762"></a>

# 文件结构说明

<p class="verse">
1. src/pages/\_app.tsx: 这个文件是全局的，它会影响到所有页面。你可以在这个文件中引入全局样式，添加全局的页面布局，或者添加一些页面级的状态。如果你有一些需要在所有页面中共享的逻辑或状态，你应该在 \_app.tsx 文件中处理<br />
2. pages/index.tsx: 根路由<br />
3. pages/xx.tsx: xx 路由。每个 pages 下的 tsx文件都会生成对应的路由<br />
</p>
