# HFUTspiderCore
爬虫服务




# HFUTspiderCore  API文档

<br />

<a name="83d4b006"></a>
### 登录并获取key
```
GET /login 
```
<a name="22da452a"></a>
#### 基础参数
| 参数名 | 是否必须 | 描述 |
| --- | --- | --- |
| username | 是 | 学号 |
| password | 是 | 密码 |
| target | 否  默认app | 目标平台 |

> 注：这里的密码统一是教务系统的密码，就是登录教务App的密码，可能与信息门户密码不同。

<a name="cafacb32"></a>
#### 平台支持

- App端教务
| 参数名 | 值 |
| --- | --- |
| target | app |

- Web端教务
| 参数名 | 值 |
| --- | --- |
| target | web |

- WebVPN端教务
| 参数名 | 值 |
| --- | --- |
| target | webvpn |



<a name="aa999385"></a>
### 获取课表信息
```
GET /schedule
```
<a name="22da452a-1"></a>
#### 基础参数
| 参数名 | 是否必须 | 描述 |
| --- | --- | --- |
| key | 是 | login接口登陆成功获取的key |
| target | 否  默认app | 目标平台 |
| semestercode/semesterId | 是 | 学期id，详见下方 |
| weekIndex | 否  不带这个参数返回整个学期的 | 第几周 |

> 注：各平台之间key不能混用。除App端以外，其余平台的key均有使用一定的使用时间限制

<a name="cafacb32-1"></a>
#### 平台支持

- App端教务
| 参数名 | 值 |
| --- | --- |
| semestercode | 2019-2020第二学期为：036 |

- Web端教务/WebVPN端教务
| 参数名 | 值 |
| --- | --- |
| semesterId | 2019-2020第二学期为：144 |



<a name="353f9d1f"></a>
### 获取成绩信息
```
GET /scorelist
```

<a name="KFWFy"></a>
#### 基础参数
| 参数名 | 是否必须 | 描述 |
| --- | --- | --- |
| key | 是 | login接口登陆成功获取的key |
| target | 否  默认app | 目标平台 |
| semestercode/semesterId | 否  不带这个参数可返回全部成绩 | 详见下方 |

<a name="Y75vL"></a>
#### 平台支持

- App端教务
| 参数名 | 值 |
| --- | --- |
| semestercode | 2019-2020第二学期为：036 |

- Web端教务/WebVPN端教务
| 参数名 | 值 |
| --- | --- |
| semesterId | 2019-2020第二学期为：144 |


<br />

