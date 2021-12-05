const Template = require('../../template');

class Main extends Template {
    constructor() {
        super()
        this.title = "京喜购物返红包助力"
        this.cron = "15 */2 * * *"
        this.task = 'all'
        this.help = 'main'
        this.import = ['jdAlgo']
        this.verify = 1
    }

    async prepare() {
        this.algo = new this.modules.jdAlgo()
        this.algo.set({
            'appId': 10022,
            type: 'pingou',
            // verify: 1
        })
        let url = `https://wq.jd.com/bases/orderlist/list?order_type=3&start_page=1&last_page=0&page_size=10&callersource=newbiz&t=${this.timestamp}&traceid=&g_ty=ls&g_tk=606717070`
        for (let cookie of this.cookies['help']) {
            let s = await this.curl({
                    url,
                    cookie
                }
            )
            try {
                for (let k of s.orderList) {
                    try {
                        let orderid = k.parentId != '0' ? k.parentId : k.orderId
                        console.log(`正在查询订单: ${orderid}`)
                        let url = `https://wq.jd.com/fanxianzl/zhuli/QueryGroupDetail?isquerydraw=1&orderid=${orderid}&groupid=&_=1619853863315&sceneval=2&g_login_type=1&g_ty=ls`
                        let ss = await this.algo.curl({
                                url,
                                cookie
                            }
                        )
                        if (ss.data.groupinfo) {
                            let now = parseInt(new Date() / 1000)
                            let end = ss.data.groupinfo.end_time
                            if (end>now && ss.data.groupinfo.openhongbaosum != ss.data.groupinfo.totalhongbaosum) {
                                let groupid = ss.data.groupinfo.groupid;
                                this.shareCode.push({
                                    'groupid': groupid
                                })
                                await this.curl({
                                    'url': `http://m-jd.cn/tool/jingxi/?key=${encodeURIComponent(`https://wqsd.jd.com/sns/201907/25/rebate/index.html?groupid=${groupid}`)}`,
                                    cookie: ''
                                })
                            }
                        }
                    } catch (e) {
                        console.log(e.message());
                    }
                }
            } catch (e) {
            }
        }
    }

    async main(id) {
        id.url = `http://wq.jd.com/fanxianzl/zhuli/Help?groupid=${id.inviter.groupid}&_stk=groupid&_ste=2&g_ty=ls&g_tk=1710198667&sceneval=2&g_login_type=1`
        let s = await this.algo.curl(id)
        console.log(this.haskey(s, 'data.prize.discount'))
    }
}

module.exports = Main;
