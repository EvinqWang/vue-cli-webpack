// 通用错误码 (仅在接入svr和命令字框架等地方使用，具体业务服务不可使用)
// 系统号定义

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
