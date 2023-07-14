<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <p>
            For a guide and recipes on how to configure / customize this
            project,<br />
            check out the
            <a href="https://cli.vuejs.org" target="_blank" rel="noopener"
                >vue-cli documentation</a
            >.
        </p>
        <h3>Installed CLI Plugins</h3>
        <ul>
            <li>
                <a
                    href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel"
                    target="_blank"
                    rel="noopener"
                    >babel</a
                >
            </li>
            <li>
                <a
                    href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint"
                    target="_blank"
                    rel="noopener"
                    >eslint</a
                >
            </li>
        </ul>
        <h3>Essential Links</h3>
        <ul>
            <li>
                <a href="https://vuejs.org" target="_blank" rel="noopener"
                    >Core Docs</a
                >
            </li>
            <li>
                <a href="https://forum.vuejs.org" target="_blank" rel="noopener"
                    >Forum</a
                >
            </li>
            <li>
                <a href="https://chat.vuejs.org" target="_blank" rel="noopener"
                    >Community Chat</a
                >
            </li>
            <li>
                <a
                    href="https://twitter.com/vuejs"
                    target="_blank"
                    rel="noopener"
                    >Twitter</a
                >
            </li>
            <li>
                <a href="https://news.vuejs.org" target="_blank" rel="noopener"
                    >News</a
                >
            </li>
        </ul>
        <h3>Ecosystem</h3>
        <ul>
            <li>
                <a
                    href="https://router.vuejs.org"
                    target="_blank"
                    rel="noopener"
                    >vue-router</a
                >
            </li>
            <li>
                <a href="https://vuex.vuejs.org" target="_blank" rel="noopener"
                    >vuex</a
                >
            </li>
            <li>
                <a
                    href="https://github.com/vuejs/vue-devtools#vue-devtools"
                    target="_blank"
                    rel="noopener"
                    >vue-devtools</a
                >
            </li>
            <li>
                <a
                    href="https://vue-loader.vuejs.org"
                    target="_blank"
                    rel="noopener"
                    >vue-loader</a
                >
            </li>
            <li>
                <a
                    href="https://github.com/vuejs/awesome-vue"
                    target="_blank"
                    rel="noopener"
                    >awesome-vue</a
                >
            </li>
        </ul>
        <button @click="handleClick(123)">点击</button>
    </div>
</template>

<script lang='ts'>
// import { ESystemId } from "../Proto/Errcode";

export enum ESystemId {
    /** 账户系统id */
    EAccountSystem = 10,
    /** 交易系统id */
    ETradeSystem = 11,
    /** 投顾系统id */
    EICSystem = 12,
    /** 通用基础系统id */
    ECommBaseSystem = 13,
    /** 产品中心系统id */
    EProductSystem = 14,
    /** 清算系统id */
    ECheckSystem = 15,
    /** 外部依赖系统id */
    EExternalDependSystem = 16,
    /** 合规要素系统id */
    EComplianceFactorSystem = 17,
    /** 通用库系统id */
    ECommLibErr = 19,
    /** 双录系统id */
    EDualRecordSystem = 20,
    /** 组合交易中心id */
    EFoFSystem = 21,
    /** 资金域 */
    ECapitalDomainSystem = 22,
    /** C端 */
    EJVLogicSystem = 23,
}

export default {
    name: "HelloWorld",
    props: {
        msg: String,
    },
    methods: {
        handleClick() {
            const ret = ESystemId.EAccountSystem
            switch (ret) {
                case ESystemId.EAccountSystem:
                    console.log("ESystemId.EAccountSystem");
                    break;
                default:
                    break;
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
