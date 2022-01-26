# 注意事项
	此项目与单脚本结构不同,请不要将无关文件放进parse目录
	请不要将parse目录文件放scripts目录运行
	某些面板不支持项目文件整体拉取,会破坏拉取的项目结构,请先翻阅README了解
	环境变量不能有shareCode

# 项目结构
	util: 项目调用函数文件夹
	parse: 解析脚本存放目录
    temp: 缓存文件目录
	static: 静态文件目录
	cookie: cookie文件目录
	config:	配置文件目录
	log: 日志文件目录
	template.js: 项目主体文件
	main.js: 项目入口文件
	qitoCreat: 生成入口以及添加定时

# 使用方法
	node main.js jd_task_test [-help n -custom x -limit x]

# 初始化

	为避免第三方滥用,请自行添加环境变量

    QITOQITO=UdlM2TYTZzADOwM:cb3d623b4bdf699c8464b50ad61c25dcbc655711
    QITOQITO_PLATFORM=按照所使用面板正确填写 qinglong|jtask|jd 其中一个 [青龙面板:qinglong, v3系列:jtask, 衍生面板:jd],
	QITOQITO_SYNC=1 当有此变量时,面板定时会与项目定时同步,如需自行修改,请勿添加该字段
	QITOQITO_COVER=1 当有此变量时候,qitoCreat会强制覆盖之前生成的入口文件

 
# 环境变量
	# COOKIE
	JD_COOKIE=面板自带,不需要自行添加
	JD_COOKIE_MAIN=全局主号助力人数

# 脚本字段
    脚本字段是自行定义某一个脚本运行的一些变量,如果有需求可自行添加环境变量
    
    filename_help: 设置助力主号数
    filename_custom: 自定义字段
	filename_limit: 限制运行账号数
# 食用方法
    # 青龙面板
	rm -rf /ql/repo/qitoqito_kedaya && ql repo https://github.com/qitoqito/kedaya.git kedaya && cp -a /ql/repo/qitoqito_kedaya/. /ql/scripts && task qitoCreat.js now
   
    # v3系列
    rm -rf kedaya && git clone  https://github.com/qitoqito/kedaya.git  && cp -a kedaya/. ./scripts && jtask qitoCreat now
    
     # 衍生面板
    rm -rf kedaya && git clone  https://github.com/qitoqito/kedaya.git  && cp -a kedaya/. ./scripts && jd qitoCreat now
    
    # 其他面板
    同步解压到scripts目录,运行creat.js生成入口文件

# 定时任务
    # v3系列
    45 * * * * bash -c "rm -rf kedaya && git clone  https://github.com/qitoqito/kedaya.git  && cp -a kedaya/. ./scripts && jtask qitoCreat now"
    
    # 衍生面板
    45 * * * * bash -c "rm -rf kedaya && git clone  https://github.com/qitoqito/kedaya.git  && cp -a kedaya/. ./scripts && jd qitoCreat now"
	
	 
# 通知字段

	# telegram
	TELEGRAM_TOKEN=
	TELEGRAM_ID=
	TELEGRAM_URL=自定义TG代理链接
	TELEGRAM_PROXY=代理服务器 (http|https|sock)://ip:port, 使用sock需要安装 socks-proxy-agent 模块

	# bark
	BARK_TOKEN=
	BARK_URL=自定义url
	BARK_SOUND=自定义铃声

	# 钉钉
	DINGTALK_TOKEN=
	DINGTALK_SECRET=密钥

	# igot
	IGOT_TOKEN=

	# server酱
	FTQQ_TOKEN=

	# pushplus
	PUSHPLUS_TOKEN=
	PUSHPLUS_TOPIC=群组

	# 企业微信
	WEIXIN_TOKEN=

	# 企业微信AM
	WXAM_TOKEN=

# 通知昵称
	运行jd_task_user
    编辑config/jdUser.js
	找到对应账号的nickName字段填写后保存

    
