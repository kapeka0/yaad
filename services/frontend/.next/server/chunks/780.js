exports.id=780,exports.ids=[780],exports.modules={44:(a,b,c)=>{"use strict";let d=c(35567);a.exports=(a,b)=>{let c=d(a,b);return c&&c.prerelease.length?c.prerelease:null}},843:(a,b,c)=>{"use strict";let d=c(72988),e=c(36317),{ANY:f}=e,g=c(9261),h=c(35463),i=[new e(">=0.0.0-0")],j=[new e(">=0.0.0")],k=(a,b,c)=>{let d,e,k,n,o,p,q;if(a===b)return!0;if(1===a.length&&a[0].semver===f)if(1===b.length&&b[0].semver===f)return!0;else a=c.includePrerelease?i:j;if(1===b.length&&b[0].semver===f)if(c.includePrerelease)return!0;else b=j;let r=new Set;for(let b of a)">"===b.operator||">="===b.operator?d=l(d,b,c):"<"===b.operator||"<="===b.operator?e=m(e,b,c):r.add(b.semver);if(r.size>1)return null;if(d&&e&&((k=h(d.semver,e.semver,c))>0||0===k&&(">="!==d.operator||"<="!==e.operator)))return null;for(let a of r){if(d&&!g(a,String(d),c)||e&&!g(a,String(e),c))return null;for(let d of b)if(!g(a,String(d),c))return!1;return!0}let s=!!e&&!c.includePrerelease&&!!e.semver.prerelease.length&&e.semver,t=!!d&&!c.includePrerelease&&!!d.semver.prerelease.length&&d.semver;for(let a of(s&&1===s.prerelease.length&&"<"===e.operator&&0===s.prerelease[0]&&(s=!1),b)){if(q=q||">"===a.operator||">="===a.operator,p=p||"<"===a.operator||"<="===a.operator,d){if(t&&a.semver.prerelease&&a.semver.prerelease.length&&a.semver.major===t.major&&a.semver.minor===t.minor&&a.semver.patch===t.patch&&(t=!1),">"===a.operator||">="===a.operator){if((n=l(d,a,c))===a&&n!==d)return!1}else if(">="===d.operator&&!g(d.semver,String(a),c))return!1}if(e){if(s&&a.semver.prerelease&&a.semver.prerelease.length&&a.semver.major===s.major&&a.semver.minor===s.minor&&a.semver.patch===s.patch&&(s=!1),"<"===a.operator||"<="===a.operator){if((o=m(e,a,c))===a&&o!==e)return!1}else if("<="===e.operator&&!g(e.semver,String(a),c))return!1}if(!a.operator&&(e||d)&&0!==k)return!1}return(!d||!p||!!e||0===k)&&(!e||!q||!!d||0===k)&&!t&&!s&&!0},l=(a,b,c)=>{if(!a)return b;let d=h(a.semver,b.semver,c);return d>0?a:d<0||">"===b.operator&&">="===a.operator?b:a},m=(a,b,c)=>{if(!a)return b;let d=h(a.semver,b.semver,c);return d<0?a:d>0||"<"===b.operator&&"<="===a.operator?b:a};a.exports=(a,b,c={})=>{if(a===b)return!0;a=new d(a,c),b=new d(b,c);let e=!1;a:for(let d of a.set){for(let a of b.set){let b=k(d,a,c);if(e=e||null!==b,b)continue a}if(e)return!1}return!0}},1660:a=>{"use strict";a.exports=JSON.parse('{"acl":{"arity":-2,"flags":[],"keyStart":0,"keyStop":0,"step":0},"append":{"arity":3,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"asking":{"arity":1,"flags":["fast"],"keyStart":0,"keyStop":0,"step":0},"auth":{"arity":-2,"flags":["noscript","loading","stale","fast","no_auth","allow_busy"],"keyStart":0,"keyStop":0,"step":0},"bgrewriteaof":{"arity":1,"flags":["admin","noscript","no_async_loading"],"keyStart":0,"keyStop":0,"step":0},"bgsave":{"arity":-1,"flags":["admin","noscript","no_async_loading"],"keyStart":0,"keyStop":0,"step":0},"bitcount":{"arity":-2,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"bitfield":{"arity":-2,"flags":["write","denyoom"],"keyStart":1,"keyStop":1,"step":1},"bitfield_ro":{"arity":-2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"bitop":{"arity":-4,"flags":["write","denyoom"],"keyStart":2,"keyStop":-1,"step":1},"bitpos":{"arity":-3,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"blmove":{"arity":6,"flags":["write","denyoom","noscript","blocking"],"keyStart":1,"keyStop":2,"step":1},"blmpop":{"arity":-5,"flags":["write","blocking","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"blpop":{"arity":-3,"flags":["write","noscript","blocking"],"keyStart":1,"keyStop":-2,"step":1},"brpop":{"arity":-3,"flags":["write","noscript","blocking"],"keyStart":1,"keyStop":-2,"step":1},"brpoplpush":{"arity":4,"flags":["write","denyoom","noscript","blocking"],"keyStart":1,"keyStop":2,"step":1},"bzmpop":{"arity":-5,"flags":["write","blocking","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"bzpopmax":{"arity":-3,"flags":["write","noscript","blocking","fast"],"keyStart":1,"keyStop":-2,"step":1},"bzpopmin":{"arity":-3,"flags":["write","noscript","blocking","fast"],"keyStart":1,"keyStop":-2,"step":1},"client":{"arity":-2,"flags":[],"keyStart":0,"keyStop":0,"step":0},"cluster":{"arity":-2,"flags":[],"keyStart":0,"keyStop":0,"step":0},"command":{"arity":-1,"flags":["loading","stale"],"keyStart":0,"keyStop":0,"step":0},"config":{"arity":-2,"flags":[],"keyStart":0,"keyStop":0,"step":0},"copy":{"arity":-3,"flags":["write","denyoom"],"keyStart":1,"keyStop":2,"step":1},"dbsize":{"arity":1,"flags":["readonly","fast"],"keyStart":0,"keyStop":0,"step":0},"debug":{"arity":-2,"flags":["admin","noscript","loading","stale"],"keyStart":0,"keyStop":0,"step":0},"decr":{"arity":2,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"decrby":{"arity":3,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"del":{"arity":-2,"flags":["write"],"keyStart":1,"keyStop":-1,"step":1},"discard":{"arity":1,"flags":["noscript","loading","stale","fast","allow_busy"],"keyStart":0,"keyStop":0,"step":0},"dump":{"arity":2,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"echo":{"arity":2,"flags":["fast"],"keyStart":0,"keyStop":0,"step":0},"eval":{"arity":-3,"flags":["noscript","stale","skip_monitor","no_mandatory_keys","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"eval_ro":{"arity":-3,"flags":["readonly","noscript","stale","skip_monitor","no_mandatory_keys","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"evalsha":{"arity":-3,"flags":["noscript","stale","skip_monitor","no_mandatory_keys","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"evalsha_ro":{"arity":-3,"flags":["readonly","noscript","stale","skip_monitor","no_mandatory_keys","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"exec":{"arity":1,"flags":["noscript","loading","stale","skip_slowlog"],"keyStart":0,"keyStop":0,"step":0},"exists":{"arity":-2,"flags":["readonly","fast"],"keyStart":1,"keyStop":-1,"step":1},"expire":{"arity":-3,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"expireat":{"arity":-3,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"expiretime":{"arity":2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"failover":{"arity":-1,"flags":["admin","noscript","stale"],"keyStart":0,"keyStop":0,"step":0},"fcall":{"arity":-3,"flags":["noscript","stale","skip_monitor","no_mandatory_keys","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"fcall_ro":{"arity":-3,"flags":["readonly","noscript","stale","skip_monitor","no_mandatory_keys","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"flushall":{"arity":-1,"flags":["write"],"keyStart":0,"keyStop":0,"step":0},"flushdb":{"arity":-1,"flags":["write"],"keyStart":0,"keyStop":0,"step":0},"function":{"arity":-2,"flags":[],"keyStart":0,"keyStop":0,"step":0},"geoadd":{"arity":-5,"flags":["write","denyoom"],"keyStart":1,"keyStop":1,"step":1},"geodist":{"arity":-4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"geohash":{"arity":-2,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"geopos":{"arity":-2,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"georadius":{"arity":-6,"flags":["write","denyoom","movablekeys"],"keyStart":1,"keyStop":1,"step":1},"georadius_ro":{"arity":-6,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"georadiusbymember":{"arity":-5,"flags":["write","denyoom","movablekeys"],"keyStart":1,"keyStop":1,"step":1},"georadiusbymember_ro":{"arity":-5,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"geosearch":{"arity":-7,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"geosearchstore":{"arity":-8,"flags":["write","denyoom"],"keyStart":1,"keyStop":2,"step":1},"get":{"arity":2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"getbit":{"arity":3,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"getdel":{"arity":2,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"getex":{"arity":-2,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"getrange":{"arity":4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"getset":{"arity":3,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"hdel":{"arity":-3,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"hello":{"arity":-1,"flags":["noscript","loading","stale","fast","no_auth","allow_busy"],"keyStart":0,"keyStop":0,"step":0},"hexists":{"arity":3,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"hexpire":{"arity":-6,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"hpexpire":{"arity":-6,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"hget":{"arity":3,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"hgetall":{"arity":2,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"hincrby":{"arity":4,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"hincrbyfloat":{"arity":4,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"hkeys":{"arity":2,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"hlen":{"arity":2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"hmget":{"arity":-3,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"hmset":{"arity":-4,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"hrandfield":{"arity":-2,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"hscan":{"arity":-3,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"hset":{"arity":-4,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"hsetnx":{"arity":4,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"hstrlen":{"arity":3,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"hvals":{"arity":2,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"incr":{"arity":2,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"incrby":{"arity":3,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"incrbyfloat":{"arity":3,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"info":{"arity":-1,"flags":["loading","stale"],"keyStart":0,"keyStop":0,"step":0},"keys":{"arity":2,"flags":["readonly"],"keyStart":0,"keyStop":0,"step":0},"lastsave":{"arity":1,"flags":["loading","stale","fast"],"keyStart":0,"keyStop":0,"step":0},"latency":{"arity":-2,"flags":[],"keyStart":0,"keyStop":0,"step":0},"lcs":{"arity":-3,"flags":["readonly"],"keyStart":1,"keyStop":2,"step":1},"lindex":{"arity":3,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"linsert":{"arity":5,"flags":["write","denyoom"],"keyStart":1,"keyStop":1,"step":1},"llen":{"arity":2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"lmove":{"arity":5,"flags":["write","denyoom"],"keyStart":1,"keyStop":2,"step":1},"lmpop":{"arity":-4,"flags":["write","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"lolwut":{"arity":-1,"flags":["readonly","fast"],"keyStart":0,"keyStop":0,"step":0},"lpop":{"arity":-2,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"lpos":{"arity":-3,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"lpush":{"arity":-3,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"lpushx":{"arity":-3,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"lrange":{"arity":4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"lrem":{"arity":4,"flags":["write"],"keyStart":1,"keyStop":1,"step":1},"lset":{"arity":4,"flags":["write","denyoom"],"keyStart":1,"keyStop":1,"step":1},"ltrim":{"arity":4,"flags":["write"],"keyStart":1,"keyStop":1,"step":1},"memory":{"arity":-2,"flags":[],"keyStart":0,"keyStop":0,"step":0},"mget":{"arity":-2,"flags":["readonly","fast"],"keyStart":1,"keyStop":-1,"step":1},"migrate":{"arity":-6,"flags":["write","movablekeys"],"keyStart":3,"keyStop":3,"step":1},"module":{"arity":-2,"flags":[],"keyStart":0,"keyStop":0,"step":0},"monitor":{"arity":1,"flags":["admin","noscript","loading","stale"],"keyStart":0,"keyStop":0,"step":0},"move":{"arity":3,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"mset":{"arity":-3,"flags":["write","denyoom"],"keyStart":1,"keyStop":-1,"step":2},"msetnx":{"arity":-3,"flags":["write","denyoom"],"keyStart":1,"keyStop":-1,"step":2},"multi":{"arity":1,"flags":["noscript","loading","stale","fast","allow_busy"],"keyStart":0,"keyStop":0,"step":0},"object":{"arity":-2,"flags":[],"keyStart":0,"keyStop":0,"step":0},"persist":{"arity":2,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"pexpire":{"arity":-3,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"pexpireat":{"arity":-3,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"pexpiretime":{"arity":2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"pfadd":{"arity":-2,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"pfcount":{"arity":-2,"flags":["readonly"],"keyStart":1,"keyStop":-1,"step":1},"pfdebug":{"arity":3,"flags":["write","denyoom","admin"],"keyStart":2,"keyStop":2,"step":1},"pfmerge":{"arity":-2,"flags":["write","denyoom"],"keyStart":1,"keyStop":-1,"step":1},"pfselftest":{"arity":1,"flags":["admin"],"keyStart":0,"keyStop":0,"step":0},"ping":{"arity":-1,"flags":["fast"],"keyStart":0,"keyStop":0,"step":0},"psetex":{"arity":4,"flags":["write","denyoom"],"keyStart":1,"keyStop":1,"step":1},"psubscribe":{"arity":-2,"flags":["pubsub","noscript","loading","stale"],"keyStart":0,"keyStop":0,"step":0},"psync":{"arity":-3,"flags":["admin","noscript","no_async_loading","no_multi"],"keyStart":0,"keyStop":0,"step":0},"pttl":{"arity":2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"publish":{"arity":3,"flags":["pubsub","loading","stale","fast"],"keyStart":0,"keyStop":0,"step":0},"pubsub":{"arity":-2,"flags":[],"keyStart":0,"keyStop":0,"step":0},"punsubscribe":{"arity":-1,"flags":["pubsub","noscript","loading","stale"],"keyStart":0,"keyStop":0,"step":0},"quit":{"arity":-1,"flags":["noscript","loading","stale","fast","no_auth","allow_busy"],"keyStart":0,"keyStop":0,"step":0},"randomkey":{"arity":1,"flags":["readonly"],"keyStart":0,"keyStop":0,"step":0},"readonly":{"arity":1,"flags":["loading","stale","fast"],"keyStart":0,"keyStop":0,"step":0},"readwrite":{"arity":1,"flags":["loading","stale","fast"],"keyStart":0,"keyStop":0,"step":0},"rename":{"arity":3,"flags":["write"],"keyStart":1,"keyStop":2,"step":1},"renamenx":{"arity":3,"flags":["write","fast"],"keyStart":1,"keyStop":2,"step":1},"replconf":{"arity":-1,"flags":["admin","noscript","loading","stale","allow_busy"],"keyStart":0,"keyStop":0,"step":0},"replicaof":{"arity":3,"flags":["admin","noscript","stale","no_async_loading"],"keyStart":0,"keyStop":0,"step":0},"reset":{"arity":1,"flags":["noscript","loading","stale","fast","no_auth","allow_busy"],"keyStart":0,"keyStop":0,"step":0},"restore":{"arity":-4,"flags":["write","denyoom"],"keyStart":1,"keyStop":1,"step":1},"restore-asking":{"arity":-4,"flags":["write","denyoom","asking"],"keyStart":1,"keyStop":1,"step":1},"role":{"arity":1,"flags":["noscript","loading","stale","fast"],"keyStart":0,"keyStop":0,"step":0},"rpop":{"arity":-2,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"rpoplpush":{"arity":3,"flags":["write","denyoom"],"keyStart":1,"keyStop":2,"step":1},"rpush":{"arity":-3,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"rpushx":{"arity":-3,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"sadd":{"arity":-3,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"save":{"arity":1,"flags":["admin","noscript","no_async_loading","no_multi"],"keyStart":0,"keyStop":0,"step":0},"scan":{"arity":-2,"flags":["readonly"],"keyStart":0,"keyStop":0,"step":0},"scard":{"arity":2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"script":{"arity":-2,"flags":[],"keyStart":0,"keyStop":0,"step":0},"sdiff":{"arity":-2,"flags":["readonly"],"keyStart":1,"keyStop":-1,"step":1},"sdiffstore":{"arity":-3,"flags":["write","denyoom"],"keyStart":1,"keyStop":-1,"step":1},"select":{"arity":2,"flags":["loading","stale","fast"],"keyStart":0,"keyStop":0,"step":0},"set":{"arity":-3,"flags":["write","denyoom"],"keyStart":1,"keyStop":1,"step":1},"setbit":{"arity":4,"flags":["write","denyoom"],"keyStart":1,"keyStop":1,"step":1},"setex":{"arity":4,"flags":["write","denyoom"],"keyStart":1,"keyStop":1,"step":1},"setnx":{"arity":3,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"setrange":{"arity":4,"flags":["write","denyoom"],"keyStart":1,"keyStop":1,"step":1},"shutdown":{"arity":-1,"flags":["admin","noscript","loading","stale","no_multi","allow_busy"],"keyStart":0,"keyStop":0,"step":0},"sinter":{"arity":-2,"flags":["readonly"],"keyStart":1,"keyStop":-1,"step":1},"sintercard":{"arity":-3,"flags":["readonly","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"sinterstore":{"arity":-3,"flags":["write","denyoom"],"keyStart":1,"keyStop":-1,"step":1},"sismember":{"arity":3,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"slaveof":{"arity":3,"flags":["admin","noscript","stale","no_async_loading"],"keyStart":0,"keyStop":0,"step":0},"slowlog":{"arity":-2,"flags":[],"keyStart":0,"keyStop":0,"step":0},"smembers":{"arity":2,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"smismember":{"arity":-3,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"smove":{"arity":4,"flags":["write","fast"],"keyStart":1,"keyStop":2,"step":1},"sort":{"arity":-2,"flags":["write","denyoom","movablekeys"],"keyStart":1,"keyStop":1,"step":1},"sort_ro":{"arity":-2,"flags":["readonly","movablekeys"],"keyStart":1,"keyStop":1,"step":1},"spop":{"arity":-2,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"spublish":{"arity":3,"flags":["pubsub","loading","stale","fast"],"keyStart":1,"keyStop":1,"step":1},"srandmember":{"arity":-2,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"srem":{"arity":-3,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"sscan":{"arity":-3,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"ssubscribe":{"arity":-2,"flags":["pubsub","noscript","loading","stale"],"keyStart":1,"keyStop":-1,"step":1},"strlen":{"arity":2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"subscribe":{"arity":-2,"flags":["pubsub","noscript","loading","stale"],"keyStart":0,"keyStop":0,"step":0},"substr":{"arity":4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"sunion":{"arity":-2,"flags":["readonly"],"keyStart":1,"keyStop":-1,"step":1},"sunionstore":{"arity":-3,"flags":["write","denyoom"],"keyStart":1,"keyStop":-1,"step":1},"sunsubscribe":{"arity":-1,"flags":["pubsub","noscript","loading","stale"],"keyStart":1,"keyStop":-1,"step":1},"swapdb":{"arity":3,"flags":["write","fast"],"keyStart":0,"keyStop":0,"step":0},"sync":{"arity":1,"flags":["admin","noscript","no_async_loading","no_multi"],"keyStart":0,"keyStop":0,"step":0},"time":{"arity":1,"flags":["loading","stale","fast"],"keyStart":0,"keyStop":0,"step":0},"touch":{"arity":-2,"flags":["readonly","fast"],"keyStart":1,"keyStop":-1,"step":1},"ttl":{"arity":2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"type":{"arity":2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"unlink":{"arity":-2,"flags":["write","fast"],"keyStart":1,"keyStop":-1,"step":1},"unsubscribe":{"arity":-1,"flags":["pubsub","noscript","loading","stale"],"keyStart":0,"keyStop":0,"step":0},"unwatch":{"arity":1,"flags":["noscript","loading","stale","fast","allow_busy"],"keyStart":0,"keyStop":0,"step":0},"wait":{"arity":3,"flags":["noscript"],"keyStart":0,"keyStop":0,"step":0},"watch":{"arity":-2,"flags":["noscript","loading","stale","fast","allow_busy"],"keyStart":1,"keyStop":-1,"step":1},"xack":{"arity":-4,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"xadd":{"arity":-5,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"xautoclaim":{"arity":-6,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"xclaim":{"arity":-6,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"xdel":{"arity":-3,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"xdelex":{"arity":-5,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"xgroup":{"arity":-2,"flags":[],"keyStart":0,"keyStop":0,"step":0},"xinfo":{"arity":-2,"flags":[],"keyStart":0,"keyStop":0,"step":0},"xlen":{"arity":2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"xpending":{"arity":-3,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"xrange":{"arity":-4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"xread":{"arity":-4,"flags":["readonly","blocking","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"xreadgroup":{"arity":-7,"flags":["write","blocking","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"xrevrange":{"arity":-4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"xsetid":{"arity":-3,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"xtrim":{"arity":-4,"flags":["write"],"keyStart":1,"keyStop":1,"step":1},"zadd":{"arity":-4,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"zcard":{"arity":2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"zcount":{"arity":4,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"zdiff":{"arity":-3,"flags":["readonly","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"zdiffstore":{"arity":-4,"flags":["write","denyoom","movablekeys"],"keyStart":1,"keyStop":1,"step":1},"zincrby":{"arity":4,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"zinter":{"arity":-3,"flags":["readonly","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"zintercard":{"arity":-3,"flags":["readonly","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"zinterstore":{"arity":-4,"flags":["write","denyoom","movablekeys"],"keyStart":1,"keyStop":1,"step":1},"zlexcount":{"arity":4,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"zmpop":{"arity":-4,"flags":["write","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"zmscore":{"arity":-3,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"zpopmax":{"arity":-2,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"zpopmin":{"arity":-2,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"zrandmember":{"arity":-2,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"zrange":{"arity":-4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"zrangebylex":{"arity":-4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"zrangebyscore":{"arity":-4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"zrangestore":{"arity":-5,"flags":["write","denyoom"],"keyStart":1,"keyStop":2,"step":1},"zrank":{"arity":3,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"zrem":{"arity":-3,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"zremrangebylex":{"arity":4,"flags":["write"],"keyStart":1,"keyStop":1,"step":1},"zremrangebyrank":{"arity":4,"flags":["write"],"keyStart":1,"keyStop":1,"step":1},"zremrangebyscore":{"arity":4,"flags":["write"],"keyStart":1,"keyStop":1,"step":1},"zrevrange":{"arity":-4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"zrevrangebylex":{"arity":-4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"zrevrangebyscore":{"arity":-4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"zrevrank":{"arity":3,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"zscan":{"arity":-3,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"zscore":{"arity":3,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"zunion":{"arity":-3,"flags":["readonly","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"zunionstore":{"arity":-4,"flags":["write","denyoom","movablekeys"],"keyStart":1,"keyStop":1,"step":1}}')},1780:(a,b,c)=>{"use strict";c.d(b,{op:()=>q}),c(68115),c(75142),c(84749),c(21789);var d,e,f=c(29196),g=c(50685);!function(a){a[a.Idle=0]="Idle",a[a.Started=1]="Started",a[a.Terminating=2]="Terminating",a[a.Errored=3]="Errored"}(d||(d={})),c(98783);var h=c(94735),i=c(52958),j=c(37099);c(6752),c(46293),h.EventEmitter;var k=c(42919);c(94371);var l=c(77425),m=c(25246);l.f,l.f;class n extends l.f{getJob(a){return this.Job.fromId(this,a)}commandByType(a,b,c){return a.map(a=>{a="waiting"===a?"wait":a;let d=this.toKey(a);switch(a){case"completed":case"failed":case"delayed":case"prioritized":case"repeat":case"waiting-children":return c(d,b?"zcard":"zrange");case"active":case"wait":case"paused":return c(d,b?"llen":"lrange")}})}sanitizeJobTypes(a){let b="string"==typeof a?[a]:a;if(Array.isArray(b)&&b.length>0){let a=[...b];return -1!==a.indexOf("waiting")&&a.push("paused"),[...new Set(a)]}return["active","completed","delayed","failed","paused","prioritized","waiting","waiting-children"]}async count(){return await this.getJobCountByTypes("waiting","paused","delayed","prioritized","waiting-children")}async getRateLimitTtl(a){return this.scripts.getRateLimitTtl(a)}async getDebounceJobId(a){return(await this.client).get(`${this.keys.de}:${a}`)}async getDeduplicationJobId(a){return(await this.client).get(`${this.keys.de}:${a}`)}async getGlobalConcurrency(){let a=await this.client,b=await a.hget(this.keys.meta,"concurrency");return b?Number(b):null}async getGlobalRateLimit(){let a=await this.client,[b,c]=await a.hmget(this.keys.meta,"max","duration");return b&&c?{max:Number(b),duration:Number(c)}:null}async getJobCountByTypes(...a){return Object.values(await this.getJobCounts(...a)).reduce((a,b)=>a+b,0)}async getJobCounts(...a){let b=this.sanitizeJobTypes(a),c=await this.scripts.getCounts(b),d={};return c.forEach((a,c)=>{d[b[c]]=a||0}),d}getJobState(a){return this.scripts.getState(a)}async getMeta(){let a=await this.client,b=await a.hgetall(this.keys.meta),{concurrency:c,max:d,duration:e,paused:f,"opts.maxLenEvents":g}=b,h=(0,m.Tt)(b,["concurrency","max","duration","paused","opts.maxLenEvents"]);return c&&(h.concurrency=Number(c)),g&&(h.maxLenEvents=Number(g)),d&&(h.max=Number(d)),e&&(h.duration=Number(e)),h.paused="1"===f,h}getCompletedCount(){return this.getJobCountByTypes("completed")}getFailedCount(){return this.getJobCountByTypes("failed")}getDelayedCount(){return this.getJobCountByTypes("delayed")}getActiveCount(){return this.getJobCountByTypes("active")}getPrioritizedCount(){return this.getJobCountByTypes("prioritized")}async getCountsPerPriority(a){let b=[...new Set(a)],c=await this.scripts.getCountsPerPriority(b),d={};return c.forEach((a,c)=>{d[`${b[c]}`]=a||0}),d}getWaitingCount(){return this.getJobCountByTypes("waiting")}getWaitingChildrenCount(){return this.getJobCountByTypes("waiting-children")}getWaiting(a=0,b=-1){return this.getJobs(["waiting"],a,b,!0)}getWaitingChildren(a=0,b=-1){return this.getJobs(["waiting-children"],a,b,!0)}getActive(a=0,b=-1){return this.getJobs(["active"],a,b,!0)}getDelayed(a=0,b=-1){return this.getJobs(["delayed"],a,b,!0)}getPrioritized(a=0,b=-1){return this.getJobs(["prioritized"],a,b,!0)}getCompleted(a=0,b=-1){return this.getJobs(["completed"],a,b,!1)}getFailed(a=0,b=-1){return this.getJobs(["failed"],a,b,!1)}async getDependencies(a,b,c,d){let e=this.toKey("processed"==b?`${a}:processed`:`${a}:dependencies`),{items:f,total:g,jobs:h}=await this.scripts.paginate(e,{start:c,end:d,fetchJobs:!0});return{items:f,jobs:h,total:g}}async getRanges(a,b=0,c=1,d=!1){let e=[];this.commandByType(a,!1,(a,b)=>{switch(b){case"lrange":e.push("lrange");break;case"zrange":e.push("zrange")}});let f=await this.scripts.getRanges(a,b,c,d),g=[];return f.forEach((a,b)=>{let c=a||[];g=d&&"lrange"===e[b]?g.concat(c.reverse()):g.concat(c)}),[...new Set(g)]}async getJobs(a,b=0,c=-1,d=!1){let e=this.sanitizeJobTypes(a);return Promise.all((await this.getRanges(e,b,c,d)).map(a=>this.Job.fromId(this,a)))}async getJobLogs(a,b=0,c=-1,d=!0){let e=(await this.client).multi(),f=this.toKey(a+":logs");d?e.lrange(f,b,c):e.lrange(f,-(c+1),-(b+1)),e.llen(f);let g=await e.exec();return d||g[0][1].reverse(),{logs:g[0][1],count:g[1][1]}}async baseGetClients(a){let b=await this.client;try{if(b.isCluster){let c=b.nodes(),d=[];for(let b=0;b<c.length;b++){let e=c[b],f=await e.client("LIST"),g=this.parseClientList(f,a);d.push(g)}return d.reduce((a,b)=>a.length>b.length?a:b,[])}{let c=await b.client("LIST");return this.parseClientList(c,a)}}catch(a){if(!g.Il.test(a.message))throw a;return[{name:"GCP does not support client list"}]}}getWorkers(){let a=`${this.clientName()}`,b=`${this.clientName()}:w:`;return this.baseGetClients(c=>c&&(c===a||c.startsWith(b)))}async getWorkersCount(){return(await this.getWorkers()).length}async getQueueEvents(){let a=`${this.clientName()}${g.jZ}`;return this.baseGetClients(b=>b===a)}async getMetrics(a,b=0,c=-1){let[d,e,f]=await this.scripts.getMetrics(a,b,c);return{meta:{count:parseInt(d[0]||"0",10),prevTS:parseInt(d[1]||"0",10),prevCount:parseInt(d[2]||"0",10)},data:e.map(a=>+a||0),count:f}}parseClientList(a,b){let c=a.split(/\r?\n/),d=[];return c.forEach(a=>{let c={};a.split(" ").forEach(function(a){let b=a.indexOf("="),d=a.substring(0,b),e=a.substring(b+1);c[d]=e});let e=c.name;b(e)&&(c.name=this.name,c.rawname=e,d.push(c))}),d}async exportPrometheusMetrics(a){let b=await this.getJobCounts(),c=[];c.push("# HELP bullmq_job_count Number of jobs in the queue by state"),c.push("# TYPE bullmq_job_count gauge");let d=a?Object.keys(a).reduce((b,c)=>`${b}, ${c}="${a[c]}"`,""):"";for(let[a,e]of Object.entries(b))c.push(`bullmq_job_count{queue="${this.name}", state="${a}"${d}} ${e}`);return c.join("\n")}}var o=c(21001),p=c(70359);class q extends n{constructor(a,b,c){var d;super(a,Object.assign({},b),c),this.token=(0,i.A)(),this.libName="bullmq",this.jobsOpts=null!=(d=null==b?void 0:b.defaultJobOptions)?d:{},this.waitUntilReady().then(a=>{if(!this.closing&&!(null==b?void 0:b.skipMetasUpdate))return a.hmset(this.keys.meta,this.metaValues)}).catch(a=>{})}emit(a,...b){return super.emit(a,...b)}off(a,b){return super.off(a,b),this}on(a,b){return super.on(a,b),this}once(a,b){return super.once(a,b),this}get defaultJobOptions(){return Object.assign({},this.jobsOpts)}get metaValues(){var a,b,c,d;return{"opts.maxLenEvents":null!=(d=null==(c=null==(b=null==(a=this.opts)?void 0:a.streams)?void 0:b.events)?void 0:c.maxLen)?d:1e4,version:`${this.libName}:${p.r}`}}async getVersion(){let a=await this.client;return await a.hget(this.keys.meta,"version")}get repeat(){return new Promise(async a=>{this._repeat||(this._repeat=new o.k(this.name,Object.assign(Object.assign({},this.opts),{connection:await this.client})),this._repeat.on("error",this.emit.bind(this,"error"))),a(this._repeat)})}get jobScheduler(){return new Promise(async a=>{this._jobScheduler||(this._jobScheduler=new k.l(this.name,Object.assign(Object.assign({},this.opts),{connection:await this.client})),this._jobScheduler.on("error",this.emit.bind(this,"error"))),a(this._jobScheduler)})}async setGlobalConcurrency(a){return(await this.client).hset(this.keys.meta,"concurrency",a)}async setGlobalRateLimit(a,b){return(await this.client).hset(this.keys.meta,"max",a,"duration",b)}async removeGlobalConcurrency(){return(await this.client).hdel(this.keys.meta,"concurrency")}async removeGlobalRateLimit(){return(await this.client).hdel(this.keys.meta,"max","duration")}async add(a,b,c){return this.trace(f.v8.PRODUCER,"add",`${this.name}.${a}`,async(d,e)=>{var g;!e||(null==(g=null==c?void 0:c.telemetry)?void 0:g.omitContext)||(c=Object.assign(Object.assign({},c),{telemetry:{metadata:e}}));let h=await this.addJob(a,b,c);return null==d||d.setAttributes({[f.tC.JobName]:a,[f.tC.JobId]:h.id}),h})}async addJob(a,b,c){if(c&&c.repeat){if(c.repeat.endDate&&+new Date(c.repeat.endDate)<Date.now())throw Error("End date must be greater than current timestamp");return(await this.repeat).updateRepeatableJob(a,b,Object.assign(Object.assign({},this.jobsOpts),c),{override:!0})}{let d=null==c?void 0:c.jobId;if("0"==d||(null==d?void 0:d.startsWith("0:")))throw Error("JobId cannot be '0' or start with 0:");let e=await this.Job.create(this,a,b,Object.assign(Object.assign(Object.assign({},this.jobsOpts),c),{jobId:d}));return this.emit("waiting",e),e}}async addBulk(a){return this.trace(f.v8.PRODUCER,"addBulk",this.name,async(b,c)=>(b&&b.setAttributes({[f.tC.BulkNames]:a.map(a=>a.name),[f.tC.BulkCount]:a.length}),await this.Job.createBulk(this,a.map(a=>{var b,d,e,f,g,h;let i=null==(b=a.opts)?void 0:b.telemetry;if(c){let b=null==(e=null==(d=a.opts)?void 0:d.telemetry)?void 0:e.omitContext,h=(null==(g=null==(f=a.opts)?void 0:f.telemetry)?void 0:g.metadata)||!b&&c;(h||b)&&(i={metadata:h,omitContext:b})}return{name:a.name,data:a.data,opts:Object.assign(Object.assign(Object.assign({},this.jobsOpts),a.opts),{jobId:null==(h=a.opts)?void 0:h.jobId,telemetry:i})}}))))}async upsertJobScheduler(a,b,c){var d,e;if(b.endDate&&+new Date(b.endDate)<Date.now())throw Error("End date must be greater than current timestamp");return(await this.jobScheduler).upsertJobScheduler(a,b,null!=(d=null==c?void 0:c.name)?d:a,null!=(e=null==c?void 0:c.data)?e:{},Object.assign(Object.assign({},this.jobsOpts),null==c?void 0:c.opts),{override:!0})}async pause(){await this.trace(f.v8.INTERNAL,"pause",this.name,async()=>{await this.scripts.pause(!0),this.emit("paused")})}async close(){await this.trace(f.v8.INTERNAL,"close",this.name,async()=>{!this.closing&&this._repeat&&await this._repeat.close(),await super.close()})}async rateLimit(a){await this.trace(f.v8.INTERNAL,"rateLimit",this.name,async b=>{null==b||b.setAttributes({[f.tC.QueueRateLimit]:a}),await this.client.then(b=>b.set(this.keys.limiter,Number.MAX_SAFE_INTEGER,"PX",a))})}async resume(){await this.trace(f.v8.INTERNAL,"resume",this.name,async()=>{await this.scripts.pause(!1),this.emit("resumed")})}async isPaused(){let a=await this.client;return 1===await a.hexists(this.keys.meta,"paused")}isMaxed(){return this.scripts.isMaxed()}async getRepeatableJobs(a,b,c){return(await this.repeat).getRepeatableJobs(a,b,c)}async getJobScheduler(a){return(await this.jobScheduler).getScheduler(a)}async getJobSchedulers(a,b,c){return(await this.jobScheduler).getJobSchedulers(a,b,c)}async getJobSchedulersCount(){return(await this.jobScheduler).getSchedulersCount()}async removeRepeatable(a,b,c){return this.trace(f.v8.INTERNAL,"removeRepeatable",`${this.name}.${a}`,async d=>{null==d||d.setAttributes({[f.tC.JobName]:a,[f.tC.JobId]:c});let e=await this.repeat;return!await e.removeRepeatable(a,b,c)})}async removeJobScheduler(a){let b=await this.jobScheduler;return!await b.removeJobScheduler(a)}async removeDebounceKey(a){return this.trace(f.v8.INTERNAL,"removeDebounceKey",`${this.name}`,async b=>{null==b||b.setAttributes({[f.tC.JobKey]:a});let c=await this.client;return await c.del(`${this.keys.de}:${a}`)})}async removeDeduplicationKey(a){return this.trace(f.v8.INTERNAL,"removeDeduplicationKey",`${this.name}`,async b=>(null==b||b.setAttributes({[f.tC.DeduplicationKey]:a}),(await this.client).del(`${this.keys.de}:${a}`)))}async removeRateLimitKey(){return(await this.client).del(this.keys.limiter)}async removeRepeatableByKey(a){return this.trace(f.v8.INTERNAL,"removeRepeatableByKey",`${this.name}`,async b=>{null==b||b.setAttributes({[f.tC.JobKey]:a});let c=await this.repeat;return!await c.removeRepeatableByKey(a)})}async remove(a,{removeChildren:b=!0}={}){return this.trace(f.v8.INTERNAL,"remove",this.name,async c=>{null==c||c.setAttributes({[f.tC.JobId]:a,[f.tC.JobOptions]:JSON.stringify({removeChildren:b})});let d=await this.scripts.remove(a,b);return 1===d&&this.emit("removed",a),d})}async updateJobProgress(a,b){await this.trace(f.v8.INTERNAL,"updateJobProgress",this.name,async c=>{null==c||c.setAttributes({[f.tC.JobId]:a,[f.tC.JobProgress]:JSON.stringify(b)}),await this.scripts.updateProgress(a,b),this.emit("progress",a,b)})}async addJobLog(a,b,c){return j._.addJobLog(this,a,b,c)}async drain(a=!1){await this.trace(f.v8.INTERNAL,"drain",this.name,async b=>{null==b||b.setAttributes({[f.tC.QueueDrainDelay]:a}),await this.scripts.drain(a)})}async clean(a,b,c="completed"){return this.trace(f.v8.INTERNAL,"clean",this.name,async d=>{let e=b||1/0,g=Math.min(1e4,e),h=Date.now()-a,i=0,j=[],k="waiting"===c?"wait":c;for(;i<e;){let a=await this.scripts.cleanJobsInSet(k,h,g);if(this.emit("cleaned",a,k),i+=a.length,j.push(...a),a.length<g)break}return null==d||d.setAttributes({[f.tC.QueueGrace]:a,[f.tC.JobType]:c,[f.tC.QueueCleanLimit]:e,[f.tC.JobIds]:j}),j})}async obliterate(a){await this.trace(f.v8.INTERNAL,"obliterate",this.name,async()=>{await this.pause();let b=0;do b=await this.scripts.obliterate(Object.assign({force:!1,count:1e3},a));while(b)})}async retryJobs(a={}){await this.trace(f.v8.PRODUCER,"retryJobs",this.name,async b=>{null==b||b.setAttributes({[f.tC.QueueOptions]:JSON.stringify(a)});let c=0;do c=await this.scripts.retryJobs(a.state,a.count,a.timestamp);while(c)})}async promoteJobs(a={}){await this.trace(f.v8.INTERNAL,"promoteJobs",this.name,async b=>{null==b||b.setAttributes({[f.tC.QueueOptions]:JSON.stringify(a)});let c=0;do c=await this.scripts.promoteJobs(a.count);while(c)})}async trimEvents(a){return this.trace(f.v8.INTERNAL,"trimEvents",this.name,async b=>{null==b||b.setAttributes({[f.tC.QueueEventMaxLength]:a});let c=await this.client;return await c.xtrim(this.keys.events,"MAXLEN","~",a)})}async removeDeprecatedPriorityKey(){return(await this.client).del(this.toKey("priority"))}async removeOrphanedJobs(a=1e3,b=0){let c=await this.client,d=new Set(Object.keys(this.keys)),e=Object.keys(this.keys).filter(a=>""!==a),f=["logs","dependencies","processed","failed","unsuccessful","lock"],g=this.qualifiedName+":",h=g+"*",i=0,j="0";do{let[k,l]=await c.scan(j,"MATCH",h,"COUNT",a);j=k;let m=new Set;for(let a of l){let b=a.slice(g.length);if(d.has(b))continue;let c=b.indexOf(":");if(-1!==c){let a=b.slice(0,c);if(d.has(a))continue}let e=-1===c?b:b.slice(0,c);if(-1!==c){let a=b.slice(c+1);if(!f.includes(a))continue}m.add(e)}if(0===m.size)continue;if(i+=await this.scripts.removeOrphanedJobs([...m],e,f)||0,b>0&&i>=b)break}while("0"!==j);return i}}c(55635),c(80308),c(8138),function(a){a.blocking="blocking",a.normal="normal"}(e||(e={})),c(11024)},3180:(a,b,c)=>{"use strict";let d=c(81200),e=c(62404),f=c(10185),g=c(90710),h=c(27482),i=c(64011);a.exports=(a,b,c,j)=>{switch(b){case"===":return"object"==typeof a&&(a=a.version),"object"==typeof c&&(c=c.version),a===c;case"!==":return"object"==typeof a&&(a=a.version),"object"==typeof c&&(c=c.version),a!==c;case"":case"=":case"==":return d(a,c,j);case"!=":return e(a,c,j);case">":return f(a,c,j);case">=":return g(a,c,j);case"<":return h(a,c,j);case"<=":return i(a,c,j);default:throw TypeError(`Invalid operator: ${b}`)}}},3192:(a,b,c)=>{"use strict";Object.defineProperty(b,"__esModule",{value:!0});let d=(0,c(95422).Debug)("AbstractConnector");class e{constructor(a){this.connecting=!1,this.disconnectTimeout=a}check(a){return!0}disconnect(){if(this.connecting=!1,this.stream){let a=this.stream,b=setTimeout(()=>{d("stream %s:%s still open, destroying it",a.remoteAddress,a.remotePort),a.destroy()},this.disconnectTimeout);a.on("close",()=>clearTimeout(b)),a.end()}}}b.default=e},3504:(a,b,c)=>{"use strict";Object.defineProperty(b,"__esModule",{value:!0}),b.addTransactionSupport=void 0;let d=c(95422),e=c(95572),f=c(59408);b.addTransactionSupport=function(a){a.pipeline=function(a){let b=new f.default(this);return Array.isArray(a)&&b.addBatch(a),b};let{multi:b}=a;a.multi=function(a,c){if(void 0!==c||Array.isArray(a)||(c=a,a=null),c&&!1===c.pipeline)return b.call(this);let g=new f.default(this);g.multi(),Array.isArray(a)&&g.addBatch(a);let h=g.exec;g.exec=function(a){if(this.isCluster&&!this.redis.slots.length)return"wait"===this.redis.status&&this.redis.connect().catch(d.noop),(0,e.default)(new Promise((a,b)=>{this.redis.delayUntilReady(c=>{if(c)return void b(c);this.exec(g).then(a,b)})}),a);if(this._transactions>0&&h.call(g),this.nodeifiedPromise)return h.call(g);let b=h.call(g);return(0,e.default)(b.then(function(a){let b=a[a.length-1];if(void 0===b)throw Error("Pipeline cannot be used to send any commands when the `exec()` has been called on it.");if(b[0]){b[0].previousErrors=[];for(let c=0;c<a.length-1;++c)a[c][0]&&b[0].previousErrors.push(a[c][0]);throw b[0]}return(0,d.wrapMultiResult)(b[1])}),a)};let{execBuffer:i}=g;return g.execBuffer=function(a){return this._transactions>0&&i.call(g),g.exec(a)},g};let{exec:c}=a;a.exec=function(a){return(0,e.default)(c.call(this).then(function(a){return Array.isArray(a)&&(a=(0,d.wrapMultiResult)(a)),a}),a)}}},5591:(a,b,c)=>{"use strict";Object.defineProperty(b,"__esModule",{value:!0});let d=c(91645),e=c(34631),f=c(95422),g=c(3192);class h extends g.default{constructor(a){super(a.disconnectTimeout),this.options=a}connect(a){let b,{options:c}=this;return this.connecting=!0,"path"in c&&c.path?b={path:c.path}:(b={},"port"in c&&null!=c.port&&(b.port=c.port),"host"in c&&null!=c.host&&(b.host=c.host),"family"in c&&null!=c.family&&(b.family=c.family)),c.tls&&Object.assign(b,c.tls),new Promise((a,g)=>{process.nextTick(()=>{if(!this.connecting)return void g(Error(f.CONNECTION_CLOSED_ERROR_MSG));try{c.tls?this.stream=(0,e.connect)(b):this.stream=(0,d.createConnection)(b)}catch(a){g(a);return}this.stream.once("error",a=>{this.firstError=a}),a(this.stream)})})}}b.default=h},6752:(a,b,c)=>{"use strict";c.d(b,{E:()=>d});class d{constructor(a="bull"){this.prefix=a}getKeys(a){let b={};return["","active","wait","waiting-children","paused","id","delayed","prioritized","stalled-check","completed","failed","stalled","repeat","limiter","meta","events","pc","marker","de"].forEach(c=>{b[c]=this.toKey(a,c)}),b}toKey(a,b){return`${this.getQueueQualifiedName(a)}:${b}`}getQueueQualifiedName(a){return`${this.prefix}:${a}`}}},7824:(a,b,c)=>{"use strict";let d=c(70405),e=c(72988),f=c(10185);a.exports=(a,b)=>{a=new e(a,b);let c=new d("0.0.0");if(a.test(c)||(c=new d("0.0.0-0"),a.test(c)))return c;c=null;for(let b=0;b<a.set.length;++b){let e=a.set[b],g=null;e.forEach(a=>{let b=new d(a.semver.version);switch(a.operator){case">":0===b.prerelease.length?b.patch++:b.prerelease.push(0),b.raw=b.format();case"":case">=":(!g||f(b,g))&&(g=b);break;case"<":case"<=":break;default:throw Error(`Unexpected operation: ${a.operator}`)}}),g&&(!c||f(c,g))&&(c=g)}return c&&a.test(c)?c:null}},8138:(a,b,c)=>{"use strict";c(29021),c(79551),c(33873),c(52958),c(21789),c(50685);var d=c(77425);c(21001),c(84749),c(46293),c(55635);c(98783),c(29196),c(42919),c(94371),a=c.hmd(a),d.f},9261:(a,b,c)=>{"use strict";let d=c(72988);a.exports=(a,b,c)=>{try{b=new d(b,c)}catch(a){return!1}return b.test(a)}},10185:(a,b,c)=>{"use strict";let d=c(35463);a.exports=(a,b,c)=>d(a,b,c)>0},10511:(a,b,c)=>{"use strict";let d=c(35463);a.exports=(a,b,c)=>d(b,a,c)},11024:(a,b,c)=>{"use strict";c.d(b,{N:()=>e});var d=c(80308);let e=a=>new d.T({keys:a.keys,client:a.client,get redisVersion(){return a.redisVersion},toKey:a.toKey,opts:a.opts,closing:a.closing,databaseType:a.databaseType})},11890:(a,b,c)=>{"use strict";let d=c(9261),e=c(35463);a.exports=(a,b,c)=>{let f=[],g=null,h=null,i=a.sort((a,b)=>e(a,b,c));for(let a of i)d(a,b,c)?(h=a,g||(g=a)):(h&&f.push([g,h]),h=null,g=null);g&&f.push([g,null]);let j=[];for(let[a,b]of f)a===b?j.push(a):b||a!==i[0]?b?a===i[0]?j.push(`<=${b}`):j.push(`${a} - ${b}`):j.push(`>=${a}`):j.push("*");let k=j.join(" || "),l="string"==typeof b.raw?b.raw:String(b);return k.length<l.length?k:b}},12190:(a,b,c)=>{"use strict";let d=c(35567);a.exports=(a,b)=>{let c=d(a,b);return c?c.version:null}},13110:(a,b,c)=>{"use strict";Object.defineProperty(b,"__esModule",{value:!0});let d=c(95422),e=c(28749),f=c(84968),g=c(75154),h=(0,d.Debug)("cluster:subscriberGroup");class i{constructor(a){this.subscriberGroupEmitter=a,this.shardedSubscribers=new Map,this.clusterSlots=[],this.subscriberToSlotsIndex=new Map,this.channels=new Map,this.failedAttemptsByNode=new Map,this.isResetting=!1,this.pendingReset=null,this.handleSubscriberConnectFailed=(a,b)=>{let c=(this.failedAttemptsByNode.get(b)||0)+1;this.failedAttemptsByNode.set(b,c);let d=Math.min(c,i.MAX_RETRY_ATTEMPTS),e=Math.min(i.BASE_BACKOFF_MS*2**d,i.MAX_BACKOFF_MS),f=Math.floor(.5*e*(Math.random()-.5)),g=Math.max(0,e+f);h("Failed to connect subscriber for %s. Refreshing slots in %dms",b,g),this.subscriberGroupEmitter.emit("subscriberConnectFailed",{delay:g,error:a})},this.handleSubscriberConnectSucceeded=a=>{this.failedAttemptsByNode.delete(a)}}getResponsibleSubscriber(a){let b=this.clusterSlots[a][0];return this.shardedSubscribers.get(b)}addChannels(a){let b=f(a[0]);for(let c of a)if(f(c)!==b)return -1;let c=this.channels.get(b);return c?this.channels.set(b,c.concat(a)):this.channels.set(b,a),Array.from(this.channels.values()).reduce((a,b)=>a+b.length,0)}removeChannels(a){let b=f(a[0]);for(let c of a)if(f(c)!==b)return -1;let c=this.channels.get(b);if(c){let d=c.filter(b=>!a.includes(b));this.channels.set(b,d)}return Array.from(this.channels.values()).reduce((a,b)=>a+b.length,0)}stop(){for(let a of this.shardedSubscribers.values())a.stop();this.pendingReset=null,this.shardedSubscribers.clear(),this.subscriberToSlotsIndex.clear()}start(){let a=[];for(let b of this.shardedSubscribers.values())b.isStarted()||a.push(b.start().then(()=>{this.handleSubscriberConnectSucceeded(b.getNodeKey())}).catch(a=>{this.handleSubscriberConnectFailed(a,b.getNodeKey())}));return Promise.all(a)}async reset(a,b){if(this.isResetting){this.pendingReset={slots:a,nodes:b};return}this.isResetting=!0;try{let c=this._refreshSlots(a),d=this.hasUnhealthySubscribers();if(!c&&!d)return void h("No topology change detected or failed subscribers. Skipping reset.");for(let[a,b]of this.shardedSubscribers){if(this.subscriberToSlotsIndex.has(a)&&b.isStarted()){h("Skipping deleting subscriber for %s",a);continue}h("Removing subscriber for %s",a),b.stop(),this.shardedSubscribers.delete(a),this.subscriberGroupEmitter.emit("-subscriber")}let f=[];for(let[a,c]of this.subscriberToSlotsIndex){if(this.shardedSubscribers.has(a)){h("Skipping creating new subscriber for %s",a);continue}h("Creating new subscriber for %s",a);let c=b.find(b=>(0,e.getNodeKey)(b.options)===a);if(!c){h("Failed to find node for key %s",a);continue}let d=new g.default(this.subscriberGroupEmitter,c.options);this.shardedSubscribers.set(a,d),f.push(d.start().then(()=>{this.handleSubscriberConnectSucceeded(a)}).catch(b=>{this.handleSubscriberConnectFailed(b,a)})),this.subscriberGroupEmitter.emit("+subscriber")}await Promise.all(f),this._resubscribe(),this.subscriberGroupEmitter.emit("subscribersReady")}finally{if(this.isResetting=!1,this.pendingReset){let{slots:a,nodes:b}=this.pendingReset;this.pendingReset=null,await this.reset(a,b)}}}_refreshSlots(a){if(this._slotsAreEqual(a))return h("Nothing to refresh because the new cluster map is equal to the previous one."),!1;h("Refreshing the slots of the subscriber group."),this.subscriberToSlotsIndex=new Map;for(let b=0;b<a.length;b++){let c=a[b][0];this.subscriberToSlotsIndex.has(c)||this.subscriberToSlotsIndex.set(c,[]),this.subscriberToSlotsIndex.get(c).push(Number(b))}return this.clusterSlots=JSON.parse(JSON.stringify(a)),!0}_resubscribe(){this.shardedSubscribers&&this.shardedSubscribers.forEach((a,b)=>{let c=this.subscriberToSlotsIndex.get(b);c&&c.forEach(c=>{let d=a.getInstance(),e=this.channels.get(c);if(e&&e.length>0){if("end"===d.status)return;"ready"===d.status?d.ssubscribe(...e).catch(a=>{h("Failed to ssubscribe on node %s: %s",b,a)}):d.once("ready",()=>{d.ssubscribe(...e).catch(a=>{h("Failed to ssubscribe on node %s: %s",b,a)})})}})})}_slotsAreEqual(a){return void 0!==this.clusterSlots&&JSON.stringify(this.clusterSlots)===JSON.stringify(a)}hasUnhealthySubscribers(){let a=Array.from(this.shardedSubscribers.values()).some(a=>!a.isStarted()),b=Array.from(this.subscriberToSlotsIndex.keys()).some(a=>!this.shardedSubscribers.has(a));return a||b}}b.default=i,i.MAX_RETRY_ATTEMPTS=10,i.MAX_BACKOFF_MS=2e3,i.BASE_BACKOFF_MS=100},13714:a=>{"use strict";let b=Object.freeze({loose:!0}),c=Object.freeze({});a.exports=a=>a?"object"!=typeof a?b:a:c},15955:(a,b,c)=>{"use strict";var d=c(65380);function e(a,b){var c={zone:b};if(a?a instanceof e?this._date=a._date:a instanceof Date?this._date=d.DateTime.fromJSDate(a,c):"number"==typeof a?this._date=d.DateTime.fromMillis(a,c):"string"==typeof a&&(this._date=d.DateTime.fromISO(a,c),this._date.isValid||(this._date=d.DateTime.fromRFC2822(a,c)),this._date.isValid||(this._date=d.DateTime.fromSQL(a,c)),this._date.isValid||(this._date=d.DateTime.fromFormat(a,"EEE, d MMM yyyy HH:mm:ss",c))):this._date=d.DateTime.local(),!this._date||!this._date.isValid)throw Error("CronDate: unhandled timestamp: "+JSON.stringify(a));b&&b!==this._date.zoneName&&(this._date=this._date.setZone(b))}e.prototype.addYear=function(){this._date=this._date.plus({years:1})},e.prototype.addMonth=function(){this._date=this._date.plus({months:1}).startOf("month")},e.prototype.addDay=function(){this._date=this._date.plus({days:1}).startOf("day")},e.prototype.addHour=function(){var a=this._date;this._date=this._date.plus({hours:1}).startOf("hour"),this._date<=a&&(this._date=this._date.plus({hours:1}))},e.prototype.addMinute=function(){var a=this._date;this._date=this._date.plus({minutes:1}).startOf("minute"),this._date<a&&(this._date=this._date.plus({hours:1}))},e.prototype.addSecond=function(){var a=this._date;this._date=this._date.plus({seconds:1}).startOf("second"),this._date<a&&(this._date=this._date.plus({hours:1}))},e.prototype.subtractYear=function(){this._date=this._date.minus({years:1})},e.prototype.subtractMonth=function(){this._date=this._date.minus({months:1}).endOf("month").startOf("second")},e.prototype.subtractDay=function(){this._date=this._date.minus({days:1}).endOf("day").startOf("second")},e.prototype.subtractHour=function(){var a=this._date;this._date=this._date.minus({hours:1}).endOf("hour").startOf("second"),this._date>=a&&(this._date=this._date.minus({hours:1}))},e.prototype.subtractMinute=function(){var a=this._date;this._date=this._date.minus({minutes:1}).endOf("minute").startOf("second"),this._date>a&&(this._date=this._date.minus({hours:1}))},e.prototype.subtractSecond=function(){var a=this._date;this._date=this._date.minus({seconds:1}).startOf("second"),this._date>a&&(this._date=this._date.minus({hours:1}))},e.prototype.getDate=function(){return this._date.day},e.prototype.getFullYear=function(){return this._date.year},e.prototype.getDay=function(){var a=this._date.weekday;return 7==a?0:a},e.prototype.getMonth=function(){return this._date.month-1},e.prototype.getHours=function(){return this._date.hour},e.prototype.getMinutes=function(){return this._date.minute},e.prototype.getSeconds=function(){return this._date.second},e.prototype.getMilliseconds=function(){return this._date.millisecond},e.prototype.getTime=function(){return this._date.valueOf()},e.prototype.getUTCDate=function(){return this._getUTC().day},e.prototype.getUTCFullYear=function(){return this._getUTC().year},e.prototype.getUTCDay=function(){var a=this._getUTC().weekday;return 7==a?0:a},e.prototype.getUTCMonth=function(){return this._getUTC().month-1},e.prototype.getUTCHours=function(){return this._getUTC().hour},e.prototype.getUTCMinutes=function(){return this._getUTC().minute},e.prototype.getUTCSeconds=function(){return this._getUTC().second},e.prototype.toISOString=function(){return this._date.toUTC().toISO()},e.prototype.toJSON=function(){return this._date.toJSON()},e.prototype.setDate=function(a){this._date=this._date.set({day:a})},e.prototype.setFullYear=function(a){this._date=this._date.set({year:a})},e.prototype.setDay=function(a){this._date=this._date.set({weekday:a})},e.prototype.setMonth=function(a){this._date=this._date.set({month:a+1})},e.prototype.setHours=function(a){this._date=this._date.set({hour:a})},e.prototype.setMinutes=function(a){this._date=this._date.set({minute:a})},e.prototype.setSeconds=function(a){this._date=this._date.set({second:a})},e.prototype.setMilliseconds=function(a){this._date=this._date.set({millisecond:a})},e.prototype._getUTC=function(){return this._date.toUTC()},e.prototype.toString=function(){return this.toDate().toString()},e.prototype.toDate=function(){return this._date.toJSDate()},e.prototype.isLastDayOfMonth=function(){var a=this._date.plus({days:1}).startOf("day");return this._date.month!==a.month},e.prototype.isLastWeekdayOfMonth=function(){var a=this._date.plus({days:7}).startOf("day");return this._date.month!==a.month},a.exports=e},17507:(a,b,c)=>{"use strict";a.exports=55>process.version.charCodeAt(1)&&46===process.version.charCodeAt(2)?c(93126):c(76336)},19941:(a,b)=>{"use strict";let c;function d(a,d){try{let a=c;return c=null,a.apply(this,arguments)}catch(a){return b.errorObj.e=a,b.errorObj}}Object.defineProperty(b,"__esModule",{value:!0}),b.tryCatch=b.errorObj=void 0,b.errorObj={e:{}},b.tryCatch=function(a){return c=a,d}},20254:(a,b,c)=>{"use strict";let d=c(70405);a.exports=(a,b,c)=>{let e=new d(a,c),f=new d(b,c);return e.compare(f)||e.compareBuild(f)}},21001:(a,b,c)=>{"use strict";c.d(b,{k:()=>h});var d=c(25246),e=c(94296),f=c(55511),g=c(77425);class h extends g.f{constructor(a,b,c){super(a,b,c),this.repeatStrategy=b.settings&&b.settings.repeatStrategy||j,this.repeatKeyHashAlgorithm=b.settings&&b.settings.repeatKeyHashAlgorithm||"md5"}async updateRepeatableJob(a,b,c,{override:e}){var f;let g=Object.assign({},c.repeat);null!=g.pattern||(g.pattern=g.cron),delete g.cron;let h=g.count?g.count+1:1;if(void 0!==g.limit&&h>g.limit)return;let j=Date.now(),{endDate:k}=g;if(k&&j>new Date(k).getTime())return;let l=c.prevMillis||0;j=l<j?j:l;let m=await this.repeatStrategy(j,g,a),{every:n,pattern:o}=g,p=!!((n||o)&&g.immediately),q=p&&n?j-m:void 0;if(m){let j;!l&&c.jobId&&(g.jobId=c.jobId);let r=i(a,g),s=null!=(f=c.repeat.key)?f:this.hash(r);if(e)j=await this.scripts.addRepeatableJob(s,m,{name:a,endDate:k?new Date(k).getTime():void 0,tz:g.tz,pattern:o,every:n},r);else{let a=await this.client;j=await this.scripts.updateRepeatableJobMillis(a,s,m,r)}let{immediately:t}=g,u=(0,d.Tt)(g,["immediately"]);return this.createNextJob(a,m,j,Object.assign(Object.assign({},c),{repeat:Object.assign({offset:q},u)}),b,h,p)}}async createNextJob(a,b,c,d,e,f,g){let h=this.getRepeatJobKey(a,b,c,e),i=Date.now(),j=b+(d.repeat.offset?d.repeat.offset:0)-i,k=Object.assign(Object.assign({},d),{jobId:h,delay:j<0||g?0:j,timestamp:i,prevMillis:b,repeatJobKey:c});return k.repeat=Object.assign(Object.assign({},d.repeat),{count:f}),this.Job.create(this,a,e,k)}getRepeatJobKey(a,b,c,d){return c.split(":").length>2?this.getRepeatJobId({name:a,nextMillis:b,namespace:this.hash(c),jobId:null==d?void 0:d.id}):this.getRepeatDelayedJobId({customKey:c,nextMillis:b})}async removeRepeatable(a,b,c){var d;let e=i(a,Object.assign(Object.assign({},b),{jobId:c})),f=null!=(d=b.key)?d:this.hash(e),g=this.getRepeatJobId({name:a,nextMillis:"",namespace:this.hash(e),jobId:null!=c?c:b.jobId,key:b.key});return this.scripts.removeRepeatable(g,e,f)}async removeRepeatableByKey(a){let b=this.keyToData(a),c=this.getRepeatJobId({name:b.name,nextMillis:"",namespace:this.hash(a),jobId:b.id});return this.scripts.removeRepeatable(c,"",a)}async getRepeatableData(a,b,c){let d=await a.hgetall(this.toKey("repeat:"+b));return d?{key:b,name:d.name,endDate:parseInt(d.endDate)||null,tz:d.tz||null,pattern:d.pattern||null,every:d.every||null,next:c}:this.keyToData(b,c)}keyToData(a,b){let c=a.split(":"),d=c.slice(4).join(":")||null;return{key:a,name:c[0],id:c[1]||null,endDate:parseInt(c[2])||null,tz:c[3]||null,pattern:d,next:b}}async getRepeatableJobs(a=0,b=-1,c=!1){let d=await this.client,e=this.keys.repeat,f=c?await d.zrange(e,a,b,"WITHSCORES"):await d.zrevrange(e,a,b,"WITHSCORES"),g=[];for(let a=0;a<f.length;a+=2)g.push(this.getRepeatableData(d,f[a],parseInt(f[a+1])));return Promise.all(g)}async getRepeatableCount(){return(await this.client).zcard(this.toKey("repeat"))}hash(a){return(0,f.createHash)(this.repeatKeyHashAlgorithm).update(a).digest("hex")}getRepeatDelayedJobId({nextMillis:a,customKey:b}){return`repeat:${b}:${a}`}getRepeatJobId({name:a,nextMillis:b,namespace:c,jobId:d,key:e}){let f=null!=e?e:this.hash(`${a}${d||""}${c}`);return`repeat:${f}:${b}`}}function i(a,b){let c=b.endDate?new Date(b.endDate).getTime():"",d=b.tz||"",e=b.pattern||String(b.every)||"",f=b.jobId?b.jobId:"";return`${a}:${f}:${c}:${d}:${e}`}let j=(a,b)=>{let c=b.pattern;if(c&&b.every)throw Error("Both .pattern and .every options are defined for this repeatable job");if(b.every)return Math.floor(a/b.every)*b.every+(b.immediately?0:b.every);let d=new Date(b.startDate&&new Date(b.startDate)>new Date(a)?b.startDate:a),f=(0,e.parseExpression)(c,Object.assign(Object.assign({},b),{currentDate:d}));try{if(b.immediately)return new Date().getTime();return f.next().getTime()}catch(a){}}},21789:(a,b,c)=>{let{EventEmitter:d}=c(94735);class AbortSignal{constructor(){this.eventEmitter=new d,this.onabort=null,this.aborted=!1,this.reason=void 0}toString(){return"[object AbortSignal]"}get[Symbol.toStringTag](){return"AbortSignal"}removeEventListener(a,b){this.eventEmitter.removeListener(a,b)}addEventListener(a,b){this.eventEmitter.on(a,b)}dispatchEvent(a){let b={type:a,target:this},c=`on${a}`;"function"==typeof this[c]&&this[c](b),this.eventEmitter.emit(a,b)}throwIfAborted(){if(this.aborted)throw this.reason}static abort(a){let b=new e;return b.abort(),b.signal}static timeout(a){let b=new e;return setTimeout(()=>b.abort(Error("TimeoutError")),a),b.signal}}class e{constructor(){this.signal=new AbortSignal}abort(a){this.signal.aborted||(this.signal.aborted=!0,a?this.signal.reason=a:this.signal.reason=Error("AbortError"),this.signal.dispatchEvent("abort"))}toString(){return"[object AbortController]"}get[Symbol.toStringTag](){return"AbortController"}}a.exports={AbortController:e,AbortSignal}},22013:(a,b,c)=>{"use strict";Object.defineProperty(b,"__esModule",{value:!0});let d=c(75761),e=c(84968),f=c(95572),g=c(95422),h=c(27463);class i{constructor(a,b=[],c={},d){if(this.name=a,this.inTransaction=!1,this.isResolved=!1,this.transformed=!1,this.replyEncoding=c.replyEncoding,this.errorStack=c.errorStack,this.args=b.flat(),this.callback=d,this.initPromise(),c.keyPrefix){let a=c.keyPrefix instanceof Buffer,b=a?c.keyPrefix:null;this._iterateKeys(d=>d instanceof Buffer?(null===b&&(b=Buffer.from(c.keyPrefix)),Buffer.concat([b,d])):a?Buffer.concat([c.keyPrefix,Buffer.from(String(d))]):c.keyPrefix+d)}c.readOnly&&(this.isReadOnly=!0)}static checkFlag(a,b){return b=b.toLowerCase(),!!this.getFlagMap()[a][b]}static setArgumentTransformer(a,b){this._transformer.argument[a]=b}static setReplyTransformer(a,b){this._transformer.reply[a]=b}static getFlagMap(){return this.flagMap||(this.flagMap=Object.keys(i.FLAGS).reduce((a,b)=>(a[b]={},i.FLAGS[b].forEach(c=>{a[b][c]=!0}),a),{})),this.flagMap}getSlot(){if(void 0===this.slot){let a=this.getKeys()[0];this.slot=null==a?null:e(a)}return this.slot}getKeys(){return this._iterateKeys()}toWritable(a){let b,c="*"+(this.args.length+1)+"\r\n$"+Buffer.byteLength(this.name)+"\r\n"+this.name+"\r\n";if(this.bufferMode){let a=new l;a.push(c);for(let b=0;b<this.args.length;++b){let c=this.args[b];c instanceof Buffer?0===c.length?a.push("$0\r\n\r\n"):(a.push("$"+c.length+"\r\n"),a.push(c),a.push("\r\n")):a.push("$"+Buffer.byteLength(c)+"\r\n"+c+"\r\n")}b=a.toBuffer()}else{b=c;for(let a=0;a<this.args.length;++a){let c=this.args[a];b+="$"+Buffer.byteLength(c)+"\r\n"+c+"\r\n"}}return b}stringifyArguments(){for(let a=0;a<this.args.length;++a){let b=this.args[a];"string"==typeof b||(b instanceof Buffer?this.bufferMode=!0:this.args[a]=(0,g.toArg)(b))}}transformReply(a){this.replyEncoding&&(a=(0,g.convertBufferToString)(a,this.replyEncoding));let b=i._transformer.reply[this.name];return b&&(a=b(a)),a}setTimeout(a){this._commandTimeoutTimer||(this._commandTimeoutTimer=setTimeout(()=>{this.isResolved||this.reject(Error("Command timed out"))},a))}setBlockingTimeout(a){if(a<=0)return;this._blockingTimeoutTimer&&(clearTimeout(this._blockingTimeoutTimer),this._blockingTimeoutTimer=void 0);let b=Date.now();void 0===this._blockingDeadline&&(this._blockingDeadline=b+a);let c=this._blockingDeadline-b;if(c<=0)return void this.resolve(null);this._blockingTimeoutTimer=setTimeout(()=>{if(this.isResolved){this._blockingTimeoutTimer=void 0;return}this._blockingTimeoutTimer=void 0,this.resolve(null)},c)}extractBlockingTimeout(){let a=this.args;if(!a||0===a.length)return;let b=this.name.toLowerCase();return i.checkFlag("LAST_ARG_TIMEOUT_COMMANDS",b)?(0,h.parseSecondsArgument)(a[a.length-1]):i.checkFlag("FIRST_ARG_TIMEOUT_COMMANDS",b)?(0,h.parseSecondsArgument)(a[0]):i.checkFlag("BLOCK_OPTION_COMMANDS",b)?(0,h.parseBlockOption)(a):void 0}_clearTimers(){let a=this._commandTimeoutTimer;a&&(clearTimeout(a),delete this._commandTimeoutTimer);let b=this._blockingTimeoutTimer;b&&(clearTimeout(b),delete this._blockingTimeoutTimer)}initPromise(){let a=new Promise((a,b)=>{if(!this.transformed){this.transformed=!0;let a=i._transformer.argument[this.name];a&&(this.args=a(this.args)),this.stringifyArguments()}this.resolve=this._convertValue(a),this.reject=a=>{this._clearTimers(),this.errorStack?b((0,g.optimizeErrorStack)(a,this.errorStack.stack,__dirname)):b(a)}});this.promise=(0,f.default)(a,this.callback)}_iterateKeys(a=a=>a){if(void 0===this.keys&&(this.keys=[],(0,d.exists)(this.name,{caseInsensitive:!0})))for(let b of(0,d.getKeyIndexes)(this.name,this.args,{nameCaseInsensitive:!0}))this.args[b]=a(this.args[b]),this.keys.push(this.args[b]);return this.keys}_convertValue(a){return b=>{try{this._clearTimers(),a(this.transformReply(b)),this.isResolved=!0}catch(a){this.reject(a)}return this.promise}}}b.default=i,i.FLAGS={VALID_IN_SUBSCRIBER_MODE:["subscribe","psubscribe","unsubscribe","punsubscribe","ssubscribe","sunsubscribe","ping","quit"],VALID_IN_MONITOR_MODE:["monitor","auth"],ENTER_SUBSCRIBER_MODE:["subscribe","psubscribe","ssubscribe"],EXIT_SUBSCRIBER_MODE:["unsubscribe","punsubscribe","sunsubscribe"],WILL_DISCONNECT:["quit"],HANDSHAKE_COMMANDS:["auth","select","client","readonly","info"],IGNORE_RECONNECT_ON_ERROR:["client"],BLOCKING_COMMANDS:["blpop","brpop","brpoplpush","blmove","bzpopmin","bzpopmax","bzmpop","blmpop","xread","xreadgroup"],LAST_ARG_TIMEOUT_COMMANDS:["blpop","brpop","brpoplpush","blmove","bzpopmin","bzpopmax"],FIRST_ARG_TIMEOUT_COMMANDS:["bzmpop","blmpop"],BLOCK_OPTION_COMMANDS:["xread","xreadgroup"]},i._transformer={argument:{},reply:{}};let j=function(a){if(1===a.length){if(a[0]instanceof Map)return(0,g.convertMapToArray)(a[0]);if("object"==typeof a[0]&&null!==a[0])return(0,g.convertObjectToArray)(a[0])}return a},k=function(a){if(2===a.length){if(a[1]instanceof Map)return[a[0]].concat((0,g.convertMapToArray)(a[1]));if("object"==typeof a[1]&&null!==a[1])return[a[0]].concat((0,g.convertObjectToArray)(a[1]))}return a};i.setArgumentTransformer("mset",j),i.setArgumentTransformer("msetnx",j),i.setArgumentTransformer("hset",k),i.setArgumentTransformer("hmset",k),i.setReplyTransformer("hgetall",function(a){if(Array.isArray(a)){let b={};for(let c=0;c<a.length;c+=2){let d=a[c],e=a[c+1];d in b?Object.defineProperty(b,d,{value:e,configurable:!0,enumerable:!0,writable:!0}):b[d]=e}return b}return a});class l{constructor(){this.length=0,this.items=[]}push(a){this.length+=Buffer.byteLength(a),this.items.push(a)}toBuffer(){let a=Buffer.allocUnsafe(this.length),b=0;for(let c of this.items){let d=Buffer.byteLength(c);Buffer.isBuffer(c)?c.copy(a,b):a.write(c,b,d),b+=d}return a}}},23337:(a,b,c)=>{"use strict";Object.defineProperty(b,"__esModule",{value:!0}),b.SentinelIterator=void 0;let d=c(91645),e=c(95422),f=c(34631),g=c(83503);b.SentinelIterator=g.default;let h=c(3192),i=c(62007),j=c(46369),k=(0,e.Debug)("SentinelConnector");class l extends h.default{constructor(a){if(super(a.disconnectTimeout),this.options=a,this.emitter=null,this.failoverDetector=null,!this.options.sentinels.length)throw Error("Requires at least one sentinel to connect to.");if(!this.options.name)throw Error("Requires the name of master.");this.sentinelIterator=new g.default(this.options.sentinels)}check(a){let b=!a.role||this.options.role===a.role;return b||(k("role invalid, expected %s, but got %s",this.options.role,a.role),this.sentinelIterator.next(),this.sentinelIterator.next(),this.sentinelIterator.reset(!0)),b}disconnect(){super.disconnect(),this.failoverDetector&&this.failoverDetector.cleanup()}connect(a){let b;this.connecting=!0,this.retryAttempts=0;let c=async()=>{let g=this.sentinelIterator.next();if(g.done){this.sentinelIterator.reset(!1);let d="function"==typeof this.options.sentinelRetryStrategy?this.options.sentinelRetryStrategy(++this.retryAttempts):null,e="number"!=typeof d?"All sentinels are unreachable and retry is disabled.":`All sentinels are unreachable. Retrying from scratch after ${d}ms.`;b&&(e+=` Last error: ${b.message}`),k(e);let f=Error(e);if("number"==typeof d)return a("error",f),await new Promise(a=>setTimeout(a,d)),c();throw f}let h=null,i=null;try{h=await this.resolve(g.value)}catch(a){i=a}if(!this.connecting)throw Error(e.CONNECTION_CLOSED_ERROR_MSG);let j=g.value.host+":"+g.value.port;if(h)return k("resolved: %s:%s from sentinel %s",h.host,h.port,j),this.options.enableTLSForSentinelMode&&this.options.tls?(Object.assign(h,this.options.tls),this.stream=(0,f.connect)(h),this.stream.once("secureConnect",this.initFailoverDetector.bind(this))):(this.stream=(0,d.createConnection)(h),this.stream.once("connect",this.initFailoverDetector.bind(this))),this.stream.once("error",a=>{this.firstError=a}),this.stream;{let d=i?"failed to connect to sentinel "+j+" because "+i.message:"connected to sentinel "+j+" successfully, but got an invalid reply: "+h;return k(d),a("sentinelError",Error(d)),i&&(b=i),c()}};return c()}async updateSentinels(a){if(!this.options.updateSentinels)return;let b=await a.sentinel("sentinels",this.options.name);Array.isArray(b)&&(b.map(e.packObject).forEach(a=>{if(-1===(a.flags?a.flags.split(","):[]).indexOf("disconnected")&&a.ip&&a.port){let b=this.sentinelNatResolve(m(a));this.sentinelIterator.add(b)&&k("adding sentinel %s:%s",b.host,b.port)}}),k("Updated internal sentinels: %s",this.sentinelIterator))}async resolveMaster(a){let b=await a.sentinel("get-master-addr-by-name",this.options.name);return await this.updateSentinels(a),this.sentinelNatResolve(Array.isArray(b)?{host:b[0],port:Number(b[1])}:null)}async resolveSlave(a){let b=await a.sentinel("slaves",this.options.name);if(!Array.isArray(b))return null;let c=b.map(e.packObject).filter(a=>a.flags&&!a.flags.match(/(disconnected|s_down|o_down)/));return this.sentinelNatResolve(function(a,b){let c;if(0===a.length)return null;if("function"==typeof b)c=b(a);else if(null!==b&&"object"==typeof b){let d=Array.isArray(b)?b:[b];d.sort((a,b)=>(a.prio||(a.prio=1),b.prio||(b.prio=1),a.prio<b.prio)?-1:+(a.prio>b.prio));for(let b=0;b<d.length;b++){for(let e=0;e<a.length;e++){let f=a[e];if(f.ip===d[b].ip&&f.port===d[b].port){c=f;break}}if(c)break}}return c||(c=(0,e.sample)(a)),m(c)}(c,this.options.preferredSlaves))}sentinelNatResolve(a){if(!a||!this.options.natMap)return a;let b=`${a.host}:${a.port}`,c=a;return"function"==typeof this.options.natMap?c=this.options.natMap(b)||a:"object"==typeof this.options.natMap&&(c=this.options.natMap[b]||a),c}connectToSentinel(a,b){return new i.default({port:a.port||26379,host:a.host,username:this.options.sentinelUsername||null,password:this.options.sentinelPassword||null,family:a.family||("path"in this.options&&this.options.path?void 0:this.options.family),tls:this.options.sentinelTLS,retryStrategy:null,enableReadyCheck:!1,connectTimeout:this.options.connectTimeout,commandTimeout:this.options.sentinelCommandTimeout,...b})}async resolve(a){let b=this.connectToSentinel(a);b.on("error",n);try{if("slave"===this.options.role)return await this.resolveSlave(b);return await this.resolveMaster(b)}finally{b.disconnect()}}async initFailoverDetector(){var a;if(!this.options.failoverDetector)return;this.sentinelIterator.reset(!0);let b=[];for(;b.length<this.options.sentinelMaxConnections;){let{done:a,value:c}=this.sentinelIterator.next();if(a)break;let d=this.connectToSentinel(c,{lazyConnect:!0,retryStrategy:this.options.sentinelReconnectStrategy});d.on("reconnecting",()=>{var a;null==(a=this.emitter)||a.emit("sentinelReconnecting")}),b.push({address:c,client:d})}this.sentinelIterator.reset(!1),this.failoverDetector&&this.failoverDetector.cleanup(),this.failoverDetector=new j.FailoverDetector(this,b),await this.failoverDetector.subscribe(),null==(a=this.emitter)||a.emit("failoverSubscribed")}}function m(a){return{host:a.ip,port:Number(a.port)}}function n(){}b.default=l},23597:(a,b,c)=>{"use strict";var d=c(78808);a.exports=function(a,b,c){var e=d(a);if(1===e.length){var f=e[0],g=f.step;if(1===g&&f.start===b&&f.end===c)return"*";if(1!==g&&f.start===b&&f.end===c-g+1)return"*/"+g}for(var h=[],i=0,j=e.length;i<j;++i){var k=e[i];if(1===k.count){h.push(k.start);continue}var g=k.step;if(1===k.step){h.push(k.start+"-"+k.end);continue}var l=0==k.start?k.count-1:k.count;k.step*l>k.end?h=h.concat(Array.from({length:k.end-k.start+1}).map(function(a,b){var c=k.start+b;return(c-k.start)%k.step==0?c:null}).filter(function(a){return null!=a})):k.end===c-k.step+1?h.push(k.start+"/"+k.step):h.push(k.start+"-"+k.end+"/"+k.step)}return h.join(",")}},24524:(a,b,c)=>{"use strict";Object.defineProperty(b,"__esModule",{value:!0});let d=c(17507);class e extends d.RedisError{constructor(a,b){super(a),this.lastNodeError=b,Error.captureStackTrace(this,this.constructor)}get name(){return this.constructor.name}}b.default=e,e.defaultMessage="Failed to refresh slots cache."},24669:(a,b,c)=>{"use strict";Object.defineProperty(b,"__esModule",{value:!0}),b.genRedactedString=b.getStringValue=b.MAX_ARGUMENT_LENGTH=void 0;let d=c(63538);function e(a){if(null!==a)switch(typeof a){case"boolean":case"number":return;case"object":if(Buffer.isBuffer(a))return a.toString("hex");if(Array.isArray(a))return a.join(",");try{return JSON.stringify(a)}catch(a){return}case"string":return a}}function f(a,b){let{length:c}=a;return c<=b?a:a.slice(0,b)+' ... <REDACTED full-length="'+c+'">'}b.MAX_ARGUMENT_LENGTH=200,b.getStringValue=e,b.genRedactedString=f,b.default=function(a){let b=(0,d.default)(`ioredis:${a}`);function c(...a){if(b.enabled){for(let b=1;b<a.length;b++){let c=e(a[b]);"string"==typeof c&&c.length>200&&(a[b]=f(c,200))}return b.apply(null,a)}}return Object.defineProperties(c,{namespace:{get:()=>b.namespace},enabled:{get:()=>b.enabled},destroy:{get:()=>b.destroy},log:{get:()=>b.log,set(a){b.log=a}}}),c}},25246:(a,b,c)=>{"use strict";c.d(b,{Tt:()=>d});function d(a,b){var c={};for(var d in a)Object.prototype.hasOwnProperty.call(a,d)&&0>b.indexOf(d)&&(c[d]=a[d]);if(null!=a&&"function"==typeof Object.getOwnPropertySymbols)for(var e=0,d=Object.getOwnPropertySymbols(a);e<d.length;e++)0>b.indexOf(d[e])&&Object.prototype.propertyIsEnumerable.call(a,d[e])&&(c[d[e]]=a[d[e]]);return c}Object.create;Object.create,"function"==typeof SuppressedError&&SuppressedError},25757:(a,b,c)=>{"use strict";Object.defineProperty(b,"__esModule",{value:!0});let d=c(75761),e=c(94735),f=c(17507),g=c(95572),h=c(22013),i=c(24524),j=c(62007),k=c(80755),l=c(3504),m=c(95422),n=c(30645),o=c(25948),p=c(45121),q=c(76921),r=c(74899),s=c(48079),t=c(28749),u=c(27399),v=c(13110),w=(0,m.Debug)("cluster"),x=new WeakSet;class y extends o.default{constructor(a,b={}){if(super(),this.slots=[],this._groupsIds={},this._groupsBySlot=Array(16384),this.isCluster=!0,this.retryAttempts=0,this.delayQueue=new s.default,this.offlineQueue=new u,this.isRefreshing=!1,this._refreshSlotsCacheCallbacks=[],this._autoPipelines=new Map,this._runningAutoPipelines=new Set,this._readyDelayedCallbacks=[],this.connectionEpoch=0,e.EventEmitter.call(this),this.startupNodes=a,this.options=(0,m.defaults)({},b,p.DEFAULT_CLUSTER_OPTIONS,this.options),this.options.shardedSubscribers&&this.createShardedSubscriberGroup(),this.options.redisOptions&&this.options.redisOptions.keyPrefix&&!this.options.keyPrefix&&(this.options.keyPrefix=this.options.redisOptions.keyPrefix),"function"!=typeof this.options.scaleReads&&-1===["all","master","slave"].indexOf(this.options.scaleReads))throw Error('Invalid option scaleReads "'+this.options.scaleReads+'". Expected "all", "master", "slave" or a custom function');this.connectionPool=new r.default(this.options.redisOptions),this.connectionPool.on("-node",(a,b)=>{this.emit("-node",a)}),this.connectionPool.on("+node",a=>{this.emit("+node",a)}),this.connectionPool.on("drain",()=>{this.setStatus("close")}),this.connectionPool.on("nodeError",(a,b)=>{this.emit("node error",a,b)}),this.subscriber=new q.default(this.connectionPool,this),this.options.scripts&&Object.entries(this.options.scripts).forEach(([a,b])=>{this.defineCommand(a,b)}),this.options.lazyConnect?this.setStatus("wait"):this.connect().catch(a=>{w("connecting failed: %s",a)})}connect(){return new Promise((a,b)=>{if("connecting"===this.status||"connect"===this.status||"ready"===this.status)return void b(Error("Redis is already connecting/connected"));let c=++this.connectionEpoch;this.setStatus("connecting"),this.resolveStartupNodeHostnames().then(d=>{let e;if(this.connectionEpoch!==c){w("discard connecting after resolving startup nodes because epoch not match: %d != %d",c,this.connectionEpoch),b(new f.RedisError("Connection is discarded because a new connection is made"));return}if("connecting"!==this.status){w("discard connecting after resolving startup nodes because the status changed to %s",this.status),b(new f.RedisError("Connection is aborted"));return}this.connectionPool.reset(d),this.options.shardedSubscribers&&this.shardedSubscribers.reset(this.slots,this.connectionPool.getNodes("all")).catch(a=>{w("Error while starting subscribers: %s",a)});let g=()=>{this.setStatus("ready"),this.retryAttempts=0,this.executeOfflineCommands(),this.resetNodesRefreshInterval(),a()},h=()=>{this.invokeReadyDelayedCallbacks(void 0),this.removeListener("close",e),this.manuallyClosing=!1,this.setStatus("connect"),this.options.enableReadyCheck?this.readyCheck((a,b)=>{a||b?(w("Ready check failed (%s). Reconnecting...",a||b),"connect"===this.status&&this.disconnect(!0)):g()}):g()};e=()=>{let a=Error("None of startup nodes is available");this.removeListener("refresh",h),this.invokeReadyDelayedCallbacks(a),b(a)},this.once("refresh",h),this.once("close",e),this.once("close",this.handleCloseEvent.bind(this)),this.refreshSlotsCache(a=>{a&&a.message===i.default.defaultMessage&&(j.default.prototype.silentEmit.call(this,"error",a),this.connectionPool.reset([]))}),this.subscriber.start(),this.options.shardedSubscribers&&this.shardedSubscribers.start().catch(a=>{w("Error while starting subscribers: %s",a)})}).catch(a=>{this.setStatus("close"),this.handleCloseEvent(a),this.invokeReadyDelayedCallbacks(a),b(a)})})}disconnect(a=!1){let b=this.status;this.setStatus("disconnecting"),a||(this.manuallyClosing=!0),this.reconnectTimeout&&!a&&(clearTimeout(this.reconnectTimeout),this.reconnectTimeout=null,w("Canceled reconnecting attempts")),this.clearNodesRefreshInterval(),this.subscriber.stop(),this.options.shardedSubscribers&&this.shardedSubscribers.stop(),"wait"===b?(this.setStatus("close"),this.handleCloseEvent()):this.connectionPool.reset([])}quit(a){let b=this.status;if(this.setStatus("disconnecting"),this.manuallyClosing=!0,this.reconnectTimeout&&(clearTimeout(this.reconnectTimeout),this.reconnectTimeout=null),this.clearNodesRefreshInterval(),this.subscriber.stop(),this.options.shardedSubscribers&&this.shardedSubscribers.stop(),"wait"===b){let b=(0,g.default)(Promise.resolve("OK"),a);return setImmediate((function(){this.setStatus("close"),this.handleCloseEvent()}).bind(this)),b}return(0,g.default)(Promise.all(this.nodes().map(a=>a.quit().catch(a=>{if(a.message===m.CONNECTION_CLOSED_ERROR_MSG)return"OK";throw a}))).then(()=>"OK"),a)}duplicate(a=[],b={}){return new y(a.length>0?a:this.startupNodes.slice(0),Object.assign({},this.options,b))}nodes(a="all"){if("all"!==a&&"master"!==a&&"slave"!==a)throw Error('Invalid role "'+a+'". Expected "all", "master" or "slave"');return this.connectionPool.getNodes(a)}delayUntilReady(a){this._readyDelayedCallbacks.push(a)}get autoPipelineQueueSize(){let a=0;for(let b of this._autoPipelines.values())a+=b.length;return a}refreshSlotsCache(a){if(a&&this._refreshSlotsCacheCallbacks.push(a),this.isRefreshing)return;this.isRefreshing=!0;let b=this,c=a=>{for(let b of(this.isRefreshing=!1,this._refreshSlotsCacheCallbacks))b(a);this._refreshSlotsCacheCallbacks=[]},d=(0,m.shuffle)(this.connectionPool.getNodes()),e=null;!function a(f){if(f===d.length)return c(new i.default(i.default.defaultMessage,e));let g=d[f],h=`${g.options.host}:${g.options.port}`;w("getting slot cache from %s",h),b.getInfoFromNode(g,function(d){switch(b.status){case"close":case"end":return c(Error("Cluster is disconnected."));case"disconnecting":return c(Error("Cluster is disconnecting."))}d?(b.emit("node error",d,h),e=d,a(f+1)):(b.emit("refresh"),c())})}(0)}sendCommand(a,b,c){if("wait"===this.status&&this.connect().catch(m.noop),"end"===this.status)return a.reject(Error(m.CONNECTION_CLOSED_ERROR_MSG)),a.promise;let e=this.options.scaleReads;"master"!==e&&(a.isReadOnly||(0,d.exists)(a.name)&&(0,d.hasFlag)(a.name,"readonly")||(e="master"));let g=c?c.slot:a.getSlot(),i={},j=this;if(!c&&!x.has(a)){x.add(a);let b=a.reject;a.reject=function(c){let d=k.bind(null,!0);j.handleError(c,i,{moved:function(b,c){w("command %s is moved to %s",a.name,c),g=Number(b),j.slots[b]?j.slots[b][0]=c:j.slots[b]=[c],j._groupsBySlot[b]=j._groupsIds[j.slots[b].join(";")],j.connectionPool.findOrCreate(j.natMapper(c)),k(),w("refreshing slot caches... (triggered by MOVED error)"),j.refreshSlotsCache()},ask:function(b,c){w("command %s is required to ask %s:%s",a.name,c);let d=j.natMapper(c);j.connectionPool.findOrCreate(d),k(!1,`${d.host}:${d.port}`)},tryagain:d,clusterDown:d,connectionClosed:d,maxRedirections:function(c){b.call(a,c)},defaults:function(){b.call(a,c)}})}}function k(d,i){let k;if("end"===j.status)return void a.reject(new f.AbortError("Cluster is ended."));if("ready"===j.status||"cluster"===a.name){if(c&&c.redis)k=c.redis;else if(h.default.checkFlag("ENTER_SUBSCRIBER_MODE",a.name)||h.default.checkFlag("EXIT_SUBSCRIBER_MODE",a.name)){if(j.options.shardedSubscribers&&("ssubscribe"==a.name||"sunsubscribe"==a.name)){let b=j.shardedSubscribers.getResponsibleSubscriber(g);if(!b)return void a.reject(new f.AbortError(`No sharded subscriber for slot: ${g}`));let c=-1;"ssubscribe"==a.name&&(c=j.shardedSubscribers.addChannels(a.getKeys())),"sunsubscribe"==a.name&&(c=j.shardedSubscribers.removeChannels(a.getKeys())),-1!==c?k=b.getInstance():a.reject(new f.AbortError("Possible CROSSSLOT error: All channels must hash to the same slot"))}else k=j.subscriber.getInstance();if(!k)return void a.reject(new f.AbortError("No subscriber for the cluster"))}else{if(!d){if("number"==typeof g&&j.slots[g]){let b=j.slots[g];if("function"==typeof e){let c=b.map(function(a){return j.connectionPool.getInstanceByKey(a)});Array.isArray(k=e(c,a))&&(k=(0,m.sample)(k)),k||(k=c[0])}else{let a;a="all"===e?(0,m.sample)(b):"slave"===e&&b.length>1?(0,m.sample)(b,1):b[0],k=j.connectionPool.getInstanceByKey(a)}}i&&(k=j.connectionPool.getInstanceByKey(i)).asking()}k||(k=("function"==typeof e?null:j.connectionPool.getSampleInstance(e))||j.connectionPool.getSampleInstance("all"))}c&&!c.redis&&(c.redis=k)}k?k.sendCommand(a,b):j.options.enableOfflineQueue?j.offlineQueue.push({command:a,stream:b,node:c}):a.reject(Error("Cluster isn't ready and enableOfflineQueue options is false"))}return k(),a.promise}sscanStream(a,b){return this.createScanStream("sscan",{key:a,options:b})}sscanBufferStream(a,b){return this.createScanStream("sscanBuffer",{key:a,options:b})}hscanStream(a,b){return this.createScanStream("hscan",{key:a,options:b})}hscanBufferStream(a,b){return this.createScanStream("hscanBuffer",{key:a,options:b})}zscanStream(a,b){return this.createScanStream("zscan",{key:a,options:b})}zscanBufferStream(a,b){return this.createScanStream("zscanBuffer",{key:a,options:b})}handleError(a,b,c){if(void 0===b.value?b.value=this.options.maxRedirections:b.value-=1,b.value<=0)return void c.maxRedirections(Error("Too many Cluster redirections. Last error: "+a));let d=a.message.split(" ");if("MOVED"===d[0]){let a=this.options.retryDelayOnMoved;a&&"number"==typeof a?this.delayQueue.push("moved",c.moved.bind(null,d[1],d[2]),{timeout:a}):c.moved(d[1],d[2])}else"ASK"===d[0]?c.ask(d[1],d[2]):"TRYAGAIN"===d[0]?this.delayQueue.push("tryagain",c.tryagain,{timeout:this.options.retryDelayOnTryAgain}):"CLUSTERDOWN"===d[0]&&this.options.retryDelayOnClusterDown>0?this.delayQueue.push("clusterdown",c.connectionClosed,{timeout:this.options.retryDelayOnClusterDown,callback:this.refreshSlotsCache.bind(this)}):a.message===m.CONNECTION_CLOSED_ERROR_MSG&&this.options.retryDelayOnFailover>0&&"ready"===this.status?this.delayQueue.push("failover",c.connectionClosed,{timeout:this.options.retryDelayOnFailover,callback:this.refreshSlotsCache.bind(this)}):c.defaults()}resetOfflineQueue(){this.offlineQueue=new u}clearNodesRefreshInterval(){this.slotsTimer&&(clearTimeout(this.slotsTimer),this.slotsTimer=null)}resetNodesRefreshInterval(){if(this.slotsTimer||!this.options.slotsRefreshInterval)return;let a=()=>{this.slotsTimer=setTimeout(()=>{w('refreshing slot caches... (triggered by "slotsRefreshInterval" option)'),this.refreshSlotsCache(()=>{a()})},this.options.slotsRefreshInterval)};a()}setStatus(a){w("status: %s -> %s",this.status||"[empty]",a),this.status=a,process.nextTick(()=>{this.emit(a)})}handleCloseEvent(a){var b;let c;a&&w("closed because %s",a),this.manuallyClosing||"function"!=typeof this.options.clusterRetryStrategy||(c=this.options.clusterRetryStrategy.call(this,++this.retryAttempts,a)),"number"==typeof c?(this.setStatus("reconnecting"),this.reconnectTimeout=setTimeout(()=>{this.reconnectTimeout=null,w("Cluster is disconnected. Retrying after %dms",c),this.connect().catch(function(a){w("Got error %s when reconnecting. Ignoring...",a)})},c)):(this.options.shardedSubscribers&&(null==(b=this.subscriberGroupEmitter)||b.removeAllListeners()),this.setStatus("end"),this.flushQueue(Error("None of startup nodes is available")))}flushQueue(a){let b;for(;b=this.offlineQueue.shift();)b.command.reject(a)}executeOfflineCommands(){if(this.offlineQueue.length){let a;w("send %d commands in offline queue",this.offlineQueue.length);let b=this.offlineQueue;for(this.resetOfflineQueue();a=b.shift();)this.sendCommand(a.command,a.stream,a.node)}}natMapper(a){let b="string"==typeof a?a:`${a.host}:${a.port}`,c=null;return(this.options.natMap&&"function"==typeof this.options.natMap?c=this.options.natMap(b):this.options.natMap&&"object"==typeof this.options.natMap&&(c=this.options.natMap[b]),c)?(w("NAT mapping %s -> %O",b,c),Object.assign({},c)):"string"==typeof a?(0,t.nodeKeyToRedisOptions)(a):a}getInfoFromNode(a,b){if(!a)return b(Error("Node is disconnected"));let c=a.duplicate({enableOfflineQueue:!0,enableReadyCheck:!1,retryStrategy:null,connectionName:(0,t.getConnectionName)("refresher",this.options.redisOptions&&this.options.redisOptions.connectionName)});c.on("error",m.noop),c.cluster("SLOTS",(0,m.timeout)((a,d)=>{if(c.disconnect(),a)return w("error encountered running CLUSTER.SLOTS: %s",a),b(a);if("disconnecting"===this.status||"close"===this.status||"end"===this.status){w("ignore CLUSTER.SLOTS results (count: %d) since cluster status is %s",d.length,this.status),b();return}let e=[];w("cluster slots result count: %d",d.length);for(let a=0;a<d.length;++a){let b=d[a],c=b[0],f=b[1],g=[];for(let a=2;a<b.length;a++){if(!b[a][0])continue;let c=this.natMapper({host:b[a][0],port:b[a][1]});c.readOnly=2!==a,e.push(c),g.push(c.host+":"+c.port)}w("cluster slots result [%d]: slots %d~%d served by %s",a,c,f,g);for(let a=c;a<=f;a++)this.slots[a]=g}this._groupsIds=Object.create(null);let f=0;for(let a=0;a<16384;a++){let b=(this.slots[a]||[]).join(";");if(!b.length){this._groupsBySlot[a]=void 0;continue}this._groupsIds[b]||(this._groupsIds[b]=++f),this._groupsBySlot[a]=this._groupsIds[b]}this.connectionPool.reset(e),this.options.shardedSubscribers&&this.shardedSubscribers.reset(this.slots,this.connectionPool.getNodes("all")).catch(a=>{w("Error while starting subscribers: %s",a)}),b()},this.options.slotsRefreshTimeout))}invokeReadyDelayedCallbacks(a){for(let b of this._readyDelayedCallbacks)process.nextTick(b,a);this._readyDelayedCallbacks=[]}readyCheck(a){this.cluster("INFO",(b,c)=>{let d;if(b)return a(b);if("string"!=typeof c)return a();let e=c.split("\r\n");for(let a=0;a<e.length;++a){let b=e[a].split(":");if("cluster_state"===b[0]){d=b[1];break}}"fail"===d?(w("cluster state not ok (%s)",d),a(null,d)):a()})}resolveSrv(a){return new Promise((b,c)=>{this.options.resolveSrv(a,(a,d)=>{if(a)return c(a);let e=this,f=(0,t.groupSrvRecords)(d),g=Object.keys(f).sort((a,b)=>parseInt(a)-parseInt(b));!function a(d){if(!g.length)return c(d);let h=f[g[0]],i=(0,t.weightSrvRecords)(h);h.records.length||g.shift(),e.dnsLookup(i.name).then(a=>b({host:a,port:i.port}),a)}()})})}dnsLookup(a){return new Promise((b,c)=>{this.options.dnsLookup(a,(d,e)=>{d?(w("failed to resolve hostname %s to IP: %s",a,d.message),c(d)):(w("resolved hostname %s to IP %s",a,e),b(e))})})}async resolveStartupNodeHostnames(){if(!Array.isArray(this.startupNodes)||0===this.startupNodes.length)throw Error("`startupNodes` should contain at least one node.");let a=(0,t.normalizeNodeOptions)(this.startupNodes),b=(0,t.getUniqueHostnamesFromOptions)(a);if(0===b.length)return a;let c=await Promise.all(b.map((this.options.useSRVRecords?this.resolveSrv:this.dnsLookup).bind(this))),d=(0,m.zipMap)(b,c);return a.map(a=>{let b=d.get(a.host);return b?this.options.useSRVRecords?Object.assign({},a,b):Object.assign({},a,{host:b}):a})}createScanStream(a,{key:b,options:c={}}){return new k.default({objectMode:!0,key:b,redis:this,command:a,...c})}createShardedSubscriberGroup(){this.subscriberGroupEmitter=new e.EventEmitter,this.shardedSubscribers=new v.default(this.subscriberGroupEmitter);let a=a=>{a instanceof i.default&&this.disconnect(!0)};for(let b of(this.subscriberGroupEmitter.on("-node",(b,c)=>{this.emit("-node",b,c),this.refreshSlotsCache(a)}),this.subscriberGroupEmitter.on("subscriberConnectFailed",({delay:b,error:c})=>{this.emit("error",c),setTimeout(()=>{this.refreshSlotsCache(a)},b)}),this.subscriberGroupEmitter.on("moved",()=>{this.refreshSlotsCache(a)}),this.subscriberGroupEmitter.on("-subscriber",()=>{this.emit("-subscriber")}),this.subscriberGroupEmitter.on("+subscriber",()=>{this.emit("+subscriber")}),this.subscriberGroupEmitter.on("nodeError",(a,b)=>{this.emit("nodeError",a,b)}),this.subscriberGroupEmitter.on("subscribersReady",()=>{this.emit("subscribersReady")}),["smessage","smessageBuffer"]))this.subscriberGroupEmitter.on(b,(a,c,d)=>{this.emit(b,a,c,d)})}}(0,n.default)(y,e.EventEmitter),(0,l.addTransactionSupport)(y.prototype),b.default=y},25948:(a,b,c)=>{"use strict";Object.defineProperty(b,"__esModule",{value:!0});let d=c(75761),e=c(45416),f=c(22013),g=c(33309);class h{constructor(){this.options={},this.scriptsSet={},this.addedBuiltinSet=new Set}getBuiltinCommands(){return i.slice(0)}createBuiltinCommand(a){return{string:j(null,a,"utf8"),buffer:j(null,a,null)}}addBuiltinCommand(a){this.addedBuiltinSet.add(a),this[a]=j(a,a,"utf8"),this[a+"Buffer"]=j(a+"Buffer",a,null)}defineCommand(a,b){let c=new g.default(b.lua,b.numberOfKeys,this.options.keyPrefix,b.readOnly);this.scriptsSet[a]=c,this[a]=k(a,a,c,"utf8"),this[a+"Buffer"]=k(a+"Buffer",a,c,null)}sendCommand(a,b,c){throw Error('"sendCommand" is not implemented')}}let i=d.list.filter(a=>"monitor"!==a);function j(a,b,c){return void 0===c&&(c=b,b=null),function(...d){let g=b||d.shift(),h=d[d.length-1];"function"==typeof h?d.pop():h=void 0;let i={errorStack:this.options.showFriendlyErrorStack?Error():void 0,keyPrefix:this.options.keyPrefix,replyEncoding:c};return(0,e.shouldUseAutoPipelining)(this,a,g)?(0,e.executeWithAutoPipelining)(this,a,g,d,h):this.sendCommand(new f.default(g,d,i,h))}}function k(a,b,c,d){return function(...f){let g="function"==typeof f[f.length-1]?f.pop():void 0,h={replyEncoding:d};return(this.options.showFriendlyErrorStack&&(h.errorStack=Error()),(0,e.shouldUseAutoPipelining)(this,a,b))?(0,e.executeWithAutoPipelining)(this,a,b,f,g):c.execute(this,f,h,g)}}i.push("sentinel"),i.forEach(function(a){h.prototype[a]=j(a,a,"utf8"),h.prototype[a+"Buffer"]=j(a+"Buffer",a,null)}),h.prototype.call=j("call","utf8"),h.prototype.callBuffer=j("callBuffer",null),h.prototype.send_command=h.prototype.call,b.default=h},26581:(a,b,c)=>{"use strict";let d=c(35567);a.exports=(a,b)=>{let c=d(a,null,!0),e=d(b,null,!0),f=c.compare(e);if(0===f)return null;let g=f>0,h=g?c:e,i=g?e:c,j=!!h.prerelease.length;if(i.prerelease.length&&!j){if(!i.patch&&!i.minor)return"major";if(0===i.compareMain(h))return i.minor&&!i.patch?"minor":"patch"}let k=j?"pre":"";return c.major!==e.major?k+"major":c.minor!==e.minor?k+"minor":c.patch!==e.patch?k+"patch":"prerelease"}},27399:a=>{"use strict";function b(a,b){var b=b||{};this._capacity=b.capacity,this._head=0,this._tail=0,Array.isArray(a)?this._fromArray(a):(this._capacityMask=3,this._list=[,,,,])}b.prototype.peekAt=function(a){var b=a;if(b===(0|b)){var c=this.size();if(!(b>=c)&&!(b<-c))return b<0&&(b+=c),b=this._head+b&this._capacityMask,this._list[b]}},b.prototype.get=function(a){return this.peekAt(a)},b.prototype.peek=function(){if(this._head!==this._tail)return this._list[this._head]},b.prototype.peekFront=function(){return this.peek()},b.prototype.peekBack=function(){return this.peekAt(-1)},Object.defineProperty(b.prototype,"length",{get:function(){return this.size()}}),b.prototype.size=function(){return this._head===this._tail?0:this._head<this._tail?this._tail-this._head:this._capacityMask+1-(this._head-this._tail)},b.prototype.unshift=function(a){if(0==arguments.length)return this.size();var b=this._list.length;return(this._head=this._head-1+b&this._capacityMask,this._list[this._head]=a,this._tail===this._head&&this._growArray(),this._capacity&&this.size()>this._capacity&&this.pop(),this._head<this._tail)?this._tail-this._head:this._capacityMask+1-(this._head-this._tail)},b.prototype.shift=function(){var a=this._head;if(a!==this._tail){var b=this._list[a];return this._list[a]=void 0,this._head=a+1&this._capacityMask,a<2&&this._tail>1e4&&this._tail<=this._list.length>>>2&&this._shrinkArray(),b}},b.prototype.push=function(a){if(0==arguments.length)return this.size();var b=this._tail;return(this._list[b]=a,this._tail=b+1&this._capacityMask,this._tail===this._head&&this._growArray(),this._capacity&&this.size()>this._capacity&&this.shift(),this._head<this._tail)?this._tail-this._head:this._capacityMask+1-(this._head-this._tail)},b.prototype.pop=function(){var a=this._tail;if(a!==this._head){var b=this._list.length;this._tail=a-1+b&this._capacityMask;var c=this._list[this._tail];return this._list[this._tail]=void 0,this._head<2&&a>1e4&&a<=b>>>2&&this._shrinkArray(),c}},b.prototype.removeOne=function(a){var b,c=a;if(c===(0|c)&&this._head!==this._tail){var d=this.size(),e=this._list.length;if(!(c>=d)&&!(c<-d)){c<0&&(c+=d),c=this._head+c&this._capacityMask;var f=this._list[c];if(a<d/2){for(b=a;b>0;b--)this._list[c]=this._list[c=c-1+e&this._capacityMask];this._list[c]=void 0,this._head=this._head+1+e&this._capacityMask}else{for(b=d-1-a;b>0;b--)this._list[c]=this._list[c=c+1+e&this._capacityMask];this._list[c]=void 0,this._tail=this._tail-1+e&this._capacityMask}return f}}},b.prototype.remove=function(a,b){var c,d,e=a,f=b;if(e===(0|e)&&this._head!==this._tail){var g=this.size(),h=this._list.length;if(!(e>=g)&&!(e<-g)&&!(b<1)){if(e<0&&(e+=g),1===b||!b)return(c=[,])[0]=this.removeOne(e),c;if(0===e&&e+b>=g)return c=this.toArray(),this.clear(),c;for(e+b>g&&(b=g-e),c=Array(b),d=0;d<b;d++)c[d]=this._list[this._head+e+d&this._capacityMask];if(e=this._head+e&this._capacityMask,a+b===g){for(this._tail=this._tail-b+h&this._capacityMask,d=b;d>0;d--)this._list[e=e+1+h&this._capacityMask]=void 0;return c}if(0===a){for(this._head=this._head+b+h&this._capacityMask,d=b-1;d>0;d--)this._list[e=e+1+h&this._capacityMask]=void 0;return c}if(e<g/2){for(this._head=this._head+a+b+h&this._capacityMask,d=a;d>0;d--)this.unshift(this._list[e=e-1+h&this._capacityMask]);for(e=this._head-1+h&this._capacityMask;f>0;)this._list[e=e-1+h&this._capacityMask]=void 0,f--;a<0&&(this._tail=e)}else{for(this._tail=e,e=e+b+h&this._capacityMask,d=g-(b+a);d>0;d--)this.push(this._list[e++]);for(e=this._tail;f>0;)this._list[e=e+1+h&this._capacityMask]=void 0,f--}return this._head<2&&this._tail>1e4&&this._tail<=h>>>2&&this._shrinkArray(),c}}},b.prototype.splice=function(a,b){var c=a;if(c===(0|c)){var d=this.size();if(c<0&&(c+=d),!(c>d))if(!(arguments.length>2))return this.remove(c,b);else{var e,f,g,h=arguments.length,i=this._list.length,j=2;if(!d||c<d/2){for(e=0,f=Array(c);e<c;e++)f[e]=this._list[this._head+e&this._capacityMask];for(0===b?(g=[],c>0&&(this._head=this._head+c+i&this._capacityMask)):(g=this.remove(c,b),this._head=this._head+c+i&this._capacityMask);h>j;)this.unshift(arguments[--h]);for(e=c;e>0;e--)this.unshift(f[e-1])}else{var k=(f=Array(d-(c+b))).length;for(e=0;e<k;e++)f[e]=this._list[this._head+c+b+e&this._capacityMask];for(0===b?(g=[],c!=d&&(this._tail=this._head+c+i&this._capacityMask)):(g=this.remove(c,b),this._tail=this._tail-k+i&this._capacityMask);j<h;)this.push(arguments[j++]);for(e=0;e<k;e++)this.push(f[e])}return g}}},b.prototype.clear=function(){this._list=Array(this._list.length),this._head=0,this._tail=0},b.prototype.isEmpty=function(){return this._head===this._tail},b.prototype.toArray=function(){return this._copyArray(!1)},b.prototype._fromArray=function(a){var b=a.length,c=this._nextPowerOf2(b);this._list=Array(c),this._capacityMask=c-1,this._tail=b;for(var d=0;d<b;d++)this._list[d]=a[d]},b.prototype._copyArray=function(a,b){var c,d=this._list,e=d.length,f=this.length;if((b|=f)==f&&this._head<this._tail)return this._list.slice(this._head,this._tail);var g=Array(b),h=0;if(a||this._head>this._tail){for(c=this._head;c<e;c++)g[h++]=d[c];for(c=0;c<this._tail;c++)g[h++]=d[c]}else for(c=this._head;c<this._tail;c++)g[h++]=d[c];return g},b.prototype._growArray=function(){if(0!=this._head){var a=this._copyArray(!0,this._list.length<<1);this._tail=this._list.length,this._head=0,this._list=a}else this._tail=this._list.length,this._list.length<<=1;this._capacityMask=this._capacityMask<<1|1},b.prototype._shrinkArray=function(){this._list.length>>>=1,this._capacityMask>>>=1},b.prototype._nextPowerOf2=function(a){return Math.max(1<<Math.log(a)/Math.log(2)+1,4)},a.exports=b},27403:(a,b,c)=>{"use strict";Object.defineProperty(b,"__esModule",{value:!0}),b.readyHandler=b.errorHandler=b.closeHandler=b.connectHandler=void 0;let d=c(17507),e=c(22013),f=c(41958),g=c(95422),h=c(72328),i=(0,g.Debug)("connection");function j(a){let b=new d.AbortError("Command aborted due to connection close");return b.command={name:a.name,args:a.args},b}b.connectHandler=function(a){return function(){var c;a.setStatus("connect"),a.resetCommandQueue();let d=!1,{connectionEpoch:e}=a;a.condition.auth&&a.auth(a.condition.auth,function(b){e===a.connectionEpoch&&b&&(-1!==b.message.indexOf("no password is set")?console.warn("[WARN] Redis server does not require a password, but a password was supplied."):-1!==b.message.indexOf("without any password configured for the default user")?console.warn("[WARN] This Redis server's `default` user does not require a password, but a password was supplied"):-1!==b.message.indexOf("wrong number of arguments for 'auth' command")?console.warn("[ERROR] The server returned \"wrong number of arguments for 'auth' command\". You are probably passing both username and password to Redis version 5 or below. You should only pass the 'password' option for Redis version 5 and under."):(d=!0,a.recoverFromFatalError(b,b)))}),a.condition.select&&a.select(a.condition.select).catch(b=>{a.silentEmit("error",b)}),new h.default(a,{stringNumbers:a.options.stringNumbers});let f=[];a.options.connectionName&&(i("set the connection name [%s]",a.options.connectionName),f.push(a.client("setname",a.options.connectionName).catch(g.noop))),a.options.disableClientInfo||(i("set the client info"),f.push((0,g.getPackageMeta)().then(b=>a.client("SETINFO","LIB-VER",b.version).catch(g.noop)).catch(g.noop)),f.push(a.client("SETINFO","LIB-NAME",(null==(c=a.options)?void 0:c.clientInfoTag)?`ioredis(${a.options.clientInfoTag})`:"ioredis").catch(g.noop))),Promise.all(f).catch(g.noop).finally(()=>{a.options.enableReadyCheck||b.readyHandler(a)(),a.options.enableReadyCheck&&a._readyCheck(function(c,f){e===a.connectionEpoch&&(c?d||a.recoverFromFatalError(Error("Ready check failed: "+c.message),c):a.connector.check(f)?b.readyHandler(a)():a.disconnect(!0))})})}},b.closeHandler=function(a){return function(){let c=a.status;if(a.setStatus("close"),a.commandQueue.length&&function(a){var b;let c=0;for(let d=0;d<a.length;){let e=null==(b=a.peekAt(d))?void 0:b.command,f=e.pipelineIndex;if((void 0===f||0===f)&&(c=0),void 0!==f&&f!==c++){a.remove(d,1),e.reject(j(e));continue}d++}}(a.commandQueue),a.offlineQueue.length&&function(a){var b;for(let c=0;c<a.length;){let d=null==(b=a.peekAt(c))?void 0:b.command;if("multi"===d.name)break;if("exec"===d.name){a.remove(c,1),d.reject(j(d));break}d.inTransaction?(a.remove(c,1),d.reject(j(d))):c++}}(a.offlineQueue),"ready"===c&&(a.prevCondition||(a.prevCondition=a.condition),a.commandQueue.length&&(a.prevCommandQueue=a.commandQueue)),a.manuallyClosing)return a.manuallyClosing=!1,i("skip reconnecting since the connection is manually closed."),b();if("function"!=typeof a.options.retryStrategy)return i("skip reconnecting because `retryStrategy` is not a function"),b();let d=a.options.retryStrategy(++a.retryAttempts);if("number"!=typeof d)return i("skip reconnecting because `retryStrategy` doesn't return a number"),b();i("reconnect in %sms",d),a.setStatus("reconnecting",d),a.reconnectTimeout=setTimeout(function(){a.reconnectTimeout=null,a.connect().catch(g.noop)},d);let{maxRetriesPerRequest:e}=a.options;"number"==typeof e&&(e<0?i("maxRetriesPerRequest is negative, ignoring..."):0==a.retryAttempts%(e+1)&&(i("reach maxRetriesPerRequest limitation, flushing command queue..."),a.flushQueue(new f.MaxRetriesPerRequestError(e))))};function b(){a.setStatus("end"),a.flushQueue(Error(g.CONNECTION_CLOSED_ERROR_MSG))}},b.errorHandler=function(a){return function(b){i("error: %s",b),a.silentEmit("error",b)}},b.readyHandler=function(a){return function(){if(a.setStatus("ready"),a.retryAttempts=0,a.options.monitor){a.call("monitor").then(()=>a.setStatus("monitoring"),b=>a.emit("error",b));let{sendCommand:b}=a;a.sendCommand=function(c){return e.default.checkFlag("VALID_IN_MONITOR_MODE",c.name)?b.call(a,c):(c.reject(Error("Connection is in monitoring mode, can't process commands.")),c.promise)},a.once("close",function(){delete a.sendCommand});return}let b=a.prevCondition?a.prevCondition.select:a.condition.select;if(a.options.readOnly&&(i("set the connection to readonly mode"),a.readonly().catch(g.noop)),a.prevCondition){let c=a.prevCondition;if(a.prevCondition=null,c.subscriber&&a.options.autoResubscribe){a.condition.select!==b&&(i("connect to db [%d]",b),a.select(b));let d=c.subscriber.channels("subscribe");d.length&&(i("subscribe %d channels",d.length),a.subscribe(d));let e=c.subscriber.channels("psubscribe");e.length&&(i("psubscribe %d channels",e.length),a.psubscribe(e));let f=c.subscriber.channels("ssubscribe");if(f.length)for(let b of(i("ssubscribe %s",f.length),f))a.ssubscribe(b)}}if(a.prevCommandQueue)if(a.options.autoResendUnfulfilledCommands)for(i("resend %d unfulfilled commands",a.prevCommandQueue.length);a.prevCommandQueue.length>0;){let b=a.prevCommandQueue.shift();b.select!==a.condition.select&&"select"!==b.command.name&&a.select(b.select),a.sendCommand(b.command,b.stream)}else a.prevCommandQueue=null;if(a.offlineQueue.length){i("send %d commands in offline queue",a.offlineQueue.length);let b=a.offlineQueue;for(a.resetOfflineQueue();b.length>0;){let c=b.shift();c.select!==a.condition.select&&"select"!==c.command.name&&a.select(c.select),a.sendCommand(c.command,c.stream)}}a.condition.select!==b&&(i("connect to db [%d]",b),a.select(b))}}},27463:(a,b)=>{"use strict";Object.defineProperty(b,"__esModule",{value:!0}),b.parseBlockOption=b.parseSecondsArgument=void 0;let c=a=>{if("number"==typeof a)return a;if(Buffer.isBuffer(a))return c(a.toString());if("string"==typeof a){let b=Number(a);return Number.isFinite(b)?b:void 0}},d=a=>"string"==typeof a?a:Buffer.isBuffer(a)?a.toString():void 0;b.parseSecondsArgument=a=>{let b=c(a);if(void 0!==b)return b<=0?0:1e3*b},b.parseBlockOption=a=>{for(let b=0;b<a.length;b++){let e=d(a[b]);if(e&&"block"===e.toLowerCase()){let d=c(a[b+1]);if(void 0===d)return;if(d<=0)return 0;return d}}return null}},27482:(a,b,c)=>{"use strict";let d=c(35463);a.exports=(a,b,c)=>0>d(a,b,c)},28233:(a,b)=>{"use strict";Object.defineProperty(b,"__esModule",{value:!0}),b.DEFAULT_REDIS_OPTIONS=void 0,b.DEFAULT_REDIS_OPTIONS={port:6379,host:"localhost",family:0,connectTimeout:1e4,disconnectTimeout:2e3,retryStrategy:function(a){return Math.min(50*a,2e3)},keepAlive:0,noDelay:!0,connectionName:null,disableClientInfo:!1,clientInfoTag:void 0,sentinels:null,name:null,role:"master",sentinelRetryStrategy:function(a){return Math.min(10*a,1e3)},sentinelReconnectStrategy:function(){return 6e4},natMap:null,enableTLSForSentinelMode:!1,updateSentinels:!0,failoverDetector:!1,username:null,password:null,db:0,enableOfflineQueue:!0,enableReadyCheck:!0,autoResubscribe:!0,autoResendUnfulfilledCommands:!0,lazyConnect:!1,keyPrefix:"",reconnectOnError:null,readOnly:!1,stringNumbers:!1,maxRetriesPerRequest:20,maxLoadingRetryTime:1e4,enableAutoPipelining:!1,autoPipeliningIgnoredCommands:[],sentinelMaxConnections:10,blockingTimeoutGrace:100}},28749:(a,b,c)=>{"use strict";Object.defineProperty(b,"__esModule",{value:!0}),b.getConnectionName=b.weightSrvRecords=b.groupSrvRecords=b.getUniqueHostnamesFromOptions=b.normalizeNodeOptions=b.nodeKeyToRedisOptions=b.getNodeKey=void 0;let d=c(95422),e=c(91645);b.getNodeKey=function(a){return a.port=a.port||6379,a.host=a.host||"127.0.0.1",a.host+":"+a.port},b.nodeKeyToRedisOptions=function(a){let b=a.lastIndexOf(":");if(-1===b)throw Error(`Invalid node key ${a}`);return{host:a.slice(0,b),port:Number(a.slice(b+1))}},b.normalizeNodeOptions=function(a){return a.map(a=>{let b={};if("object"==typeof a)Object.assign(b,a);else if("string"==typeof a)Object.assign(b,(0,d.parseURL)(a));else if("number"==typeof a)b.port=a;else throw Error("Invalid argument "+a);return"string"==typeof b.port&&(b.port=parseInt(b.port,10)),delete b.db,b.port||(b.port=6379),b.host||(b.host="127.0.0.1"),(0,d.resolveTLSProfile)(b)})},b.getUniqueHostnamesFromOptions=function(a){let b={};return a.forEach(a=>{b[a.host]=!0}),Object.keys(b).filter(a=>!(0,e.isIP)(a))},b.groupSrvRecords=function(a){let b={};for(let c of a)b.hasOwnProperty(c.priority)?(b[c.priority].totalWeight+=c.weight,b[c.priority].records.push(c)):b[c.priority]={totalWeight:c.weight,records:[c]};return b},b.weightSrvRecords=function(a){if(1===a.records.length)return a.totalWeight=0,a.records.shift();let b=Math.floor(Math.random()*(a.totalWeight+a.records.length)),c=0;for(let[d,e]of a.records.entries())if((c+=1+e.weight)>b)return a.totalWeight-=e.weight,a.records.splice(d,1),e},b.getConnectionName=function(a,b){let c=`ioredis-cluster(${a})`;return b?`${c}:${b}`:c}},29196:(a,b,c)=>{"use strict";var d,e,f,g,h,i,j;c.d(b,{M0:()=>d,O4:()=>e,Pe:()=>i,sc:()=>f,v8:()=>j,tC:()=>h}),function(a){a[a.Init=0]="Init",a[a.Start=1]="Start",a[a.Stop=2]="Stop",a[a.GetChildrenValuesResponse=3]="GetChildrenValuesResponse",a[a.GetIgnoredChildrenFailuresResponse=4]="GetIgnoredChildrenFailuresResponse",a[a.MoveToWaitingChildrenResponse=5]="MoveToWaitingChildrenResponse",a[a.Cancel=6]="Cancel"}(d||(d={})),function(a){a[a.JobNotExist=-1]="JobNotExist",a[a.JobLockNotExist=-2]="JobLockNotExist",a[a.JobNotInState=-3]="JobNotInState",a[a.JobPendingChildren=-4]="JobPendingChildren",a[a.ParentJobNotExist=-5]="ParentJobNotExist",a[a.JobLockMismatch=-6]="JobLockMismatch",a[a.ParentJobCannotBeReplaced=-7]="ParentJobCannotBeReplaced",a[a.JobBelongsToJobScheduler=-8]="JobBelongsToJobScheduler",a[a.JobHasFailedChildren=-9]="JobHasFailedChildren",a[a.SchedulerJobIdCollision=-10]="SchedulerJobIdCollision",a[a.SchedulerJobSlotsBusy=-11]="SchedulerJobSlotsBusy"}(e||(e={})),function(a){a[a.Completed=0]="Completed",a[a.Error=1]="Error",a[a.Failed=2]="Failed",a[a.InitFailed=3]="InitFailed",a[a.InitCompleted=4]="InitCompleted",a[a.Log=5]="Log",a[a.MoveToDelayed=6]="MoveToDelayed",a[a.MoveToWait=7]="MoveToWait",a[a.Progress=8]="Progress",a[a.Update=9]="Update",a[a.GetChildrenValues=10]="GetChildrenValues",a[a.GetIgnoredChildrenFailures=11]="GetIgnoredChildrenFailures",a[a.MoveToWaitingChildren=12]="MoveToWaitingChildren"}(f||(f={})),function(a){a[a.ONE_MINUTE=1]="ONE_MINUTE",a[a.FIVE_MINUTES=5]="FIVE_MINUTES",a[a.FIFTEEN_MINUTES=15]="FIFTEEN_MINUTES",a[a.THIRTY_MINUTES=30]="THIRTY_MINUTES",a[a.ONE_HOUR=60]="ONE_HOUR",a[a.ONE_WEEK=10080]="ONE_WEEK",a[a.TWO_WEEKS=20160]="TWO_WEEKS",a[a.ONE_MONTH=80640]="ONE_MONTH"}(g||(g={})),function(a){a.QueueName="bullmq.queue.name",a.QueueOperation="bullmq.queue.operation",a.BulkCount="bullmq.job.bulk.count",a.BulkNames="bullmq.job.bulk.names",a.JobName="bullmq.job.name",a.JobId="bullmq.job.id",a.JobKey="bullmq.job.key",a.JobIds="bullmq.job.ids",a.JobAttemptsMade="bullmq.job.attempts.made",a.DeduplicationKey="bullmq.job.deduplication.key",a.JobOptions="bullmq.job.options",a.JobProgress="bullmq.job.progress",a.QueueDrainDelay="bullmq.queue.drain.delay",a.QueueGrace="bullmq.queue.grace",a.QueueCleanLimit="bullmq.queue.clean.limit",a.QueueRateLimit="bullmq.queue.rate.limit",a.JobType="bullmq.job.type",a.QueueOptions="bullmq.queue.options",a.QueueEventMaxLength="bullmq.queue.event.max.length",a.WorkerOptions="bullmq.worker.options",a.WorkerName="bullmq.worker.name",a.WorkerId="bullmq.worker.id",a.WorkerRateLimit="bullmq.worker.rate.limit",a.WorkerDoNotWaitActive="bullmq.worker.do.not.wait.active",a.WorkerForceClose="bullmq.worker.force.close",a.WorkerStalledJobs="bullmq.worker.stalled.jobs",a.WorkerFailedJobs="bullmq.worker.failed.jobs",a.WorkerJobsToExtendLocks="bullmq.worker.jobs.to.extend.locks",a.JobFinishedTimestamp="bullmq.job.finished.timestamp",a.JobAttemptFinishedTimestamp="bullmq.job.attempt_finished_timestamp",a.JobProcessedTimestamp="bullmq.job.processed.timestamp",a.JobResult="bullmq.job.result",a.JobFailedReason="bullmq.job.failed.reason",a.FlowName="bullmq.flow.name",a.JobSchedulerId="bullmq.job.scheduler.id",a.JobStatus="bullmq.job.status"}(h||(h={})),function(a){a.JobsCompleted="bullmq.jobs.completed",a.JobsFailed="bullmq.jobs.failed",a.JobsDelayed="bullmq.jobs.delayed",a.JobsRetried="bullmq.jobs.retried",a.JobsWaiting="bullmq.jobs.waiting",a.JobsWaitingChildren="bullmq.jobs.waiting_children",a.JobDuration="bullmq.job.duration"}(i||(i={})),function(a){a[a.INTERNAL=0]="INTERNAL",a[a.SERVER=1]="SERVER",a[a.CLIENT=2]="CLIENT",a[a.PRODUCER=3]="PRODUCER",a[a.CONSUMER=4]="CONSUMER"}(j||(j={}))},30066:(a,b,c)=>{"use strict";let d=c(70405),e=c(36317),{ANY:f}=e,g=c(72988),h=c(9261),i=c(10185),j=c(27482),k=c(64011),l=c(90710);a.exports=(a,b,c,m)=>{let n,o,p,q,r;switch(a=new d(a,m),b=new g(b,m),c){case">":n=i,o=k,p=j,q=">",r=">=";break;case"<":n=j,o=l,p=i,q="<",r="<=";break;default:throw TypeError('Must provide a hilo val of "<" or ">"')}if(h(a,b,m))return!1;for(let c=0;c<b.set.length;++c){let d=b.set[c],g=null,h=null;if(d.forEach(a=>{a.semver===f&&(a=new e(">=0.0.0")),g=g||a,h=h||a,n(a.semver,g.semver,m)?g=a:p(a.semver,h.semver,m)&&(h=a)}),g.operator===q||g.operator===r||(!h.operator||h.operator===q)&&o(a,h.semver)||h.operator===r&&p(a,h.semver))return!1}return!0}},30645:(a,b)=>{"use strict";Object.defineProperty(b,"__esModule",{value:!0}),b.default=function(a,b){Object.getOwnPropertyNames(b.prototype).forEach(c=>{Object.defineProperty(a.prototype,c,Object.getOwnPropertyDescriptor(b.prototype,c))})}},31976:(a,b,c)=>{"use strict";let d=c(79428).Buffer,e=new(c(41204)).StringDecoder,f=c(17507),g=f.ReplyError,h=f.ParserError;var i=d.allocUnsafe(32768),j=0,k=null,l=0,m=0;function n(a){let b=a.offset,c=a.buffer,d=c.length-1;for(var e=b;e<d;)if(13===c[e++]){if(a.offset=e+1,!0===a.optionReturnBuffers)return a.buffer.slice(b,e-1);return a.buffer.toString("utf8",b,e-1)}}function o(a){let b=a.buffer.length-1;for(var c=a.offset,d=0;c<b;){let b=a.buffer[c++];if(13===b)return a.offset=c+1,d;d=10*d+(b-48)}}function p(a,b,c){a.arrayCache.push(b),a.arrayPos.push(c)}function q(a){let b=a.arrayCache.pop();var c=a.arrayPos.pop();if(a.arrayCache.length){let d=q(a);if(void 0===d)return void p(a,b,c);b[c++]=d}return r(a,b,c)}function r(a,b,c){let d=a.buffer.length;for(;c<b.length;){let e=a.offset;if(a.offset>=d)return void p(a,b,c);let f=s(a,a.buffer[a.offset++]);if(void 0===f){a.arrayCache.length||a.bufferCache.length||(a.offset=e),p(a,b,c);return}b[c]=f,c++}return b}function s(a,b){switch(b){case 36:let c=o(a);if(void 0===c)return;if(c<0)return null;let d=a.offset+c;if(d+2>a.buffer.length){a.bigStrSize=d+2,a.totalChunkSize=a.buffer.length,a.bufferCache.push(a.buffer);return}let e=a.offset;return(a.offset=d+2,!0===a.optionReturnBuffers)?a.buffer.slice(e,d):a.buffer.toString("utf8",e,d);case 43:return n(a);case 42:let f=o(a);return void 0===f?void 0:f<0?null:r(a,Array(f),0);case 58:return!0===a.optionStringNumbers?function(a){let b=a.buffer.length-1;var c=a.offset,d=0,e="";for(45===a.buffer[c]&&(e+="-",c++);c<b;){var f=a.buffer[c++];if(13===f)return a.offset=c+1,0!==d&&(e+=d),e;d>0x19999998?(e+=10*d+(f-48),d=0):48===f&&0===d?e+=0:d=10*d+(f-48)}}(a):function(a){let b=a.buffer.length-1;var c=a.offset,d=0,e=1;for(45===a.buffer[c]&&(e=-1,c++);c<b;){let b=a.buffer[c++];if(13===b)return a.offset=c+1,e*d;d=10*d+(b-48)}}(a);case 45:var i=n(a);if(void 0!==i)return!0===a.optionReturnBuffers&&(i=i.toString()),new g(i);return;default:let j=new h("Protocol error, got "+JSON.stringify(String.fromCharCode(b))+" as reply type byte",JSON.stringify(a.buffer),a.offset);a.buffer=null,a.returnFatalError(j);return}}function t(){if(i.length>51200)if(1===l||m>2*l){let a=Math.floor(i.length/10),b=a<j?j:a;j=0,i=i.slice(b,i.length)}else m++,l--;else clearInterval(k),l=0,m=0,k=null}class u{constructor(a){if(!a)throw TypeError("Options are mandatory.");if("function"!=typeof a.returnError||"function"!=typeof a.returnReply)throw TypeError("The returnReply and returnError options have to be functions.");this.setReturnBuffers(!!a.returnBuffers),this.setStringNumbers(!!a.stringNumbers),this.returnError=a.returnError,this.returnFatalError=a.returnFatalError||a.returnError,this.returnReply=a.returnReply,this.reset()}reset(){this.offset=0,this.buffer=null,this.bigStrSize=0,this.totalChunkSize=0,this.bufferCache=[],this.arrayCache=[],this.arrayPos=[]}setReturnBuffers(a){if("boolean"!=typeof a)throw TypeError("The returnBuffers argument has to be a boolean");this.optionReturnBuffers=a}setStringNumbers(a){if("boolean"!=typeof a)throw TypeError("The stringNumbers argument has to be a boolean");this.optionStringNumbers=a}execute(a){if(null===this.buffer)this.buffer=a,this.offset=0;else if(0===this.bigStrSize){let b=this.buffer.length,c=b-this.offset,e=d.allocUnsafe(c+a.length);if(this.buffer.copy(e,0,this.offset,b),a.copy(e,c,0,a.length),this.buffer=e,this.offset=0,this.arrayCache.length){let a=q(this);if(void 0===a)return;this.returnReply(a)}}else if(this.totalChunkSize+a.length>=this.bigStrSize){this.bufferCache.push(a);var b=this.optionReturnBuffers?function(a){let b=a.bufferCache,c=a.offset,e=a.bigStrSize-c-2;var f=b.length,g=a.bigStrSize-a.totalChunkSize;if(a.offset=g,g<=2){if(2===f)return b[0].slice(c,b[0].length+g-2);f--,g=b[b.length-2].length+g}i.length<e+j&&(j>0x6f00000&&(j=0x3200000),i=d.allocUnsafe(e*(e>0x4b00000?2:3)+j),j=0,l++,null===k&&(k=setInterval(t,50)));let h=j;b[0].copy(i,h,c,b[0].length),j+=b[0].length-c;for(var m=1;m<f-1;m++)b[m].copy(i,j),j+=b[m].length;return b[m].copy(i,j,0,g-2),j+=g-2,i.slice(h,j)}(this):function(a){let b=a.bufferCache,c=a.offset;var d=b.length,f=a.bigStrSize-a.totalChunkSize;if(a.offset=f,f<=2){if(2===d)return b[0].toString("utf8",c,b[0].length+f-2);d--,f=b[b.length-2].length+f}for(var g=e.write(b[0].slice(c)),h=1;h<d-1;h++)g+=e.write(b[h]);return g+e.end(b[h].slice(0,f-2))}(this);if(this.bigStrSize=0,this.bufferCache=[],this.buffer=a,this.arrayCache.length&&(this.arrayCache[0][this.arrayPos[0]++]=b,void 0===(b=q(this))))return;this.returnReply(b)}else{this.bufferCache.push(a),this.totalChunkSize+=a.length;return}for(;this.offset<this.buffer.length;){let a=this.offset,b=this.buffer[this.offset++],c=s(this,b);if(void 0===c){this.arrayCache.length||this.bufferCache.length||(this.offset=a);return}45===b?this.returnError(c):this.returnReply(c)}this.buffer=null}}a.exports=u},32990:(a,b,c)=>{"use strict";let d=c(30066);a.exports=(a,b,c)=>d(a,b,">",c)},33309:(a,b,c)=>{"use strict";Object.defineProperty(b,"__esModule",{value:!0});let d=c(55511),e=c(22013),f=c(95572);class g{constructor(a,b=null,c="",f=!1){this.lua=a,this.numberOfKeys=b,this.keyPrefix=c,this.readOnly=f,this.sha=(0,d.createHash)("sha1").update(a).digest("hex");let g=this.sha,h=new WeakSet;this.Command=class extends e.default{toWritable(b){let c=this.reject;return this.reject=a=>{-1!==a.message.indexOf("NOSCRIPT")&&h.delete(b),c.call(this,a)},h.has(b)?"eval"===this.name&&(this.name="evalsha",this.args[0]=g):(h.add(b),this.name="eval",this.args[0]=a),super.toWritable(b)}}}execute(a,b,c,d){"number"==typeof this.numberOfKeys&&b.unshift(this.numberOfKeys),this.keyPrefix&&(c.keyPrefix=this.keyPrefix),this.readOnly&&(c.readOnly=!0);let e=new this.Command("evalsha",[this.sha,...b],c);return e.promise=e.promise.catch(d=>{if(-1===d.message.indexOf("NOSCRIPT"))throw d;let e=new this.Command("evalsha",[this.sha,...b],c);return(a.isPipeline?a.redis:a).sendCommand(e)}),(0,f.default)(e.promise,d),a.sendCommand(e)}}b.default=g},35137:(a,b,c)=>{"use strict";let{MAX_SAFE_COMPONENT_LENGTH:d,MAX_SAFE_BUILD_LENGTH:e,MAX_LENGTH:f}=c(57147),g=c(55193),h=(b=a.exports={}).re=[],i=b.safeRe=[],j=b.src=[],k=b.safeSrc=[],l=b.t={},m=0,n="[a-zA-Z0-9-]",o=[["\\s",1],["\\d",f],[n,e]],p=(a,b,c)=>{let d=(a=>{for(let[b,c]of o)a=a.split(`${b}*`).join(`${b}{0,${c}}`).split(`${b}+`).join(`${b}{1,${c}}`);return a})(b),e=m++;g(a,e,b),l[a]=e,j[e]=b,k[e]=d,h[e]=new RegExp(b,c?"g":void 0),i[e]=new RegExp(d,c?"g":void 0)};p("NUMERICIDENTIFIER","0|[1-9]\\d*"),p("NUMERICIDENTIFIERLOOSE","\\d+"),p("NONNUMERICIDENTIFIER",`\\d*[a-zA-Z-]${n}*`),p("MAINVERSION",`(${j[l.NUMERICIDENTIFIER]})\\.(${j[l.NUMERICIDENTIFIER]})\\.(${j[l.NUMERICIDENTIFIER]})`),p("MAINVERSIONLOOSE",`(${j[l.NUMERICIDENTIFIERLOOSE]})\\.(${j[l.NUMERICIDENTIFIERLOOSE]})\\.(${j[l.NUMERICIDENTIFIERLOOSE]})`),p("PRERELEASEIDENTIFIER",`(?:${j[l.NONNUMERICIDENTIFIER]}|${j[l.NUMERICIDENTIFIER]})`),p("PRERELEASEIDENTIFIERLOOSE",`(?:${j[l.NONNUMERICIDENTIFIER]}|${j[l.NUMERICIDENTIFIERLOOSE]})`),p("PRERELEASE",`(?:-(${j[l.PRERELEASEIDENTIFIER]}(?:\\.${j[l.PRERELEASEIDENTIFIER]})*))`),p("PRERELEASELOOSE",`(?:-?(${j[l.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${j[l.PRERELEASEIDENTIFIERLOOSE]})*))`),p("BUILDIDENTIFIER",`${n}+`),p("BUILD",`(?:\\+(${j[l.BUILDIDENTIFIER]}(?:\\.${j[l.BUILDIDENTIFIER]})*))`),p("FULLPLAIN",`v?${j[l.MAINVERSION]}${j[l.PRERELEASE]}?${j[l.BUILD]}?`),p("FULL",`^${j[l.FULLPLAIN]}$`),p("LOOSEPLAIN",`[v=\\s]*${j[l.MAINVERSIONLOOSE]}${j[l.PRERELEASELOOSE]}?${j[l.BUILD]}?`),p("LOOSE",`^${j[l.LOOSEPLAIN]}$`),p("GTLT","((?:<|>)?=?)"),p("XRANGEIDENTIFIERLOOSE",`${j[l.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`),p("XRANGEIDENTIFIER",`${j[l.NUMERICIDENTIFIER]}|x|X|\\*`),p("XRANGEPLAIN",`[v=\\s]*(${j[l.XRANGEIDENTIFIER]})(?:\\.(${j[l.XRANGEIDENTIFIER]})(?:\\.(${j[l.XRANGEIDENTIFIER]})(?:${j[l.PRERELEASE]})?${j[l.BUILD]}?)?)?`),p("XRANGEPLAINLOOSE",`[v=\\s]*(${j[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${j[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${j[l.XRANGEIDENTIFIERLOOSE]})(?:${j[l.PRERELEASELOOSE]})?${j[l.BUILD]}?)?)?`),p("XRANGE",`^${j[l.GTLT]}\\s*${j[l.XRANGEPLAIN]}$`),p("XRANGELOOSE",`^${j[l.GTLT]}\\s*${j[l.XRANGEPLAINLOOSE]}$`),p("COERCEPLAIN",`(^|[^\\d])(\\d{1,${d}})(?:\\.(\\d{1,${d}}))?(?:\\.(\\d{1,${d}}))?`),p("COERCE",`${j[l.COERCEPLAIN]}(?:$|[^\\d])`),p("COERCEFULL",j[l.COERCEPLAIN]+`(?:${j[l.PRERELEASE]})?`+`(?:${j[l.BUILD]})?`+"(?:$|[^\\d])"),p("COERCERTL",j[l.COERCE],!0),p("COERCERTLFULL",j[l.COERCEFULL],!0),p("LONETILDE","(?:~>?)"),p("TILDETRIM",`(\\s*)${j[l.LONETILDE]}\\s+`,!0),b.tildeTrimReplace="$1~",p("TILDE",`^${j[l.LONETILDE]}${j[l.XRANGEPLAIN]}$`),p("TILDELOOSE",`^${j[l.LONETILDE]}${j[l.XRANGEPLAINLOOSE]}$`),p("LONECARET","(?:\\^)"),p("CARETTRIM",`(\\s*)${j[l.LONECARET]}\\s+`,!0),b.caretTrimReplace="$1^",p("CARET",`^${j[l.LONECARET]}${j[l.XRANGEPLAIN]}$`),p("CARETLOOSE",`^${j[l.LONECARET]}${j[l.XRANGEPLAINLOOSE]}$`),p("COMPARATORLOOSE",`^${j[l.GTLT]}\\s*(${j[l.LOOSEPLAIN]})$|^$`),p("COMPARATOR",`^${j[l.GTLT]}\\s*(${j[l.FULLPLAIN]})$|^$`),p("COMPARATORTRIM",`(\\s*)${j[l.GTLT]}\\s*(${j[l.LOOSEPLAIN]}|${j[l.XRANGEPLAIN]})`,!0),b.comparatorTrimReplace="$1$2$3",p("HYPHENRANGE",`^\\s*(${j[l.XRANGEPLAIN]})\\s+-\\s+(${j[l.XRANGEPLAIN]})\\s*$`),p("HYPHENRANGELOOSE",`^\\s*(${j[l.XRANGEPLAINLOOSE]})\\s+-\\s+(${j[l.XRANGEPLAINLOOSE]})\\s*$`),p("STAR","(<|>)?=?\\s*\\*"),p("GTE0","^\\s*>=\\s*0\\.0\\.0\\s*$"),p("GTE0PRE","^\\s*>=\\s*0\\.0\\.0-0\\s*$")},35463:(a,b,c)=>{"use strict";let d=c(70405);a.exports=(a,b,c)=>new d(a,c).compare(new d(b,c))},35567:(a,b,c)=>{"use strict";let d=c(70405);a.exports=(a,b,c=!1)=>{if(a instanceof d)return a;try{return new d(a,b)}catch(a){if(!c)return null;throw a}}},36317:(a,b,c)=>{"use strict";let d=Symbol("SemVer ANY");class e{static get ANY(){return d}constructor(a,b){if(b=f(b),a instanceof e)if(!!b.loose===a.loose)return a;else a=a.value;j("comparator",a=a.trim().split(/\s+/).join(" "),b),this.options=b,this.loose=!!b.loose,this.parse(a),this.semver===d?this.value="":this.value=this.operator+this.semver.version,j("comp",this)}parse(a){let b=this.options.loose?g[h.COMPARATORLOOSE]:g[h.COMPARATOR],c=a.match(b);if(!c)throw TypeError(`Invalid comparator: ${a}`);this.operator=void 0!==c[1]?c[1]:"","="===this.operator&&(this.operator=""),c[2]?this.semver=new k(c[2],this.options.loose):this.semver=d}toString(){return this.value}test(a){if(j("Comparator.test",a,this.options.loose),this.semver===d||a===d)return!0;if("string"==typeof a)try{a=new k(a,this.options)}catch(a){return!1}return i(a,this.operator,this.semver,this.options)}intersects(a,b){if(!(a instanceof e))throw TypeError("a Comparator is required");return""===this.operator?""===this.value||new l(a.value,b).test(this.value):""===a.operator?""===a.value||new l(this.value,b).test(a.semver):!((b=f(b)).includePrerelease&&("<0.0.0-0"===this.value||"<0.0.0-0"===a.value)||!b.includePrerelease&&(this.value.startsWith("<0.0.0")||a.value.startsWith("<0.0.0")))&&!!(this.operator.startsWith(">")&&a.operator.startsWith(">")||this.operator.startsWith("<")&&a.operator.startsWith("<")||this.semver.version===a.semver.version&&this.operator.includes("=")&&a.operator.includes("=")||i(this.semver,"<",a.semver,b)&&this.operator.startsWith(">")&&a.operator.startsWith("<")||i(this.semver,">",a.semver,b)&&this.operator.startsWith("<")&&a.operator.startsWith(">"))}}a.exports=e;let f=c(13714),{safeRe:g,t:h}=c(35137),i=c(3180),j=c(55193),k=c(70405),l=c(72988)},37099:(a,b,c)=>{"use strict";c.d(b,{_:()=>l});var d=c(25246),e=c(28354),f=c(50685),g=c(11024),h=c(68115),i=c(95016),j=c(29196);let k=(0,e.debuglog)("bull");class l{constructor(a,b,c,e={},g){this.queue=a,this.name=b,this.data=c,this.opts=e,this.id=g,this.progress=0,this.returnvalue=null,this.stacktrace=null,this.delay=0,this.priority=0,this.attemptsStarted=0,this.attemptsMade=0,this.stalledCounter=0;let i=this.opts,{repeatJobKey:j}=i,k=(0,d.Tt)(i,["repeatJobKey"]);this.opts=Object.assign({attempts:0},k),this.delay=this.opts.delay,this.priority=this.opts.priority||0,this.repeatJobKey=j,this.timestamp=e.timestamp?e.timestamp:Date.now(),this.opts.backoff=h.u.normalize(e.backoff),this.parentKey=(0,f.Ie)(e.parent),e.parent&&(this.parent={id:e.parent.id,queueKey:e.parent.queue},e.failParentOnFailure&&(this.parent.fpof=!0),e.removeDependencyOnFailure&&(this.parent.rdof=!0),e.ignoreDependencyOnFailure&&(this.parent.idof=!0),e.continueParentOnFailure&&(this.parent.cpof=!0)),this.debounceId=e.debounce?e.debounce.id:void 0,this.deduplicationId=e.deduplication?e.deduplication.id:this.debounceId,this.toKey=a.toKey.bind(a),this.createScripts(),this.queueQualifiedName=a.qualifiedName}static async create(a,b,c,d){let e=await a.client,f=new this(a,b,c,d,d&&d.jobId);return f.id=await f.addJob(e,{parentKey:f.parentKey,parentDependenciesKey:f.parentKey?`${f.parentKey}:dependencies`:""}),f}static async createBulk(a,b){let c=await a.client,d=b.map(b=>{var c;return new this(a,b.name,b.data,b.opts,null==(c=b.opts)?void 0:c.jobId)}),e=c.pipeline();for(let a of d)a.addJob(e,{parentKey:a.parentKey,parentDependenciesKey:a.parentKey?`${a.parentKey}:dependencies`:""});let f=await e.exec();for(let a=0;a<f.length;++a){let[b,c]=f[a];if(b)throw b;d[a].id=c}return d}static fromJSON(a,b,c){let d=JSON.parse(b.data||"{}"),e=l.optsFromJSON(b.opts),g=new this(a,b.name,d,e,b.id||c);return g.progress=JSON.parse(b.progress||"0"),g.delay=parseInt(b.delay),g.priority=parseInt(b.priority),g.timestamp=parseInt(b.timestamp),b.finishedOn&&(g.finishedOn=parseInt(b.finishedOn)),b.processedOn&&(g.processedOn=parseInt(b.processedOn)),b.rjk&&(g.repeatJobKey=b.rjk),b.deid&&(g.debounceId=b.deid,g.deduplicationId=b.deid),b.failedReason&&(g.failedReason=b.failedReason),g.attemptsStarted=parseInt(b.ats||"0"),g.attemptsMade=parseInt(b.attemptsMade||b.atm||"0"),g.stalledCounter=parseInt(b.stc||"0"),b.defa&&(g.deferredFailure=b.defa),g.stacktrace=function(a){if(!a)return[];let b=(0,f.TX)(JSON.parse,JSON,[a]);return b!==f.Mo&&b instanceof Array?b:[]}(b.stacktrace),"string"==typeof b.returnvalue&&(g.returnvalue=m(b.returnvalue)),b.parentKey&&(g.parentKey=b.parentKey),b.parent&&(g.parent=JSON.parse(b.parent)),b.pb&&(g.processedBy=b.pb),b.nrjid&&(g.nextRepeatableJobId=b.nrjid),g}createScripts(){this.scripts=(0,g.N)(this.queue)}static optsFromJSON(a,b=f.zl){let c=Object.entries(JSON.parse(a||"{}")),d={};for(let a of c){let[c,e]=a;b[c]?d[b[c]]=e:"tm"===c?d.telemetry=Object.assign(Object.assign({},d.telemetry),{metadata:e}):"omc"===c?d.telemetry=Object.assign(Object.assign({},d.telemetry),{omitContext:e}):d[c]=e}return d}static async fromId(a,b){if(b){let c=await a.client,d=await c.hgetall(a.toKey(b));return(0,f.Im)(d)?void 0:this.fromJSON(a,d,b)}}static addJobLog(a,b,c,d){return a.scripts.addLog(b,c,d)}toJSON(){let{queue:a,scripts:b}=this;return(0,d.Tt)(this,["queue","scripts"])}asJSON(){return(0,f.uJ)({id:this.id,name:this.name,data:JSON.stringify(void 0===this.data?{}:this.data),opts:l.optsAsJSON(this.opts),parent:this.parent?Object.assign({},this.parent):void 0,parentKey:this.parentKey,progress:this.progress,attemptsMade:this.attemptsMade,attemptsStarted:this.attemptsStarted,stalledCounter:this.stalledCounter,finishedOn:this.finishedOn,processedOn:this.processedOn,timestamp:this.timestamp,failedReason:JSON.stringify(this.failedReason),stacktrace:JSON.stringify(this.stacktrace),debounceId:this.debounceId,deduplicationId:this.deduplicationId,repeatJobKey:this.repeatJobKey,returnvalue:JSON.stringify(this.returnvalue),nrjid:this.nextRepeatableJobId})}static optsAsJSON(a={},b=f.DR){let c=Object.entries(a),d={};for(let[a,e]of c)void 0!==e&&(a in b?d[b[a]]=e:"telemetry"===a?(void 0!==e.metadata&&(d.tm=e.metadata),void 0!==e.omitContext&&(d.omc=e.omitContext)):d[a]=e);return d}asJSONSandbox(){return Object.assign(Object.assign({},this.asJSON()),{queueName:this.queueName,queueQualifiedName:this.queueQualifiedName,prefix:this.prefix})}updateData(a){return this.data=a,this.scripts.updateData(this,a)}async updateProgress(a){this.progress=a,await this.scripts.updateProgress(this.id,a),this.queue.emit("progress",this,a)}async log(a){return l.addJobLog(this.queue,this.id,a,this.opts.keepLogs)}async removeChildDependency(){return!!await this.scripts.removeChildDependency(this.id,this.parentKey)&&(this.parent=void 0,this.parentKey=void 0,!0)}async clearLogs(a){let b=await this.queue.client,c=this.toKey(this.id)+":logs";a?await b.ltrim(c,-a,-1):await b.del(c)}async remove({removeChildren:a=!0}={}){await this.queue.waitUntilReady();let b=this.queue;if(await this.scripts.remove(this.id,a))b.emit("removed",this);else throw Error(`Job ${this.id} could not be removed because it is locked by another worker`)}async removeUnprocessedChildren(){let a=this.id;await this.scripts.removeUnprocessedChildren(a)}extendLock(a,b){return this.scripts.extendLock(this.id,a,b)}async moveToCompleted(a,b,c=!0){return this.queue.trace(j.v8.INTERNAL,"complete",this.queue.name,async d=>{this.setSpanJobAttributes(d),await this.queue.waitUntilReady(),this.returnvalue=a||void 0;let e=(0,f.TX)(JSON.stringify,JSON,[a]);if(e===f.Mo)throw f.Mo.value;let g=this.scripts.moveToCompletedArgs(this,e,this.opts.removeOnComplete,b,c),h=await this.scripts.moveToFinished(this.id,g);return this.finishedOn=g[this.scripts.moveToFinishedKeys.length+1],this.attemptsMade+=1,this.recordJobMetrics("completed"),h})}async moveToWait(a){let b=await this.scripts.moveJobFromActiveToWait(this.id,a);return this.recordJobMetrics("waiting"),b}async shouldRetryJob(a){if(!(this.attemptsMade+1<this.opts.attempts)||this.discarded||a instanceof i.u||"UnrecoverableError"==a.name)return[!1,0];{let b=this.queue.opts,c=await h.u.calculate(this.opts.backoff,this.attemptsMade+1,a,this,b.settings&&b.settings.backoffStrategy);return[-1!=c,-1==c?0:c]}}async moveToFailed(a,b,c=!1){this.failedReason=null==a?void 0:a.message;let[d,e]=await this.shouldRetryJob(a);return this.queue.trace(j.v8.INTERNAL,this.getSpanOperation(d,e),this.queue.name,async(f,g)=>{var h,i;let j,k,l;this.setSpanJobAttributes(f),(null==(i=null==(h=this.opts)?void 0:h.telemetry)?void 0:i.omitContext)||!g||(j=g),this.updateStacktrace(a);let m={failedReason:this.failedReason,stacktrace:JSON.stringify(this.stacktrace),tm:j};if(d)e?(k=await this.scripts.moveToDelayed(this.id,Date.now(),e,b,{fieldsToUpdate:m}),this.recordJobMetrics("delayed")):(k=await this.scripts.retryJob(this.id,this.opts.lifo,b,{fieldsToUpdate:m}),this.recordJobMetrics("retried"));else{let a=this.scripts.moveToFailedArgs(this,this.failedReason,this.opts.removeOnFail,b,c,m);k=await this.scripts.moveToFinished(this.id,a),l=a[this.scripts.moveToFinishedKeys.length+1],this.recordJobMetrics("failed")}return l&&"number"==typeof l&&(this.finishedOn=l),e&&"number"==typeof e&&(this.delay=e),this.attemptsMade+=1,k})}getSpanOperation(a,b){return a?b?"delay":"retry":"fail"}recordJobMetrics(a){var b,c;let d=null==(c=null==(b=this.queue.opts)?void 0:b.telemetry)?void 0:c.meter;if(!d)return;let e={[j.tC.QueueName]:this.queue.name,[j.tC.JobName]:this.name,[j.tC.JobStatus]:a},f={completed:j.Pe.JobsCompleted,failed:j.Pe.JobsFailed,delayed:j.Pe.JobsDelayed,retried:j.Pe.JobsRetried,waiting:j.Pe.JobsWaiting,"waiting-children":j.Pe.JobsWaitingChildren}[a];if(d.createCounter(f,{description:`Number of jobs ${a}`,unit:"1"}).add(1,e),this.processedOn){let a=Date.now()-this.processedOn;d.createHistogram(j.Pe.JobDuration,{description:"Job processing duration",unit:"ms"}).record(a,e)}}isCompleted(){return this.isInZSet("completed")}isFailed(){return this.isInZSet("failed")}isDelayed(){return this.isInZSet("delayed")}isWaitingChildren(){return this.isInZSet("waiting-children")}isActive(){return this.isInList("active")}async isWaiting(){return await this.isInList("wait")||await this.isInList("paused")}get queueName(){return this.queue.name}get prefix(){return this.queue.opts.prefix}getState(){return this.scripts.getState(this.id)}async changeDelay(a){await this.scripts.changeDelay(this.id,a),this.delay=a}async changePriority(a){await this.scripts.changePriority(this.id,a.priority,a.lifo),this.priority=a.priority||0}async getChildrenValues(){let a=await this.queue.client,b=await a.hgetall(this.toKey(`${this.id}:processed`));if(b)return(0,f.t)(b)}async getIgnoredChildrenFailures(){return(await this.queue.client).hgetall(this.toKey(`${this.id}:failed`))}async getFailedChildrenValues(){return(await this.queue.client).hgetall(this.toKey(`${this.id}:failed`))}async getDependencies(a={}){let b=(await this.queue.client).multi();if(a.processed||a.unprocessed||a.ignored||a.failed){let c,d,e,f,g,h,i,j,k={cursor:0,count:20},l=[];if(a.processed){l.push("processed");let c=Object.assign(Object.assign({},k),a.processed);b.hscan(this.toKey(`${this.id}:processed`),c.cursor,"COUNT",c.count)}if(a.unprocessed){l.push("unprocessed");let c=Object.assign(Object.assign({},k),a.unprocessed);b.sscan(this.toKey(`${this.id}:dependencies`),c.cursor,"COUNT",c.count)}if(a.ignored){l.push("ignored");let c=Object.assign(Object.assign({},k),a.ignored);b.hscan(this.toKey(`${this.id}:failed`),c.cursor,"COUNT",c.count)}if(a.failed){l.push("failed");let d=Object.assign(Object.assign({},k),a.failed);c=d.cursor+d.count,b.zrange(this.toKey(`${this.id}:unsuccessful`),d.cursor,d.count-1)}let m=await b.exec();return l.forEach((a,b)=>{switch(a){case"processed":{d=m[b][1][0];let a=m[b][1][1],c={};for(let b=0;b<a.length;++b)b%2&&(c[a[b-1]]=JSON.parse(a[b]));e=c;break}case"failed":h=m[b][1];break;case"ignored":{i=m[b][1][0];let a=m[b][1][1],c={};for(let b=0;b<a.length;++b)b%2&&(c[a[b-1]]=a[b]);j=c;break}case"unprocessed":f=m[b][1][0],g=m[b][1][1]}}),Object.assign(Object.assign(Object.assign(Object.assign({},d?{processed:e,nextProcessedCursor:Number(d)}:{}),i?{ignored:j,nextIgnoredCursor:Number(i)}:{}),c?{failed:h,nextFailedCursor:c}:{}),f?{unprocessed:g,nextUnprocessedCursor:Number(f)}:{})}{b.hgetall(this.toKey(`${this.id}:processed`)),b.smembers(this.toKey(`${this.id}:dependencies`)),b.hgetall(this.toKey(`${this.id}:failed`)),b.zrange(this.toKey(`${this.id}:unsuccessful`),0,-1);let[[a,c],[d,e],[g,h],[i,j]]=await b.exec();return{processed:(0,f.t)(c),unprocessed:e,failed:j,ignored:h}}}async getDependenciesCount(a={}){let b=[];Object.entries(a).forEach(([a,c])=>{c&&b.push(a)});let c=b.length?b:["processed","unprocessed","ignored","failed"],d=await this.scripts.getDependencyCounts(this.id,c),e={};return d.forEach((a,b)=>{e[`${c[b]}`]=a||0}),e}async waitUntilFinished(a,b){await this.queue.waitUntilReady();let c=this.id;return new Promise(async(d,e)=>{let f;function g(a){k(),d(a.returnvalue)}function h(a){k(),e(Error(a.failedReason||a))}b&&(f=setTimeout(()=>h(`Job wait ${this.name} timed out before finishing, no finish notification arrived after ${b}ms (id=${c})`),b));let i=`completed:${c}`,j=`failed:${c}`;a.on(i,g),a.on(j,h),this.queue.on("closing",h);let k=()=>{clearInterval(f),a.removeListener(i,g),a.removeListener(j,h),this.queue.removeListener("closing",h)};await a.waitUntilReady();let[l,n]=await this.scripts.isFinished(c,!0);0!=l&&(-1==l||2==l?h({failedReason:n}):g({returnvalue:m(n)}))})}async moveToDelayed(a,b){let c=Date.now(),d=a-c,e=d>0?d:0,f=await this.scripts.moveToDelayed(this.id,c,e,b,{skipAttempt:!0});return this.delay=e,this.recordJobMetrics("delayed"),f}async moveToWaitingChildren(a,b={}){let c=await this.scripts.moveToWaitingChildren(this.id,a,b);return c&&this.recordJobMetrics("waiting-children"),c}async promote(){let a=this.id;await this.scripts.promote(a),this.delay=0}async retry(a="failed",b={}){await this.scripts.reprocessJob(this,a,b),this.failedReason=null,this.finishedOn=null,this.processedOn=null,this.returnvalue=null,b.resetAttemptsMade&&(this.attemptsMade=0),b.resetAttemptsStarted&&(this.attemptsStarted=0)}discard(){this.discarded=!0}async isInZSet(a){let b=await this.queue.client;return null!==await b.zscore(this.queue.toKey(a),this.id)}async isInList(a){return this.scripts.isJobInList(this.queue.toKey(a),this.id)}addJob(a,b){let c=this.asJSON();return this.validateOptions(c),this.scripts.addJob(a,c,c.opts,this.id,b)}async removeDeduplicationKey(){return!!this.deduplicationId&&await this.scripts.removeDeduplicationKey(this.deduplicationId,this.id)>0}validateOptions(a){var b,c,d,e,g,h,i,j;if(this.opts.sizeLimit&&(0,f.a4)(a.data)>this.opts.sizeLimit)throw Error(`The size of job ${this.name} exceeds the limit ${this.opts.sizeLimit} bytes`);if(this.opts.delay&&this.opts.repeat&&!(null==(b=this.opts.repeat)?void 0:b.count))throw Error("Delay and repeat options could not be used together");let k=["removeDependencyOnFailure","failParentOnFailure","continueParentOnFailure","ignoreDependencyOnFailure"].filter(a=>this.opts[a]);if(k.length>1){let a=k.join(", ");throw Error(`The following options cannot be used together: ${a}`)}if(null==(c=this.opts)?void 0:c.jobId){if(`${parseInt(this.opts.jobId,10)}`===(null==(d=this.opts)?void 0:d.jobId))throw Error("Custom Id cannot be integers");if((null==(e=this.opts)?void 0:e.jobId.includes(":"))&&(null==(h=null==(g=this.opts)?void 0:g.jobId)?void 0:h.split(":").length)!==3)throw Error("Custom Id cannot contain :")}if(this.opts.priority){if(Math.trunc(this.opts.priority)!==this.opts.priority)throw Error("Priority should not be float");if(this.opts.priority>2097152)throw Error("Priority should be between 0 and 2097152")}if(this.opts.deduplication){if(!(null==(i=this.opts.deduplication)?void 0:i.id))throw Error("Deduplication id must be provided");if(this.parentKey)throw Error("Deduplication and parent options cannot be used together")}if(this.opts.debounce){if(!(null==(j=this.opts.debounce)?void 0:j.id))throw Error("Debounce id must be provided");if(this.parentKey)throw Error("Debounce and parent options cannot be used together")}if("object"==typeof this.opts.backoff&&"number"==typeof this.opts.backoff.jitter&&(this.opts.backoff.jitter<0||this.opts.backoff.jitter>1))throw Error("Jitter should be between 0 and 1")}updateStacktrace(a){this.stacktrace=this.stacktrace||[],(null==a?void 0:a.stack)&&(this.stacktrace.push(a.stack),0===this.opts.stackTraceLimit?this.stacktrace=[]:this.opts.stackTraceLimit&&(this.stacktrace=this.stacktrace.slice(-this.opts.stackTraceLimit)))}setSpanJobAttributes(a){null==a||a.setAttributes({[j.tC.JobName]:this.name,[j.tC.JobId]:this.id})}}function m(a){let b=(0,f.TX)(JSON.parse,JSON,[a]);if(b!==f.Mo)return b;k("corrupted returnvalue: "+a,b)}},41555:(a,b,c)=>{"use strict";let d=c(72988);a.exports=(a,b,c)=>(a=new d(a,c),b=new d(b,c),a.intersects(b,c))},41958:(a,b,c)=>{"use strict";Object.defineProperty(b,"__esModule",{value:!0}),b.MaxRetriesPerRequestError=void 0,b.MaxRetriesPerRequestError=c(91524).default},42919:(a,b,c)=>{"use strict";c.d(b,{l:()=>j});var d=c(25246),e=c(94296),f=c(37099),g=c(77425),h=c(29196),i=c(50685);class j extends g.f{constructor(a,b,c){super(a,b,c),this.repeatStrategy=b.settings&&b.settings.repeatStrategy||k}async upsertJobScheduler(a,b,c,e,g,{override:i,producerId:j}){let k,{every:l,limit:m,pattern:n,offset:o}=b;if(n&&l)throw Error("Both .pattern and .every options are defined for this repeatable job");if(!n&&!l)throw Error("Either .pattern or .every options must be defined for this repeatable job");if(b.immediately&&b.startDate)throw Error("Both .immediately and .startDate options are defined for this repeatable job");b.immediately&&b.every&&console.warn("Using option immediately with every does not affect the job's schedule. Job will run immediately anyway.");let p=b.count?b.count+1:1;if(void 0!==b.limit&&p>b.limit)return;let q=Date.now(),{endDate:r}=b;if(r&&q>new Date(r).getTime())return;let s=g.prevMillis||0;q=s<q?q:s;let{immediately:t}=b,u=(0,d.Tt)(b,["immediately"]);if(n&&(k=await this.repeatStrategy(q,b,c))<q&&(k=q),k||l)return this.trace(h.v8.PRODUCER,"add",`${this.name}.${c}`,async(d,o)=>{var s,t;let v=g.telemetry;if(o){let a=null==(s=g.telemetry)?void 0:s.omitContext,b=(null==(t=g.telemetry)?void 0:t.metadata)||!a&&o;(b||a)&&(v={metadata:b,omitContext:a})}let w=this.getNextJobOpts(k,a,Object.assign(Object.assign({},g),{repeat:u,telemetry:v}),p,null);if(i){k<q&&(k=q);let[i,o]=await this.scripts.addJobScheduler(a,k,JSON.stringify(void 0===e?{}:e),f._.optsAsJSON(g),{name:c,startDate:b.startDate?new Date(b.startDate).getTime():void 0,endDate:r?new Date(r).getTime():void 0,tz:b.tz,pattern:n,every:l,limit:m,offset:null},f._.optsAsJSON(w),j),p="string"==typeof o?parseInt(o,10):o,s=new this.Job(this,c,e,Object.assign(Object.assign({},w),{delay:p}),i);return s.id=i,null==d||d.setAttributes({[h.tC.JobSchedulerId]:a,[h.tC.JobId]:s.id}),s}{let b=await this.scripts.updateJobSchedulerNextMillis(a,k,JSON.stringify(void 0===e?{}:e),f._.optsAsJSON(w),j);if(b){let f=new this.Job(this,c,e,w,b);return f.id=b,null==d||d.setAttributes({[h.tC.JobSchedulerId]:a,[h.tC.JobId]:f.id}),f}}})}getNextJobOpts(a,b,c,d,e){var f,g;let h=this.getSchedulerNextJobId({jobSchedulerId:b,nextMillis:a}),i=Date.now(),j=a+e-i,k=Object.assign(Object.assign({},c),{jobId:h,delay:j<0?0:j,timestamp:i,prevMillis:a,repeatJobKey:b});return k.repeat=Object.assign(Object.assign({},c.repeat),{offset:e,count:d,startDate:(null==(f=c.repeat)?void 0:f.startDate)?new Date(c.repeat.startDate).getTime():void 0,endDate:(null==(g=c.repeat)?void 0:g.endDate)?new Date(c.repeat.endDate).getTime():void 0}),k}async removeJobScheduler(a){return this.scripts.removeJobScheduler(a)}async getSchedulerData(a,b,c){let d=await a.hgetall(this.toKey("repeat:"+b));return this.transformSchedulerData(b,d,c)}transformSchedulerData(a,b,c){if(b&&Object.keys(b).length>0){let d={key:a,name:b.name,next:c};return b.ic&&(d.iterationCount=parseInt(b.ic)),b.limit&&(d.limit=parseInt(b.limit)),b.startDate&&(d.startDate=parseInt(b.startDate)),b.endDate&&(d.endDate=parseInt(b.endDate)),b.tz&&(d.tz=b.tz),b.pattern&&(d.pattern=b.pattern),b.every&&(d.every=parseInt(b.every)),b.offset&&(d.offset=parseInt(b.offset)),(b.data||b.opts)&&(d.template=this.getTemplateFromJSON(b.data,b.opts)),d}if(a.includes(":"))return this.keyToData(a,c)}keyToData(a,b){let c=a.split(":"),d=c.slice(4).join(":")||null;return{key:a,name:c[0],id:c[1]||null,endDate:parseInt(c[2])||null,tz:c[3]||null,pattern:d,next:b}}async getScheduler(a){let[b,c]=await this.scripts.getJobScheduler(a);return this.transformSchedulerData(a,b?(0,i.BC)(b):null,c?parseInt(c):null)}getTemplateFromJSON(a,b){let c={};return a&&(c.data=JSON.parse(a)),b&&(c.opts=f._.optsFromJSON(b)),c}async getJobSchedulers(a=0,b=-1,c=!1){let d=await this.client,e=this.keys.repeat,f=c?await d.zrange(e,a,b,"WITHSCORES"):await d.zrevrange(e,a,b,"WITHSCORES"),g=[];for(let a=0;a<f.length;a+=2)g.push(this.getSchedulerData(d,f[a],parseInt(f[a+1])));return Promise.all(g)}async getSchedulersCount(){let a=this.keys.repeat;return(await this.client).zcard(a)}getSchedulerNextJobId({nextMillis:a,jobSchedulerId:b}){return`repeat:${b}:${a}`}}let k=(a,b)=>{let{pattern:c}=b,d=new Date(a),f=b.startDate&&new Date(b.startDate),g=(0,e.parseExpression)(c,Object.assign(Object.assign({},b),{currentDate:f>d?f:d}));try{if(b.immediately)return new Date().getTime();return g.next().getTime()}catch(a){}}},44452:(a,b,c)=>{"use strict";let d=c(72988);a.exports=(a,b)=>new d(a,b).set.map(a=>a.map(a=>a.value).join(" ").trim().split(" "))},45121:(a,b,c)=>{"use strict";Object.defineProperty(b,"__esModule",{value:!0}),b.DEFAULT_CLUSTER_OPTIONS=void 0;let d=c(14985);b.DEFAULT_CLUSTER_OPTIONS={clusterRetryStrategy:a=>Math.min(100+2*a,2e3),enableOfflineQueue:!0,enableReadyCheck:!0,scaleReads:"master",maxRedirections:16,retryDelayOnMoved:0,retryDelayOnFailover:100,retryDelayOnClusterDown:100,retryDelayOnTryAgain:100,slotsRefreshTimeout:1e3,useSRVRecords:!1,resolveSrv:d.resolveSrv,dnsLookup:d.lookup,enableAutoPipelining:!1,autoPipeliningIgnoredCommands:[],shardedSubscribers:!1}},45416:(a,b,c)=>{"use strict";Object.defineProperty(b,"__esModule",{value:!0}),b.executeWithAutoPipelining=b.getFirstValueInFlattenedArray=b.shouldUseAutoPipelining=b.notAllowedAutoPipelineCommands=b.kCallbacks=b.kExec=void 0;let d=c(66721),e=c(84968),f=c(95572),g=c(75761);function h(a){for(let b=0;b<a.length;b++){let c=a[b];if("string"==typeof c)return c;if(Array.isArray(c)||(0,d.isArguments)(c)){if(0===c.length)continue;return c[0]}let e=[c].flat();if(e.length>0)return e[0]}}b.kExec=Symbol("exec"),b.kCallbacks=Symbol("callbacks"),b.notAllowedAutoPipelineCommands=["auth","info","script","quit","cluster","pipeline","multi","subscribe","psubscribe","unsubscribe","unpsubscribe","select","client"],b.shouldUseAutoPipelining=function(a,c,d){return c&&a.options.enableAutoPipelining&&!a.isPipeline&&!b.notAllowedAutoPipelineCommands.includes(d)&&!a.options.autoPipeliningIgnoredCommands.includes(d)},b.getFirstValueInFlattenedArray=h,b.executeWithAutoPipelining=function a(c,i,j,k,l){if(c.isCluster&&!c.slots.length)return"wait"===c.status&&c.connect().catch(d.noop),(0,f.default)(new Promise(function(b,d){c.delayUntilReady(e=>{if(e)return void d(e);a(c,i,j,k,null).then(b,d)})}),l);let m=c.options.keyPrefix||"",n=c.isCluster?c.slots[e(`${m}${h(k)}`)].join(","):"main";if(c.isCluster&&"master"!==c.options.scaleReads&&(n+=(0,g.exists)(j)&&(0,g.hasFlag)(j,"readonly")?":read":":write"),!c._autoPipelines.has(n)){let a=c.pipeline();a[b.kExec]=!1,a[b.kCallbacks]=[],c._autoPipelines.set(n,a)}let o=c._autoPipelines.get(n);o[b.kExec]||(o[b.kExec]=!0,setImmediate(function a(c,d){if(c._runningAutoPipelines.has(d)||!c._autoPipelines.has(d))return;c._runningAutoPipelines.add(d);let e=c._autoPipelines.get(d);c._autoPipelines.delete(d);let f=e[b.kCallbacks];e[b.kCallbacks]=null,e.exec(function(b,e){if(c._runningAutoPipelines.delete(d),b)for(let a=0;a<f.length;a++)process.nextTick(f[a],b);else for(let a=0;a<f.length;a++)process.nextTick(f[a],...e[a]);c._autoPipelines.has(d)&&a(c,d)})},c,n));let p=new Promise(function(a,c){o[b.kCallbacks].push(function(b,d){if(b)return void c(b);a(d)}),"call"===i&&k.unshift(j),o[i](...k)});return(0,f.default)(p,l)}},46293:(a,b,c)=>{"use strict";c.d(b,{Q:()=>ai});var d={};c.r(d),c.d(d,{addDelayedJob:()=>l,addJobScheduler:()=>m,addLog:()=>n,addParentJob:()=>o,addPrioritizedJob:()=>p,addRepeatableJob:()=>q,addStandardJob:()=>r,changeDelay:()=>s,changePriority:()=>t,cleanJobsInSet:()=>u,drain:()=>v,extendLock:()=>w,extendLocks:()=>x,getCounts:()=>y,getCountsPerPriority:()=>z,getDependencyCounts:()=>A,getJobScheduler:()=>B,getMetrics:()=>C,getRanges:()=>D,getRateLimitTtl:()=>E,getState:()=>F,getStateV2:()=>G,isFinished:()=>H,isJobInList:()=>I,isMaxed:()=>J,moveJobFromActiveToWait:()=>K,moveJobsToWait:()=>L,moveStalledJobsToWait:()=>M,moveToActive:()=>N,moveToDelayed:()=>O,moveToFinished:()=>P,moveToWaitingChildren:()=>Q,obliterate:()=>R,paginate:()=>S,pause:()=>T,promote:()=>U,releaseLock:()=>V,removeChildDependency:()=>W,removeDeduplicationKey:()=>X,removeJob:()=>Y,removeJobScheduler:()=>Z,removeOrphanedJobs:()=>$,removeRepeatable:()=>_,removeUnprocessedChildren:()=>aa,reprocessJob:()=>ab,retryJob:()=>ac,saveStacktrace:()=>ad,updateData:()=>ae,updateJobScheduler:()=>af,updateProgress:()=>ag,updateRepeatableJobMillis:()=>ah});var e=c(25246),f=c(94735),g=c(73192),h=c.n(g),i=c(95422),j=c(50685),k=c(70359);let l={name:"addDelayedJob",content:`--[[
  Adds a delayed job to the queue by doing the following:
    - Increases the job counter if needed.
    - Creates a new job key with the job data.
    - computes timestamp.
    - adds to delayed zset.
    - Emits a global event 'delayed' if the job is delayed.
    Input:
      KEYS[1] 'marker',
      KEYS[2] 'meta'
      KEYS[3] 'id'
      KEYS[4] 'delayed'
      KEYS[5] 'completed'
      KEYS[6] events stream key
      ARGV[1] msgpacked arguments array
            [1]  key prefix,
            [2]  custom id (use custom instead of one generated automatically)
            [3]  name
            [4]  timestamp
            [5]  parentKey?
            [6]  parent dependencies key.
            [7]  parent? {id, queueKey}
            [8]  repeat job key
            [9] deduplication key
      ARGV[2] Json stringified job data
      ARGV[3] msgpacked options
      Output:
        jobId  - OK
        -5     - Missing parent key
]]
local metaKey = KEYS[2]
local idKey = KEYS[3]
local delayedKey = KEYS[4]
local completedKey = KEYS[5]
local eventsKey = KEYS[6]
local jobId
local jobIdKey
local rcall = redis.call
local args = cmsgpack.unpack(ARGV[1])
local data = ARGV[2]
local parentKey = args[5]
local parent = args[7]
local repeatJobKey = args[8]
local deduplicationKey = args[9]
local parentData
-- Includes
--[[
  Adds a delayed job to the queue by doing the following:
    - Creates a new job key with the job data.
    - adds to delayed zset.
    - Emits a global event 'delayed' if the job is delayed.
]]
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if nextTimestamp ~= nil then
      return nextTimestamp / 0x1000
    end
  end
end
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
  local nextTimestamp = getNextDelayedTimestamp(delayedKey)
  if nextTimestamp ~= nil then
    -- Replace the score of the marker with the newest known
    -- next timestamp.
    rcall("ZADD", markerKey, nextTimestamp, "1")
  end
end
--[[
  Bake in the job id first 12 bits into the timestamp
  to guarantee correct execution order of delayed jobs
  (up to 4096 jobs per given timestamp or 4096 jobs apart per timestamp)
  WARNING: Jobs that are so far apart that they wrap around will cause FIFO to fail
]]
local function getDelayedScore(delayedKey, timestamp, delay)
  local delayedTimestamp = (delay > 0 and (tonumber(timestamp) + delay)) or tonumber(timestamp)
  local minScore = delayedTimestamp * 0x1000
  local maxScore = (delayedTimestamp + 1 ) * 0x1000 - 1
  local result = rcall("ZREVRANGEBYSCORE", delayedKey, maxScore,
    minScore, "WITHSCORES","LIMIT", 0, 1)
  if #result then
    local currentMaxScore = tonumber(result[2])
    if currentMaxScore ~= nil then
      if currentMaxScore >= maxScore then
        return maxScore, delayedTimestamp
      else
        return currentMaxScore + 1, delayedTimestamp
      end
    end
  end
  return minScore, delayedTimestamp
end
local function addDelayedJob(jobId, delayedKey, eventsKey, timestamp,
  maxEvents, markerKey, delay)
  local score, delayedTimestamp = getDelayedScore(delayedKey, timestamp, tonumber(delay))
  rcall("ZADD", delayedKey, score, jobId)
  rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "delayed",
    "jobId", jobId, "delay", delayedTimestamp)
  -- mark that a delayed job is available
  addDelayMarkerIfNeeded(markerKey, delayedKey)
end
--[[
  Function to debounce a job.
]]
-- Includes
--[[
  Function to deduplicate a job.
]]
local function deduplicateJobWithoutReplace(deduplicationId, deduplicationOpts, jobId, deduplicationKey,
    eventsKey, maxEvents)
    local ttl = deduplicationOpts['ttl']
    local deduplicationKeyExists
    if ttl and ttl > 0 then
        if deduplicationOpts['extend'] then
            local currentDebounceJobId = rcall('GET', deduplicationKey)
            if currentDebounceJobId then
                rcall('SET', deduplicationKey, currentDebounceJobId, 'PX', ttl)
                rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "debounced",
                    "jobId", currentDebounceJobId, "debounceId", deduplicationId)
                rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "deduplicated", "jobId",
                    currentDebounceJobId, "deduplicationId", deduplicationId, "deduplicatedJobId", jobId)
                return currentDebounceJobId
            else
                rcall('SET', deduplicationKey, jobId, 'PX', ttl)
                return
            end
        else
            deduplicationKeyExists = not rcall('SET', deduplicationKey, jobId, 'PX', ttl, 'NX')
        end
    else
        deduplicationKeyExists = not rcall('SET', deduplicationKey, jobId, 'NX')
    end
    if deduplicationKeyExists then
        local currentDebounceJobId = rcall('GET', deduplicationKey)
        -- TODO remove debounced event in next breaking change
        rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "debounced", "jobId",
            currentDebounceJobId, "debounceId", deduplicationId)
        rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "deduplicated", "jobId",
            currentDebounceJobId, "deduplicationId", deduplicationId, "deduplicatedJobId", jobId)
        return currentDebounceJobId
    end
end
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
local function removeDelayedJob(delayedKey, deduplicationKey, eventsKey, maxEvents, currentDeduplicatedJobId,
    jobId, deduplicationId, prefix)
    if rcall("ZREM", delayedKey, currentDeduplicatedJobId) > 0 then
        removeJobKeys(prefix .. currentDeduplicatedJobId)
        rcall("XADD", eventsKey, "*", "event", "removed", "jobId", currentDeduplicatedJobId,
            "prev", "delayed")
        -- TODO remove debounced event in next breaking change
        rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "debounced", "jobId",
            jobId, "debounceId", deduplicationId)
        rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "deduplicated", "jobId",
            jobId, "deduplicationId", deduplicationId, "deduplicatedJobId", currentDeduplicatedJobId)
        return true
    end
    return false
end
local function deduplicateJob(deduplicationOpts, jobId, delayedKey, deduplicationKey, eventsKey, maxEvents,
    prefix)
    local deduplicationId = deduplicationOpts and deduplicationOpts['id']
    if deduplicationId then
        if deduplicationOpts['replace'] then
            local ttl = deduplicationOpts['ttl']
            if ttl and ttl > 0 then
                local currentDebounceJobId = rcall('GET', deduplicationKey)
                if currentDebounceJobId then
                    local isRemoved = removeDelayedJob(delayedKey, deduplicationKey, eventsKey, maxEvents,
                        currentDebounceJobId, jobId, deduplicationId, prefix)
                    if isRemoved then
                        if deduplicationOpts['extend'] then
                            rcall('SET', deduplicationKey, jobId, 'PX', ttl)
                        else
                            rcall('SET', deduplicationKey, jobId, 'KEEPTTL')
                        end
                        return
                    else
                        return currentDebounceJobId
                    end
                else
                    rcall('SET', deduplicationKey, jobId, 'PX', ttl)
                    return
                end
            else
                local currentDebounceJobId = rcall('GET', deduplicationKey)
                if currentDebounceJobId then
                    local isRemoved = removeDelayedJob(delayedKey, deduplicationKey, eventsKey, maxEvents,
                        currentDebounceJobId, jobId, deduplicationId, prefix)
                    if isRemoved then
                        rcall('SET', deduplicationKey, jobId)
                        return
                    else
                        return currentDebounceJobId
                    end
                else
                    rcall('SET', deduplicationKey, jobId)
                    return
                end
            end
        else
            return deduplicateJobWithoutReplace(deduplicationId, deduplicationOpts,
                jobId, deduplicationKey, eventsKey, maxEvents)
        end
    end
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
--[[
  Function to handle the case when job is duplicated.
]]
-- Includes
--[[
    This function is used to update the parent's dependencies if the job
    is already completed and about to be ignored. The parent must get its
    dependencies updated to avoid the parent job being stuck forever in 
    the waiting-children state.
]]
-- Includes
--[[
  Validate and move or add dependencies to parent.
]]
-- Includes
--[[
  Validate and move parent to a wait status (waiting, delayed or prioritized)
  if no pending dependencies.
]]
-- Includes
--[[
  Validate and move parent to a wait status (waiting, delayed or prioritized) if needed.
]]
-- Includes
--[[
  Move parent to a wait status (wait, prioritized or delayed)
]]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Function to get priority score.
]]
local function getPriorityScore(priority, priorityCounterKey)
  local prioCounter = rcall("INCR", priorityCounterKey)
  return priority * 0x100000000 + prioCounter % 0x100000000
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey,
  isPausedOrMaxed)
  local score = getPriorityScore(priority, priorityCounterKey)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to check if queue is paused or maxed
  (since an empty list and !EXISTS are not really the same).
]]
local function isQueuePausedOrMaxed(queueMetaKey, activeKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      return activeCount >= tonumber(queueAttributes[2])
    end
  end
  return false
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
local function moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    local parentWaitKey = parentQueueKey .. ":wait"
    local parentPausedKey = parentQueueKey .. ":paused"
    local parentActiveKey = parentQueueKey .. ":active"
    local parentMetaKey = parentQueueKey .. ":meta"
    local parentMarkerKey = parentQueueKey .. ":marker"
    local jobAttributes = rcall("HMGET", parentKey, "priority", "delay")
    local priority = tonumber(jobAttributes[1]) or 0
    local delay = tonumber(jobAttributes[2]) or 0
    if delay > 0 then
        local delayedTimestamp = tonumber(timestamp) + delay
        local score = delayedTimestamp * 0x1000
        local parentDelayedKey = parentQueueKey .. ":delayed"
        rcall("ZADD", parentDelayedKey, score, parentId)
        rcall("XADD", parentQueueKey .. ":events", "*", "event", "delayed", "jobId", parentId, "delay",
            delayedTimestamp)
        addDelayMarkerIfNeeded(parentMarkerKey, parentDelayedKey)
    else
        if priority == 0 then
            local parentTarget, isParentPausedOrMaxed = getTargetQueueList(parentMetaKey, parentActiveKey,
                parentWaitKey, parentPausedKey)
            addJobInTargetList(parentTarget, parentMarkerKey, "RPUSH", isParentPausedOrMaxed, parentId)
        else
            local isPausedOrMaxed = isQueuePausedOrMaxed(parentMetaKey, parentActiveKey)
            addJobWithPriority(parentMarkerKey, parentQueueKey .. ":prioritized", priority, parentId,
                parentQueueKey .. ":pc", isPausedOrMaxed)
        end
        rcall("XADD", parentQueueKey .. ":events", "*", "event", "waiting", "jobId", parentId, "prev",
            "waiting-children")
    end
end
local function moveParentToWaitIfNeeded(parentQueueKey, parentKey, parentId, timestamp)
  if rcall("EXISTS", parentKey) == 1 then
    local parentWaitingChildrenKey = parentQueueKey .. ":waiting-children"
    if rcall("ZSCORE", parentWaitingChildrenKey, parentId) then    
      rcall("ZREM", parentWaitingChildrenKey, parentId)
      moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    end
  end
end
local function moveParentToWaitIfNoPendingDependencies(parentQueueKey, parentDependenciesKey, parentKey,
  parentId, timestamp)
  local doNotHavePendingDependencies = rcall("SCARD", parentDependenciesKey) == 0
  if doNotHavePendingDependencies then
    moveParentToWaitIfNeeded(parentQueueKey, parentKey, parentId, timestamp)
  end
end
local function updateParentDepsIfNeeded(parentKey, parentQueueKey, parentDependenciesKey,
  parentId, jobIdKey, returnvalue, timestamp )
  local processedSet = parentKey .. ":processed"
  rcall("HSET", processedSet, jobIdKey, returnvalue)
  moveParentToWaitIfNoPendingDependencies(parentQueueKey, parentDependenciesKey, parentKey, parentId, timestamp)
end
local function updateExistingJobsParent(parentKey, parent, parentData,
                                        parentDependenciesKey, completedKey,
                                        jobIdKey, jobId, timestamp)
    if parentKey ~= nil then
        if rcall("ZSCORE", completedKey, jobId) then
            local returnvalue = rcall("HGET", jobIdKey, "returnvalue")
            updateParentDepsIfNeeded(parentKey, parent['queueKey'],
                                     parentDependenciesKey, parent['id'],
                                     jobIdKey, returnvalue, timestamp)
        else
            if parentDependenciesKey ~= nil then
                rcall("SADD", parentDependenciesKey, jobIdKey)
            end
        end
        rcall("HMSET", jobIdKey, "parentKey", parentKey, "parent", parentData)
    end
end
local function handleDuplicatedJob(jobKey, jobId, currentParentKey, currentParent,
  parentData, parentDependenciesKey, completedKey, eventsKey, maxEvents, timestamp)
  local existedParentKey = rcall("HGET", jobKey, "parentKey")
  if not existedParentKey or existedParentKey == currentParentKey then
    updateExistingJobsParent(currentParentKey, currentParent, parentData,
      parentDependenciesKey, completedKey, jobKey,
      jobId, timestamp)
  else
    if currentParentKey ~= nil and currentParentKey ~= existedParentKey
      and (rcall("EXISTS", existedParentKey) == 1) then
      return -7
    end
  end
  rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event",
    "duplicated", "jobId", jobId)
  return jobId .. "" -- convert to string
end
--[[
  Function to store a job
]]
local function storeJob(eventsKey, jobIdKey, jobId, name, data, opts, timestamp,
                        parentKey, parentData, repeatJobKey)
    local jsonOpts = cjson.encode(opts)
    local delay = opts['delay'] or 0
    local priority = opts['priority'] or 0
    local debounceId = opts['de'] and opts['de']['id']
    local optionalValues = {}
    if parentKey ~= nil then
        table.insert(optionalValues, "parentKey")
        table.insert(optionalValues, parentKey)
        table.insert(optionalValues, "parent")
        table.insert(optionalValues, parentData)
    end
    if repeatJobKey then
        table.insert(optionalValues, "rjk")
        table.insert(optionalValues, repeatJobKey)
    end
    if debounceId then
        table.insert(optionalValues, "deid")
        table.insert(optionalValues, debounceId)
    end
    rcall("HMSET", jobIdKey, "name", name, "data", data, "opts", jsonOpts,
          "timestamp", timestamp, "delay", delay, "priority", priority,
          unpack(optionalValues))
    rcall("XADD", eventsKey, "*", "event", "added", "jobId", jobId, "name", name)
    return delay, priority
end
if parentKey ~= nil then
    if rcall("EXISTS", parentKey) ~= 1 then return -5 end
    parentData = cjson.encode(parent)
end
local jobCounter = rcall("INCR", idKey)
local maxEvents = getOrSetMaxEvents(metaKey)
local opts = cmsgpack.unpack(ARGV[3])
local parentDependenciesKey = args[6]
local timestamp = args[4]
if args[2] == "" then
    jobId = jobCounter
    jobIdKey = args[1] .. jobId
else
    jobId = args[2]
    jobIdKey = args[1] .. jobId
    if rcall("EXISTS", jobIdKey) == 1 then
        return handleDuplicatedJob(jobIdKey, jobId, parentKey, parent,
            parentData, parentDependenciesKey, completedKey, eventsKey,
            maxEvents, timestamp)
    end
end
local deduplicationJobId = deduplicateJob(opts['de'], jobId, delayedKey, deduplicationKey,
  eventsKey, maxEvents, args[1])
if deduplicationJobId then
  return deduplicationJobId
end
local delay, priority = storeJob(eventsKey, jobIdKey, jobId, args[3], ARGV[2],
    opts, timestamp, parentKey, parentData, repeatJobKey)
addDelayedJob(jobId, delayedKey, eventsKey, timestamp, maxEvents, KEYS[1], delay)
-- Check if this job is a child of another job, if so add it to the parents dependencies
if parentDependenciesKey ~= nil then
    rcall("SADD", parentDependenciesKey, jobIdKey)
end
return jobId .. "" -- convert to string
`,keys:6},m={name:"addJobScheduler",content:`--[[
  Adds a job scheduler, i.e. a job factory that creates jobs based on a given schedule (repeat options).
    Input:
      KEYS[1]  'repeat' key
      KEYS[2]  'delayed' key
      KEYS[3]  'wait' key
      KEYS[4]  'paused' key
      KEYS[5]  'meta' key
      KEYS[6]  'prioritized' key
      KEYS[7]  'marker' key
      KEYS[8]  'id' key
      KEYS[9]  'events' key
      KEYS[10] 'pc' priority counter
      KEYS[11] 'active' key
      ARGV[1] next milliseconds
      ARGV[2] msgpacked options
            [1]  name
            [2]  tz?
            [3]  pattern?
            [4]  endDate?
            [5]  every?
      ARGV[3] jobs scheduler id
      ARGV[4] Json stringified template data
      ARGV[5] mspacked template opts
      ARGV[6] msgpacked delayed opts
      ARGV[7] timestamp
      ARGV[8] prefix key
      ARGV[9] producer key
      Output:
        repeatableKey  - OK
]] local rcall = redis.call
local repeatKey = KEYS[1]
local delayedKey = KEYS[2]
local waitKey = KEYS[3]
local pausedKey = KEYS[4]
local metaKey = KEYS[5]
local prioritizedKey = KEYS[6]
local eventsKey = KEYS[9]
local nextMillis = ARGV[1]
local jobSchedulerId = ARGV[3]
local templateOpts = cmsgpack.unpack(ARGV[5])
local now = tonumber(ARGV[7])
local prefixKey = ARGV[8]
local jobOpts = cmsgpack.unpack(ARGV[6])
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Adds a delayed job to the queue by doing the following:
    - Creates a new job key with the job data.
    - adds to delayed zset.
    - Emits a global event 'delayed' if the job is delayed.
]]
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if nextTimestamp ~= nil then
      return nextTimestamp / 0x1000
    end
  end
end
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
  local nextTimestamp = getNextDelayedTimestamp(delayedKey)
  if nextTimestamp ~= nil then
    -- Replace the score of the marker with the newest known
    -- next timestamp.
    rcall("ZADD", markerKey, nextTimestamp, "1")
  end
end
--[[
  Bake in the job id first 12 bits into the timestamp
  to guarantee correct execution order of delayed jobs
  (up to 4096 jobs per given timestamp or 4096 jobs apart per timestamp)
  WARNING: Jobs that are so far apart that they wrap around will cause FIFO to fail
]]
local function getDelayedScore(delayedKey, timestamp, delay)
  local delayedTimestamp = (delay > 0 and (tonumber(timestamp) + delay)) or tonumber(timestamp)
  local minScore = delayedTimestamp * 0x1000
  local maxScore = (delayedTimestamp + 1 ) * 0x1000 - 1
  local result = rcall("ZREVRANGEBYSCORE", delayedKey, maxScore,
    minScore, "WITHSCORES","LIMIT", 0, 1)
  if #result then
    local currentMaxScore = tonumber(result[2])
    if currentMaxScore ~= nil then
      if currentMaxScore >= maxScore then
        return maxScore, delayedTimestamp
      else
        return currentMaxScore + 1, delayedTimestamp
      end
    end
  end
  return minScore, delayedTimestamp
end
local function addDelayedJob(jobId, delayedKey, eventsKey, timestamp,
  maxEvents, markerKey, delay)
  local score, delayedTimestamp = getDelayedScore(delayedKey, timestamp, tonumber(delay))
  rcall("ZADD", delayedKey, score, jobId)
  rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "delayed",
    "jobId", jobId, "delay", delayedTimestamp)
  -- mark that a delayed job is available
  addDelayMarkerIfNeeded(markerKey, delayedKey)
end
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
--[[
  Function to get priority score.
]]
local function getPriorityScore(priority, priorityCounterKey)
  local prioCounter = rcall("INCR", priorityCounterKey)
  return priority * 0x100000000 + prioCounter % 0x100000000
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey,
  isPausedOrMaxed)
  local score = getPriorityScore(priority, priorityCounterKey)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function isQueuePaused(queueMetaKey)
  return rcall("HEXISTS", queueMetaKey, "paused") == 1
end
--[[
  Function to store a job
]]
local function storeJob(eventsKey, jobIdKey, jobId, name, data, opts, timestamp,
                        parentKey, parentData, repeatJobKey)
    local jsonOpts = cjson.encode(opts)
    local delay = opts['delay'] or 0
    local priority = opts['priority'] or 0
    local debounceId = opts['de'] and opts['de']['id']
    local optionalValues = {}
    if parentKey ~= nil then
        table.insert(optionalValues, "parentKey")
        table.insert(optionalValues, parentKey)
        table.insert(optionalValues, "parent")
        table.insert(optionalValues, parentData)
    end
    if repeatJobKey then
        table.insert(optionalValues, "rjk")
        table.insert(optionalValues, repeatJobKey)
    end
    if debounceId then
        table.insert(optionalValues, "deid")
        table.insert(optionalValues, debounceId)
    end
    rcall("HMSET", jobIdKey, "name", name, "data", data, "opts", jsonOpts,
          "timestamp", timestamp, "delay", delay, "priority", priority,
          unpack(optionalValues))
    rcall("XADD", eventsKey, "*", "event", "added", "jobId", jobId, "name", name)
    return delay, priority
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
local function addJobFromScheduler(jobKey, jobId, opts, waitKey, pausedKey, activeKey, metaKey, 
  prioritizedKey, priorityCounter, delayedKey, markerKey, eventsKey, name, maxEvents, timestamp,
  data, jobSchedulerId, repeatDelay)
  opts['delay'] = repeatDelay
  opts['jobId'] = jobId
  local delay, priority = storeJob(eventsKey, jobKey, jobId, name, data,
    opts, timestamp, nil, nil, jobSchedulerId)
  if delay ~= 0 then
    addDelayedJob(jobId, delayedKey, eventsKey, timestamp, maxEvents, markerKey, delay)
  else
    local target, isPausedOrMaxed = getTargetQueueList(metaKey, activeKey, waitKey, pausedKey)
    -- Standard or priority add
    if priority == 0 then
      local pushCmd = opts['lifo'] and 'RPUSH' or 'LPUSH'
      addJobInTargetList(target, markerKey, pushCmd, isPausedOrMaxed, jobId)
    else
      -- Priority add
      addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounter, isPausedOrMaxed)
    end
    -- Emit waiting event
    rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents,  "*", "event", "waiting", "jobId", jobId)
  end
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
--[[
  Function to remove job.
]]
-- Includes
--[[
  Function to remove deduplication key if needed
  when a job is being removed.
]]
local function removeDeduplicationKeyIfNeededOnRemoval(prefixKey,
  jobId, deduplicationId)
  if deduplicationId then
    local deduplicationKey = prefixKey .. "de:" .. deduplicationId
    local currentJobId = rcall('GET', deduplicationKey)
    if currentJobId and currentJobId == jobId then
      return rcall("DEL", deduplicationKey)
    end
  end
end
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
--[[
  Check if this job has a parent. If so we will just remove it from
  the parent child list, but if it is the last child we should move the parent to "wait/paused"
  which requires code from "moveToFinished"
]]
-- Includes
--[[
  Functions to destructure job key.
  Just a bit of warning, these functions may be a bit slow and affect performance significantly.
]]
local getJobIdFromKey = function (jobKey)
  return string.match(jobKey, ".*:(.*)")
end
local getJobKeyPrefix = function (jobKey, jobId)
  return string.sub(jobKey, 0, #jobKey - #jobId)
end
local function _moveParentToWait(parentPrefix, parentId, emitEvent)
  local parentTarget, isPausedOrMaxed = getTargetQueueList(parentPrefix .. "meta", parentPrefix .. "active",
    parentPrefix .. "wait", parentPrefix .. "paused")
  addJobInTargetList(parentTarget, parentPrefix .. "marker", "RPUSH", isPausedOrMaxed, parentId)
  if emitEvent then
    local parentEventStream = parentPrefix .. "events"
    rcall("XADD", parentEventStream, "*", "event", "waiting", "jobId", parentId, "prev", "waiting-children")
  end
end
local function removeParentDependencyKey(jobKey, hard, parentKey, baseKey, debounceId)
  if parentKey then
    local parentDependenciesKey = parentKey .. ":dependencies"
    local result = rcall("SREM", parentDependenciesKey, jobKey)
    if result > 0 then
      local pendingDependencies = rcall("SCARD", parentDependenciesKey)
      if pendingDependencies == 0 then
        local parentId = getJobIdFromKey(parentKey)
        local parentPrefix = getJobKeyPrefix(parentKey, parentId)
        local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
        if numRemovedElements == 1 then
          if hard then -- remove parent in same queue
            if parentPrefix == baseKey then
              removeParentDependencyKey(parentKey, hard, nil, baseKey, nil)
              removeJobKeys(parentKey)
              if debounceId then
                rcall("DEL", parentPrefix .. "de:" .. debounceId)
              end
            else
              _moveParentToWait(parentPrefix, parentId)
            end
          else
            _moveParentToWait(parentPrefix, parentId, true)
          end
        end
      end
      return true
    end
  else
    local parentAttributes = rcall("HMGET", jobKey, "parentKey", "deid")
    local missedParentKey = parentAttributes[1]
    if( (type(missedParentKey) == "string") and missedParentKey ~= ""
      and (rcall("EXISTS", missedParentKey) == 1)) then
      local parentDependenciesKey = missedParentKey .. ":dependencies"
      local result = rcall("SREM", parentDependenciesKey, jobKey)
      if result > 0 then
        local pendingDependencies = rcall("SCARD", parentDependenciesKey)
        if pendingDependencies == 0 then
          local parentId = getJobIdFromKey(missedParentKey)
          local parentPrefix = getJobKeyPrefix(missedParentKey, parentId)
          local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
          if numRemovedElements == 1 then
            if hard then
              if parentPrefix == baseKey then
                removeParentDependencyKey(missedParentKey, hard, nil, baseKey, nil)
                removeJobKeys(missedParentKey)
                if parentAttributes[2] then
                  rcall("DEL", parentPrefix .. "de:" .. parentAttributes[2])
                end
              else
                _moveParentToWait(parentPrefix, parentId)
              end
            else
              _moveParentToWait(parentPrefix, parentId, true)
            end
          end
        end
        return true
      end
    end
  end
  return false
end
local function removeJob(jobId, hard, baseKey, shouldRemoveDeduplicationKey)
  local jobKey = baseKey .. jobId
  removeParentDependencyKey(jobKey, hard, nil, baseKey)
  if shouldRemoveDeduplicationKey then
    local deduplicationId = rcall("HGET", jobKey, "deid")
    removeDeduplicationKeyIfNeededOnRemoval(baseKey, jobId, deduplicationId)
  end
  removeJobKeys(jobKey)
end
--[[
  Function to store a job scheduler
]]
local function storeJobScheduler(schedulerId, schedulerKey, repeatKey, nextMillis, opts,
  templateData, templateOpts)
  rcall("ZADD", repeatKey, nextMillis, schedulerId)
  local optionalValues = {}
  if opts['tz'] then
    table.insert(optionalValues, "tz")
    table.insert(optionalValues, opts['tz'])
  end
  if opts['limit'] then
    table.insert(optionalValues, "limit")
    table.insert(optionalValues, opts['limit'])
  end
  if opts['pattern'] then
    table.insert(optionalValues, "pattern")
    table.insert(optionalValues, opts['pattern'])
  end
  if opts['startDate'] then
    table.insert(optionalValues, "startDate")
    table.insert(optionalValues, opts['startDate'])
  end
  if opts['endDate'] then
    table.insert(optionalValues, "endDate")
    table.insert(optionalValues, opts['endDate'])
  end
  if opts['every'] then
    table.insert(optionalValues, "every")
    table.insert(optionalValues, opts['every'])
  end
  if opts['offset'] then
    table.insert(optionalValues, "offset")
    table.insert(optionalValues, opts['offset'])
  else
    local offset = rcall("HGET", schedulerKey, "offset")
    if offset then
      table.insert(optionalValues, "offset")
      table.insert(optionalValues, tonumber(offset))
    end
  end
  local jsonTemplateOpts = cjson.encode(templateOpts)
  if jsonTemplateOpts and jsonTemplateOpts ~= '{}' then
    table.insert(optionalValues, "opts")
    table.insert(optionalValues, jsonTemplateOpts)
  end
  if templateData and templateData ~= '{}' then
    table.insert(optionalValues, "data")
    table.insert(optionalValues, templateData)
  end
  table.insert(optionalValues, "ic")
  table.insert(optionalValues, rcall("HGET", schedulerKey, "ic") or 1)
  rcall("DEL", schedulerKey) -- remove all attributes and then re-insert new ones
  rcall("HMSET", schedulerKey, "name", opts['name'], unpack(optionalValues))
end
local function getJobSchedulerEveryNextMillis(prevMillis, every, now, offset, startDate)
    local nextMillis
    if not prevMillis then
        if startDate then
            -- Assuming startDate is passed as milliseconds from JavaScript
            nextMillis = tonumber(startDate)
            nextMillis = nextMillis > now and nextMillis or now
        else
            nextMillis = now
        end
    else
        nextMillis = prevMillis + every
        -- check if we may have missed some iterations
        if nextMillis < now then
            nextMillis = math.floor(now / every) * every + every + (offset or 0)
        end
    end
    if not offset or offset == 0 then
        local timeSlot = math.floor(nextMillis / every) * every;
        offset = nextMillis - timeSlot;
    end
    -- Return a tuple nextMillis, offset
    return math.floor(nextMillis), math.floor(offset)
end
-- If we are overriding a repeatable job we must delete the delayed job for
-- the next iteration.
local schedulerKey = repeatKey .. ":" .. jobSchedulerId
local maxEvents = getOrSetMaxEvents(metaKey)
local templateData = ARGV[4]
local prevMillis = rcall("ZSCORE", repeatKey, jobSchedulerId)
if prevMillis then
    prevMillis = tonumber(prevMillis)
end
local schedulerOpts = cmsgpack.unpack(ARGV[2])
local every = schedulerOpts['every']
-- For backwards compatibility we also check the offset from the job itself.
-- could be removed in future major versions.
local jobOffset = jobOpts['repeat'] and jobOpts['repeat']['offset'] or 0
local offset = schedulerOpts['offset'] or jobOffset or 0
local newOffset = offset
local updatedEvery = false
if every then
    -- if we changed the 'every' value we need to reset millis to nil
    local millis = prevMillis
    if prevMillis then
        local prevEvery = tonumber(rcall("HGET", schedulerKey, "every"))
        if prevEvery ~= every then
            millis = nil
            updatedEvery = true
        end
    end
    local startDate = schedulerOpts['startDate']
    nextMillis, newOffset = getJobSchedulerEveryNextMillis(millis, every, now, offset, startDate)
end
local function removeJobFromScheduler(prefixKey, delayedKey, prioritizedKey, waitKey, pausedKey, jobId, metaKey,
    eventsKey)
    if rcall("ZSCORE", delayedKey, jobId) then
        removeJob(jobId, true, prefixKey, true --[[remove debounce key]] )
        rcall("ZREM", delayedKey, jobId)
        return true
    elseif rcall("ZSCORE", prioritizedKey, jobId) then
        removeJob(jobId, true, prefixKey, true --[[remove debounce key]] )
        rcall("ZREM", prioritizedKey, jobId)
        return true
    else
        local pausedOrWaitKey = waitKey
        if isQueuePaused(metaKey) then
            pausedOrWaitKey = pausedKey
        end
        if rcall("LREM", pausedOrWaitKey, 1, jobId) > 0 then
            removeJob(jobId, true, prefixKey, true --[[remove debounce key]] )
            return true
        end
    end
    return false
end
local removedPrevJob = false
if prevMillis then
    local currentJobId = "repeat:" .. jobSchedulerId .. ":" .. prevMillis
    local currentJobKey = schedulerKey .. ":" .. prevMillis
    -- In theory it should always exist the currentJobKey if there is a prevMillis unless something has
    -- gone really wrong.
    if rcall("EXISTS", currentJobKey) == 1 then
        removedPrevJob = removeJobFromScheduler(prefixKey, delayedKey, prioritizedKey, waitKey, pausedKey, currentJobId,
            metaKey, eventsKey)
    end
end
if removedPrevJob then
    -- The jobs has been removed and we want to replace it, so lets use the same millis.
    if every and not updatedEvery then
        nextMillis = prevMillis
    end
else
    -- Special case where no job was removed, and we need to add the next iteration.
    schedulerOpts['offset'] = newOffset
end
-- Check for job ID collision with existing jobs (in any state)
local jobId = "repeat:" .. jobSchedulerId .. ":" .. nextMillis
local jobKey = prefixKey .. jobId
-- If there's already a job with this ID, in a state 
-- that is not updatable (active, completed, failed) we must 
-- handle the collision
local hasCollision = false
if rcall("EXISTS", jobKey) == 1 then
    if every then
        -- For 'every' case: try next time slot to avoid collision
        local nextSlotMillis = nextMillis + every
        local nextSlotJobId = "repeat:" .. jobSchedulerId .. ":" .. nextSlotMillis
        local nextSlotJobKey = prefixKey .. nextSlotJobId
        if rcall("EXISTS", nextSlotJobKey) == 0 then
            -- Next slot is free, use it
            nextMillis = nextSlotMillis
            jobId = nextSlotJobId
        else
            -- Next slot also has a job, return error code
            return -11 -- SchedulerJobSlotsBusy
        end
    else
        hasCollision = true
    end
end
local delay = nextMillis - now
-- Fast Clamp delay to minimum of 0
if delay < 0 then
    delay = 0
end
local nextJobKey = schedulerKey .. ":" .. nextMillis
if not hasCollision or removedPrevJob then
    -- jobId already calculated above during collision check
    storeJobScheduler(jobSchedulerId, schedulerKey, repeatKey, nextMillis, schedulerOpts, templateData, templateOpts)
    rcall("INCR", KEYS[8])
    addJobFromScheduler(nextJobKey, jobId, jobOpts, waitKey, pausedKey, KEYS[11], metaKey, prioritizedKey, KEYS[10],
        delayedKey, KEYS[7], eventsKey, schedulerOpts['name'], maxEvents, now, templateData, jobSchedulerId, delay)
elseif hasCollision then
    -- For 'pattern' case: return error code
    return -10 -- SchedulerJobIdCollision
end
if ARGV[9] ~= "" then
    rcall("HSET", ARGV[9], "nrjid", jobId)
end
return {jobId .. "", delay}
`,keys:11},n={name:"addLog",content:`--[[
  Add job log
  Input:
    KEYS[1] job id key
    KEYS[2] job logs key
    ARGV[1] id
    ARGV[2] log
    ARGV[3] keepLogs
  Output:
    -1 - Missing job.
]]
local rcall = redis.call
if rcall("EXISTS", KEYS[1]) == 1 then -- // Make sure job exists
  local logCount = rcall("RPUSH", KEYS[2], ARGV[2])
  if ARGV[3] ~= '' then
    local keepLogs = tonumber(ARGV[3])
    rcall("LTRIM", KEYS[2], -keepLogs, -1)
    return math.min(keepLogs, logCount)
  end
  return logCount
else
  return -1
end
`,keys:2},o={name:"addParentJob",content:`--[[
  Adds a parent job to the queue by doing the following:
    - Increases the job counter if needed.
    - Creates a new job key with the job data.
    - adds the job to the waiting-children zset
    Input:
      KEYS[1] 'meta'
      KEYS[2] 'id'
      KEYS[3] 'delayed'
      KEYS[4] 'waiting-children'
      KEYS[5] 'completed'
      KEYS[6] events stream key
      ARGV[1] msgpacked arguments array
            [1]  key prefix,
            [2]  custom id (will not generate one automatically)
            [3]  name
            [4]  timestamp
            [5]  parentKey?
            [6]  parent dependencies key.
            [7]  parent? {id, queueKey}
            [8]  repeat job key
            [9] deduplication key
      ARGV[2] Json stringified job data
      ARGV[3] msgpacked options
      Output:
        jobId  - OK
        -5     - Missing parent key
]]
local metaKey = KEYS[1]
local idKey = KEYS[2]
local delayedKey = KEYS[3]
local completedKey = KEYS[5]
local eventsKey = KEYS[6]
local jobId
local jobIdKey
local rcall = redis.call
local args = cmsgpack.unpack(ARGV[1])
local data = ARGV[2]
local opts = cmsgpack.unpack(ARGV[3])
local parentKey = args[5]
local parent = args[7]
local repeatJobKey = args[8]
local deduplicationKey = args[9]
local parentData
-- Includes
--[[
  Function to deduplicate a job.
]]
local function deduplicateJobWithoutReplace(deduplicationId, deduplicationOpts, jobId, deduplicationKey,
    eventsKey, maxEvents)
    local ttl = deduplicationOpts['ttl']
    local deduplicationKeyExists
    if ttl and ttl > 0 then
        if deduplicationOpts['extend'] then
            local currentDebounceJobId = rcall('GET', deduplicationKey)
            if currentDebounceJobId then
                rcall('SET', deduplicationKey, currentDebounceJobId, 'PX', ttl)
                rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "debounced",
                    "jobId", currentDebounceJobId, "debounceId", deduplicationId)
                rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "deduplicated", "jobId",
                    currentDebounceJobId, "deduplicationId", deduplicationId, "deduplicatedJobId", jobId)
                return currentDebounceJobId
            else
                rcall('SET', deduplicationKey, jobId, 'PX', ttl)
                return
            end
        else
            deduplicationKeyExists = not rcall('SET', deduplicationKey, jobId, 'PX', ttl, 'NX')
        end
    else
        deduplicationKeyExists = not rcall('SET', deduplicationKey, jobId, 'NX')
    end
    if deduplicationKeyExists then
        local currentDebounceJobId = rcall('GET', deduplicationKey)
        -- TODO remove debounced event in next breaking change
        rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "debounced", "jobId",
            currentDebounceJobId, "debounceId", deduplicationId)
        rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "deduplicated", "jobId",
            currentDebounceJobId, "deduplicationId", deduplicationId, "deduplicatedJobId", jobId)
        return currentDebounceJobId
    end
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
--[[
  Function to handle the case when job is duplicated.
]]
-- Includes
--[[
    This function is used to update the parent's dependencies if the job
    is already completed and about to be ignored. The parent must get its
    dependencies updated to avoid the parent job being stuck forever in 
    the waiting-children state.
]]
-- Includes
--[[
  Validate and move or add dependencies to parent.
]]
-- Includes
--[[
  Validate and move parent to a wait status (waiting, delayed or prioritized)
  if no pending dependencies.
]]
-- Includes
--[[
  Validate and move parent to a wait status (waiting, delayed or prioritized) if needed.
]]
-- Includes
--[[
  Move parent to a wait status (wait, prioritized or delayed)
]]
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if nextTimestamp ~= nil then
      return nextTimestamp / 0x1000
    end
  end
end
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
  local nextTimestamp = getNextDelayedTimestamp(delayedKey)
  if nextTimestamp ~= nil then
    -- Replace the score of the marker with the newest known
    -- next timestamp.
    rcall("ZADD", markerKey, nextTimestamp, "1")
  end
end
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Function to get priority score.
]]
local function getPriorityScore(priority, priorityCounterKey)
  local prioCounter = rcall("INCR", priorityCounterKey)
  return priority * 0x100000000 + prioCounter % 0x100000000
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey,
  isPausedOrMaxed)
  local score = getPriorityScore(priority, priorityCounterKey)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to check if queue is paused or maxed
  (since an empty list and !EXISTS are not really the same).
]]
local function isQueuePausedOrMaxed(queueMetaKey, activeKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      return activeCount >= tonumber(queueAttributes[2])
    end
  end
  return false
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
local function moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    local parentWaitKey = parentQueueKey .. ":wait"
    local parentPausedKey = parentQueueKey .. ":paused"
    local parentActiveKey = parentQueueKey .. ":active"
    local parentMetaKey = parentQueueKey .. ":meta"
    local parentMarkerKey = parentQueueKey .. ":marker"
    local jobAttributes = rcall("HMGET", parentKey, "priority", "delay")
    local priority = tonumber(jobAttributes[1]) or 0
    local delay = tonumber(jobAttributes[2]) or 0
    if delay > 0 then
        local delayedTimestamp = tonumber(timestamp) + delay
        local score = delayedTimestamp * 0x1000
        local parentDelayedKey = parentQueueKey .. ":delayed"
        rcall("ZADD", parentDelayedKey, score, parentId)
        rcall("XADD", parentQueueKey .. ":events", "*", "event", "delayed", "jobId", parentId, "delay",
            delayedTimestamp)
        addDelayMarkerIfNeeded(parentMarkerKey, parentDelayedKey)
    else
        if priority == 0 then
            local parentTarget, isParentPausedOrMaxed = getTargetQueueList(parentMetaKey, parentActiveKey,
                parentWaitKey, parentPausedKey)
            addJobInTargetList(parentTarget, parentMarkerKey, "RPUSH", isParentPausedOrMaxed, parentId)
        else
            local isPausedOrMaxed = isQueuePausedOrMaxed(parentMetaKey, parentActiveKey)
            addJobWithPriority(parentMarkerKey, parentQueueKey .. ":prioritized", priority, parentId,
                parentQueueKey .. ":pc", isPausedOrMaxed)
        end
        rcall("XADD", parentQueueKey .. ":events", "*", "event", "waiting", "jobId", parentId, "prev",
            "waiting-children")
    end
end
local function moveParentToWaitIfNeeded(parentQueueKey, parentKey, parentId, timestamp)
  if rcall("EXISTS", parentKey) == 1 then
    local parentWaitingChildrenKey = parentQueueKey .. ":waiting-children"
    if rcall("ZSCORE", parentWaitingChildrenKey, parentId) then    
      rcall("ZREM", parentWaitingChildrenKey, parentId)
      moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    end
  end
end
local function moveParentToWaitIfNoPendingDependencies(parentQueueKey, parentDependenciesKey, parentKey,
  parentId, timestamp)
  local doNotHavePendingDependencies = rcall("SCARD", parentDependenciesKey) == 0
  if doNotHavePendingDependencies then
    moveParentToWaitIfNeeded(parentQueueKey, parentKey, parentId, timestamp)
  end
end
local function updateParentDepsIfNeeded(parentKey, parentQueueKey, parentDependenciesKey,
  parentId, jobIdKey, returnvalue, timestamp )
  local processedSet = parentKey .. ":processed"
  rcall("HSET", processedSet, jobIdKey, returnvalue)
  moveParentToWaitIfNoPendingDependencies(parentQueueKey, parentDependenciesKey, parentKey, parentId, timestamp)
end
local function updateExistingJobsParent(parentKey, parent, parentData,
                                        parentDependenciesKey, completedKey,
                                        jobIdKey, jobId, timestamp)
    if parentKey ~= nil then
        if rcall("ZSCORE", completedKey, jobId) then
            local returnvalue = rcall("HGET", jobIdKey, "returnvalue")
            updateParentDepsIfNeeded(parentKey, parent['queueKey'],
                                     parentDependenciesKey, parent['id'],
                                     jobIdKey, returnvalue, timestamp)
        else
            if parentDependenciesKey ~= nil then
                rcall("SADD", parentDependenciesKey, jobIdKey)
            end
        end
        rcall("HMSET", jobIdKey, "parentKey", parentKey, "parent", parentData)
    end
end
local function handleDuplicatedJob(jobKey, jobId, currentParentKey, currentParent,
  parentData, parentDependenciesKey, completedKey, eventsKey, maxEvents, timestamp)
  local existedParentKey = rcall("HGET", jobKey, "parentKey")
  if not existedParentKey or existedParentKey == currentParentKey then
    updateExistingJobsParent(currentParentKey, currentParent, parentData,
      parentDependenciesKey, completedKey, jobKey,
      jobId, timestamp)
  else
    if currentParentKey ~= nil and currentParentKey ~= existedParentKey
      and (rcall("EXISTS", existedParentKey) == 1) then
      return -7
    end
  end
  rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event",
    "duplicated", "jobId", jobId)
  return jobId .. "" -- convert to string
end
--[[
  Function to store a job
]]
local function storeJob(eventsKey, jobIdKey, jobId, name, data, opts, timestamp,
                        parentKey, parentData, repeatJobKey)
    local jsonOpts = cjson.encode(opts)
    local delay = opts['delay'] or 0
    local priority = opts['priority'] or 0
    local debounceId = opts['de'] and opts['de']['id']
    local optionalValues = {}
    if parentKey ~= nil then
        table.insert(optionalValues, "parentKey")
        table.insert(optionalValues, parentKey)
        table.insert(optionalValues, "parent")
        table.insert(optionalValues, parentData)
    end
    if repeatJobKey then
        table.insert(optionalValues, "rjk")
        table.insert(optionalValues, repeatJobKey)
    end
    if debounceId then
        table.insert(optionalValues, "deid")
        table.insert(optionalValues, debounceId)
    end
    rcall("HMSET", jobIdKey, "name", name, "data", data, "opts", jsonOpts,
          "timestamp", timestamp, "delay", delay, "priority", priority,
          unpack(optionalValues))
    rcall("XADD", eventsKey, "*", "event", "added", "jobId", jobId, "name", name)
    return delay, priority
end
if parentKey ~= nil then
    if rcall("EXISTS", parentKey) ~= 1 then return -5 end
    parentData = cjson.encode(parent)
end
local jobCounter = rcall("INCR", idKey)
local maxEvents = getOrSetMaxEvents(metaKey)
local parentDependenciesKey = args[6]
local timestamp = args[4]
if args[2] == "" then
    jobId = jobCounter
    jobIdKey = args[1] .. jobId
else
    jobId = args[2]
    jobIdKey = args[1] .. jobId
    if rcall("EXISTS", jobIdKey) == 1 then
        return handleDuplicatedJob(jobIdKey, jobId, parentKey, parent,
            parentData, parentDependenciesKey, completedKey, eventsKey,
            maxEvents, timestamp)
    end
end
local deduplicationId = opts['de'] and opts['de']['id']
if deduplicationId then
    local deduplicationJobId = deduplicateJobWithoutReplace(deduplicationId, opts['de'],
        jobId, deduplicationKey, eventsKey, maxEvents)
    if deduplicationJobId then
        return deduplicationJobId
    end
end
-- Store the job.
storeJob(eventsKey, jobIdKey, jobId, args[3], ARGV[2], opts, timestamp,
         parentKey, parentData, repeatJobKey)
local waitChildrenKey = KEYS[4]
rcall("ZADD", waitChildrenKey, timestamp, jobId)
rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event",
      "waiting-children", "jobId", jobId)
-- Check if this job is a child of another job, if so add it to the parents dependencies
if parentDependenciesKey ~= nil then
    rcall("SADD", parentDependenciesKey, jobIdKey)
end
return jobId .. "" -- convert to string
`,keys:6},p={name:"addPrioritizedJob",content:`--[[
  Adds a priotitized job to the queue by doing the following:
    - Increases the job counter if needed.
    - Creates a new job key with the job data.
    - Adds the job to the "added" list so that workers gets notified.
    Input:
      KEYS[1] 'marker',
      KEYS[2] 'meta'
      KEYS[3] 'id'
      KEYS[4] 'prioritized'
      KEYS[5] 'delayed'
      KEYS[6] 'completed'
      KEYS[7] 'active'
      KEYS[8] events stream key
      KEYS[9] 'pc' priority counter
      ARGV[1] msgpacked arguments array
            [1]  key prefix,
            [2]  custom id (will not generate one automatically)
            [3]  name
            [4]  timestamp
            [5]  parentKey?
            [6]  parent dependencies key.
            [7]  parent? {id, queueKey}
            [8]  repeat job key
            [9] deduplication key
      ARGV[2] Json stringified job data
      ARGV[3] msgpacked options
      Output:
        jobId  - OK
        -5     - Missing parent key
]] 
local metaKey = KEYS[2]
local idKey = KEYS[3]
local priorityKey = KEYS[4]
local completedKey = KEYS[6]
local activeKey = KEYS[7]
local eventsKey = KEYS[8]
local priorityCounterKey = KEYS[9]
local jobId
local jobIdKey
local rcall = redis.call
local args = cmsgpack.unpack(ARGV[1])
local data = ARGV[2]
local opts = cmsgpack.unpack(ARGV[3])
local parentKey = args[5]
local parent = args[7]
local repeatJobKey = args[8]
local deduplicationKey = args[9]
local parentData
-- Includes
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
--[[
  Function to get priority score.
]]
local function getPriorityScore(priority, priorityCounterKey)
  local prioCounter = rcall("INCR", priorityCounterKey)
  return priority * 0x100000000 + prioCounter % 0x100000000
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey,
  isPausedOrMaxed)
  local score = getPriorityScore(priority, priorityCounterKey)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to debounce a job.
]]
-- Includes
--[[
  Function to deduplicate a job.
]]
local function deduplicateJobWithoutReplace(deduplicationId, deduplicationOpts, jobId, deduplicationKey,
    eventsKey, maxEvents)
    local ttl = deduplicationOpts['ttl']
    local deduplicationKeyExists
    if ttl and ttl > 0 then
        if deduplicationOpts['extend'] then
            local currentDebounceJobId = rcall('GET', deduplicationKey)
            if currentDebounceJobId then
                rcall('SET', deduplicationKey, currentDebounceJobId, 'PX', ttl)
                rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "debounced",
                    "jobId", currentDebounceJobId, "debounceId", deduplicationId)
                rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "deduplicated", "jobId",
                    currentDebounceJobId, "deduplicationId", deduplicationId, "deduplicatedJobId", jobId)
                return currentDebounceJobId
            else
                rcall('SET', deduplicationKey, jobId, 'PX', ttl)
                return
            end
        else
            deduplicationKeyExists = not rcall('SET', deduplicationKey, jobId, 'PX', ttl, 'NX')
        end
    else
        deduplicationKeyExists = not rcall('SET', deduplicationKey, jobId, 'NX')
    end
    if deduplicationKeyExists then
        local currentDebounceJobId = rcall('GET', deduplicationKey)
        -- TODO remove debounced event in next breaking change
        rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "debounced", "jobId",
            currentDebounceJobId, "debounceId", deduplicationId)
        rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "deduplicated", "jobId",
            currentDebounceJobId, "deduplicationId", deduplicationId, "deduplicatedJobId", jobId)
        return currentDebounceJobId
    end
end
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
local function removeDelayedJob(delayedKey, deduplicationKey, eventsKey, maxEvents, currentDeduplicatedJobId,
    jobId, deduplicationId, prefix)
    if rcall("ZREM", delayedKey, currentDeduplicatedJobId) > 0 then
        removeJobKeys(prefix .. currentDeduplicatedJobId)
        rcall("XADD", eventsKey, "*", "event", "removed", "jobId", currentDeduplicatedJobId,
            "prev", "delayed")
        -- TODO remove debounced event in next breaking change
        rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "debounced", "jobId",
            jobId, "debounceId", deduplicationId)
        rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "deduplicated", "jobId",
            jobId, "deduplicationId", deduplicationId, "deduplicatedJobId", currentDeduplicatedJobId)
        return true
    end
    return false
end
local function deduplicateJob(deduplicationOpts, jobId, delayedKey, deduplicationKey, eventsKey, maxEvents,
    prefix)
    local deduplicationId = deduplicationOpts and deduplicationOpts['id']
    if deduplicationId then
        if deduplicationOpts['replace'] then
            local ttl = deduplicationOpts['ttl']
            if ttl and ttl > 0 then
                local currentDebounceJobId = rcall('GET', deduplicationKey)
                if currentDebounceJobId then
                    local isRemoved = removeDelayedJob(delayedKey, deduplicationKey, eventsKey, maxEvents,
                        currentDebounceJobId, jobId, deduplicationId, prefix)
                    if isRemoved then
                        if deduplicationOpts['extend'] then
                            rcall('SET', deduplicationKey, jobId, 'PX', ttl)
                        else
                            rcall('SET', deduplicationKey, jobId, 'KEEPTTL')
                        end
                        return
                    else
                        return currentDebounceJobId
                    end
                else
                    rcall('SET', deduplicationKey, jobId, 'PX', ttl)
                    return
                end
            else
                local currentDebounceJobId = rcall('GET', deduplicationKey)
                if currentDebounceJobId then
                    local isRemoved = removeDelayedJob(delayedKey, deduplicationKey, eventsKey, maxEvents,
                        currentDebounceJobId, jobId, deduplicationId, prefix)
                    if isRemoved then
                        rcall('SET', deduplicationKey, jobId)
                        return
                    else
                        return currentDebounceJobId
                    end
                else
                    rcall('SET', deduplicationKey, jobId)
                    return
                end
            end
        else
            return deduplicateJobWithoutReplace(deduplicationId, deduplicationOpts,
                jobId, deduplicationKey, eventsKey, maxEvents)
        end
    end
end
--[[
  Function to store a job
]]
local function storeJob(eventsKey, jobIdKey, jobId, name, data, opts, timestamp,
                        parentKey, parentData, repeatJobKey)
    local jsonOpts = cjson.encode(opts)
    local delay = opts['delay'] or 0
    local priority = opts['priority'] or 0
    local debounceId = opts['de'] and opts['de']['id']
    local optionalValues = {}
    if parentKey ~= nil then
        table.insert(optionalValues, "parentKey")
        table.insert(optionalValues, parentKey)
        table.insert(optionalValues, "parent")
        table.insert(optionalValues, parentData)
    end
    if repeatJobKey then
        table.insert(optionalValues, "rjk")
        table.insert(optionalValues, repeatJobKey)
    end
    if debounceId then
        table.insert(optionalValues, "deid")
        table.insert(optionalValues, debounceId)
    end
    rcall("HMSET", jobIdKey, "name", name, "data", data, "opts", jsonOpts,
          "timestamp", timestamp, "delay", delay, "priority", priority,
          unpack(optionalValues))
    rcall("XADD", eventsKey, "*", "event", "added", "jobId", jobId, "name", name)
    return delay, priority
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
--[[
  Function to handle the case when job is duplicated.
]]
-- Includes
--[[
    This function is used to update the parent's dependencies if the job
    is already completed and about to be ignored. The parent must get its
    dependencies updated to avoid the parent job being stuck forever in 
    the waiting-children state.
]]
-- Includes
--[[
  Validate and move or add dependencies to parent.
]]
-- Includes
--[[
  Validate and move parent to a wait status (waiting, delayed or prioritized)
  if no pending dependencies.
]]
-- Includes
--[[
  Validate and move parent to a wait status (waiting, delayed or prioritized) if needed.
]]
-- Includes
--[[
  Move parent to a wait status (wait, prioritized or delayed)
]]
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if nextTimestamp ~= nil then
      return nextTimestamp / 0x1000
    end
  end
end
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
  local nextTimestamp = getNextDelayedTimestamp(delayedKey)
  if nextTimestamp ~= nil then
    -- Replace the score of the marker with the newest known
    -- next timestamp.
    rcall("ZADD", markerKey, nextTimestamp, "1")
  end
end
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to check if queue is paused or maxed
  (since an empty list and !EXISTS are not really the same).
]]
local function isQueuePausedOrMaxed(queueMetaKey, activeKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      return activeCount >= tonumber(queueAttributes[2])
    end
  end
  return false
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
local function moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    local parentWaitKey = parentQueueKey .. ":wait"
    local parentPausedKey = parentQueueKey .. ":paused"
    local parentActiveKey = parentQueueKey .. ":active"
    local parentMetaKey = parentQueueKey .. ":meta"
    local parentMarkerKey = parentQueueKey .. ":marker"
    local jobAttributes = rcall("HMGET", parentKey, "priority", "delay")
    local priority = tonumber(jobAttributes[1]) or 0
    local delay = tonumber(jobAttributes[2]) or 0
    if delay > 0 then
        local delayedTimestamp = tonumber(timestamp) + delay
        local score = delayedTimestamp * 0x1000
        local parentDelayedKey = parentQueueKey .. ":delayed"
        rcall("ZADD", parentDelayedKey, score, parentId)
        rcall("XADD", parentQueueKey .. ":events", "*", "event", "delayed", "jobId", parentId, "delay",
            delayedTimestamp)
        addDelayMarkerIfNeeded(parentMarkerKey, parentDelayedKey)
    else
        if priority == 0 then
            local parentTarget, isParentPausedOrMaxed = getTargetQueueList(parentMetaKey, parentActiveKey,
                parentWaitKey, parentPausedKey)
            addJobInTargetList(parentTarget, parentMarkerKey, "RPUSH", isParentPausedOrMaxed, parentId)
        else
            local isPausedOrMaxed = isQueuePausedOrMaxed(parentMetaKey, parentActiveKey)
            addJobWithPriority(parentMarkerKey, parentQueueKey .. ":prioritized", priority, parentId,
                parentQueueKey .. ":pc", isPausedOrMaxed)
        end
        rcall("XADD", parentQueueKey .. ":events", "*", "event", "waiting", "jobId", parentId, "prev",
            "waiting-children")
    end
end
local function moveParentToWaitIfNeeded(parentQueueKey, parentKey, parentId, timestamp)
  if rcall("EXISTS", parentKey) == 1 then
    local parentWaitingChildrenKey = parentQueueKey .. ":waiting-children"
    if rcall("ZSCORE", parentWaitingChildrenKey, parentId) then    
      rcall("ZREM", parentWaitingChildrenKey, parentId)
      moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    end
  end
end
local function moveParentToWaitIfNoPendingDependencies(parentQueueKey, parentDependenciesKey, parentKey,
  parentId, timestamp)
  local doNotHavePendingDependencies = rcall("SCARD", parentDependenciesKey) == 0
  if doNotHavePendingDependencies then
    moveParentToWaitIfNeeded(parentQueueKey, parentKey, parentId, timestamp)
  end
end
local function updateParentDepsIfNeeded(parentKey, parentQueueKey, parentDependenciesKey,
  parentId, jobIdKey, returnvalue, timestamp )
  local processedSet = parentKey .. ":processed"
  rcall("HSET", processedSet, jobIdKey, returnvalue)
  moveParentToWaitIfNoPendingDependencies(parentQueueKey, parentDependenciesKey, parentKey, parentId, timestamp)
end
local function updateExistingJobsParent(parentKey, parent, parentData,
                                        parentDependenciesKey, completedKey,
                                        jobIdKey, jobId, timestamp)
    if parentKey ~= nil then
        if rcall("ZSCORE", completedKey, jobId) then
            local returnvalue = rcall("HGET", jobIdKey, "returnvalue")
            updateParentDepsIfNeeded(parentKey, parent['queueKey'],
                                     parentDependenciesKey, parent['id'],
                                     jobIdKey, returnvalue, timestamp)
        else
            if parentDependenciesKey ~= nil then
                rcall("SADD", parentDependenciesKey, jobIdKey)
            end
        end
        rcall("HMSET", jobIdKey, "parentKey", parentKey, "parent", parentData)
    end
end
local function handleDuplicatedJob(jobKey, jobId, currentParentKey, currentParent,
  parentData, parentDependenciesKey, completedKey, eventsKey, maxEvents, timestamp)
  local existedParentKey = rcall("HGET", jobKey, "parentKey")
  if not existedParentKey or existedParentKey == currentParentKey then
    updateExistingJobsParent(currentParentKey, currentParent, parentData,
      parentDependenciesKey, completedKey, jobKey,
      jobId, timestamp)
  else
    if currentParentKey ~= nil and currentParentKey ~= existedParentKey
      and (rcall("EXISTS", existedParentKey) == 1) then
      return -7
    end
  end
  rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event",
    "duplicated", "jobId", jobId)
  return jobId .. "" -- convert to string
end
if parentKey ~= nil then
    if rcall("EXISTS", parentKey) ~= 1 then return -5 end
    parentData = cjson.encode(parent)
end
local jobCounter = rcall("INCR", idKey)
local maxEvents = getOrSetMaxEvents(metaKey)
local parentDependenciesKey = args[6]
local timestamp = args[4]
if args[2] == "" then
    jobId = jobCounter
    jobIdKey = args[1] .. jobId
else
    jobId = args[2]
    jobIdKey = args[1] .. jobId
    if rcall("EXISTS", jobIdKey) == 1 then
        return handleDuplicatedJob(jobIdKey, jobId, parentKey, parent,
            parentData, parentDependenciesKey, completedKey, eventsKey,
            maxEvents, timestamp)
    end
end
local deduplicationJobId = deduplicateJob(opts['de'], jobId, KEYS[5],
  deduplicationKey, eventsKey, maxEvents, args[1])
if deduplicationJobId then
  return deduplicationJobId
end
-- Store the job.
local delay, priority = storeJob(eventsKey, jobIdKey, jobId, args[3], ARGV[2],
                                 opts, timestamp, parentKey, parentData,
                                 repeatJobKey)
-- Add the job to the prioritized set
local isPausedOrMaxed = isQueuePausedOrMaxed(metaKey, activeKey)
addJobWithPriority( KEYS[1], priorityKey, priority, jobId, priorityCounterKey, isPausedOrMaxed)
-- Emit waiting event
rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "waiting",
      "jobId", jobId)
-- Check if this job is a child of another job, if so add it to the parents dependencies
if parentDependenciesKey ~= nil then
    rcall("SADD", parentDependenciesKey, jobIdKey)
end
return jobId .. "" -- convert to string
`,keys:9},q={name:"addRepeatableJob",content:`--[[
  Adds a repeatable job
    Input:
      KEYS[1] 'repeat' key
      KEYS[2] 'delayed' key
      ARGV[1] next milliseconds
      ARGV[2] msgpacked options
            [1]  name
            [2]  tz?
            [3]  pattern?
            [4]  endDate?
            [5]  every?
      ARGV[3] legacy custom key TODO: remove this logic in next breaking change
      ARGV[4] custom key
      ARGV[5] prefix key
      Output:
        repeatableKey  - OK
]]
local rcall = redis.call
local repeatKey = KEYS[1]
local delayedKey = KEYS[2]
local nextMillis = ARGV[1]
local legacyCustomKey = ARGV[3]
local customKey = ARGV[4]
local prefixKey = ARGV[5]
-- Includes
--[[
  Function to remove job.
]]
-- Includes
--[[
  Function to remove deduplication key if needed
  when a job is being removed.
]]
local function removeDeduplicationKeyIfNeededOnRemoval(prefixKey,
  jobId, deduplicationId)
  if deduplicationId then
    local deduplicationKey = prefixKey .. "de:" .. deduplicationId
    local currentJobId = rcall('GET', deduplicationKey)
    if currentJobId and currentJobId == jobId then
      return rcall("DEL", deduplicationKey)
    end
  end
end
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
--[[
  Check if this job has a parent. If so we will just remove it from
  the parent child list, but if it is the last child we should move the parent to "wait/paused"
  which requires code from "moveToFinished"
]]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Functions to destructure job key.
  Just a bit of warning, these functions may be a bit slow and affect performance significantly.
]]
local getJobIdFromKey = function (jobKey)
  return string.match(jobKey, ".*:(.*)")
end
local getJobKeyPrefix = function (jobKey, jobId)
  return string.sub(jobKey, 0, #jobKey - #jobId)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
local function _moveParentToWait(parentPrefix, parentId, emitEvent)
  local parentTarget, isPausedOrMaxed = getTargetQueueList(parentPrefix .. "meta", parentPrefix .. "active",
    parentPrefix .. "wait", parentPrefix .. "paused")
  addJobInTargetList(parentTarget, parentPrefix .. "marker", "RPUSH", isPausedOrMaxed, parentId)
  if emitEvent then
    local parentEventStream = parentPrefix .. "events"
    rcall("XADD", parentEventStream, "*", "event", "waiting", "jobId", parentId, "prev", "waiting-children")
  end
end
local function removeParentDependencyKey(jobKey, hard, parentKey, baseKey, debounceId)
  if parentKey then
    local parentDependenciesKey = parentKey .. ":dependencies"
    local result = rcall("SREM", parentDependenciesKey, jobKey)
    if result > 0 then
      local pendingDependencies = rcall("SCARD", parentDependenciesKey)
      if pendingDependencies == 0 then
        local parentId = getJobIdFromKey(parentKey)
        local parentPrefix = getJobKeyPrefix(parentKey, parentId)
        local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
        if numRemovedElements == 1 then
          if hard then -- remove parent in same queue
            if parentPrefix == baseKey then
              removeParentDependencyKey(parentKey, hard, nil, baseKey, nil)
              removeJobKeys(parentKey)
              if debounceId then
                rcall("DEL", parentPrefix .. "de:" .. debounceId)
              end
            else
              _moveParentToWait(parentPrefix, parentId)
            end
          else
            _moveParentToWait(parentPrefix, parentId, true)
          end
        end
      end
      return true
    end
  else
    local parentAttributes = rcall("HMGET", jobKey, "parentKey", "deid")
    local missedParentKey = parentAttributes[1]
    if( (type(missedParentKey) == "string") and missedParentKey ~= ""
      and (rcall("EXISTS", missedParentKey) == 1)) then
      local parentDependenciesKey = missedParentKey .. ":dependencies"
      local result = rcall("SREM", parentDependenciesKey, jobKey)
      if result > 0 then
        local pendingDependencies = rcall("SCARD", parentDependenciesKey)
        if pendingDependencies == 0 then
          local parentId = getJobIdFromKey(missedParentKey)
          local parentPrefix = getJobKeyPrefix(missedParentKey, parentId)
          local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
          if numRemovedElements == 1 then
            if hard then
              if parentPrefix == baseKey then
                removeParentDependencyKey(missedParentKey, hard, nil, baseKey, nil)
                removeJobKeys(missedParentKey)
                if parentAttributes[2] then
                  rcall("DEL", parentPrefix .. "de:" .. parentAttributes[2])
                end
              else
                _moveParentToWait(parentPrefix, parentId)
              end
            else
              _moveParentToWait(parentPrefix, parentId, true)
            end
          end
        end
        return true
      end
    end
  end
  return false
end
local function removeJob(jobId, hard, baseKey, shouldRemoveDeduplicationKey)
  local jobKey = baseKey .. jobId
  removeParentDependencyKey(jobKey, hard, nil, baseKey)
  if shouldRemoveDeduplicationKey then
    local deduplicationId = rcall("HGET", jobKey, "deid")
    removeDeduplicationKeyIfNeededOnRemoval(baseKey, jobId, deduplicationId)
  end
  removeJobKeys(jobKey)
end
local function storeRepeatableJob(repeatKey, customKey, nextMillis, rawOpts)
  rcall("ZADD", repeatKey, nextMillis, customKey)
  local opts = cmsgpack.unpack(rawOpts)
  local optionalValues = {}
  if opts['tz'] then
    table.insert(optionalValues, "tz")
    table.insert(optionalValues, opts['tz'])
  end
  if opts['pattern'] then
    table.insert(optionalValues, "pattern")
    table.insert(optionalValues, opts['pattern'])
  end
  if opts['endDate'] then
    table.insert(optionalValues, "endDate")
    table.insert(optionalValues, opts['endDate'])
  end
  if opts['every'] then
    table.insert(optionalValues, "every")
    table.insert(optionalValues, opts['every'])
  end
  rcall("HMSET", repeatKey .. ":" .. customKey, "name", opts['name'],
    unpack(optionalValues))
  return customKey
end
-- If we are overriding a repeatable job we must delete the delayed job for
-- the next iteration.
local prevMillis = rcall("ZSCORE", repeatKey, customKey)
if prevMillis then
  local delayedJobId =  "repeat:" .. customKey .. ":" .. prevMillis
  local nextDelayedJobId =  repeatKey .. ":" .. customKey .. ":" .. nextMillis
  if rcall("ZSCORE", delayedKey, delayedJobId)
   and rcall("EXISTS", nextDelayedJobId) ~= 1 then
    removeJob(delayedJobId, true, prefixKey, true --[[remove debounce key]])
    rcall("ZREM", delayedKey, delayedJobId)
  end
end
-- Keep backwards compatibility with old repeatable jobs (<= 3.0.0)
if rcall("ZSCORE", repeatKey, legacyCustomKey) ~= false then
  return storeRepeatableJob(repeatKey, legacyCustomKey, nextMillis, ARGV[2])
end
return storeRepeatableJob(repeatKey, customKey, nextMillis, ARGV[2])
`,keys:2},r={name:"addStandardJob",content:`--[[
  Adds a job to the queue by doing the following:
    - Increases the job counter if needed.
    - Creates a new job key with the job data.
    - if delayed:
      - computes timestamp.
      - adds to delayed zset.
      - Emits a global event 'delayed' if the job is delayed.
    - if not delayed
      - Adds the jobId to the wait/paused list in one of three ways:
         - LIFO
         - FIFO
         - prioritized.
      - Adds the job to the "added" list so that workers gets notified.
    Input:
      KEYS[1] 'wait',
      KEYS[2] 'paused'
      KEYS[3] 'meta'
      KEYS[4] 'id'
      KEYS[5] 'completed'
      KEYS[6] 'delayed'
      KEYS[7] 'active'
      KEYS[8] events stream key
      KEYS[9] marker key
      ARGV[1] msgpacked arguments array
            [1]  key prefix,
            [2]  custom id (will not generate one automatically)
            [3]  name
            [4]  timestamp
            [5]  parentKey?
            [6]  parent dependencies key.
            [7]  parent? {id, queueKey}
            [8]  repeat job key
            [9] deduplication key
      ARGV[2] Json stringified job data
      ARGV[3] msgpacked options
      Output:
        jobId  - OK
        -5     - Missing parent key
]]
local eventsKey = KEYS[8]
local jobId
local jobIdKey
local rcall = redis.call
local args = cmsgpack.unpack(ARGV[1])
local data = ARGV[2]
local opts = cmsgpack.unpack(ARGV[3])
local parentKey = args[5]
local parent = args[7]
local repeatJobKey = args[8]
local deduplicationKey = args[9]
local parentData
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to debounce a job.
]]
-- Includes
--[[
  Function to deduplicate a job.
]]
local function deduplicateJobWithoutReplace(deduplicationId, deduplicationOpts, jobId, deduplicationKey,
    eventsKey, maxEvents)
    local ttl = deduplicationOpts['ttl']
    local deduplicationKeyExists
    if ttl and ttl > 0 then
        if deduplicationOpts['extend'] then
            local currentDebounceJobId = rcall('GET', deduplicationKey)
            if currentDebounceJobId then
                rcall('SET', deduplicationKey, currentDebounceJobId, 'PX', ttl)
                rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "debounced",
                    "jobId", currentDebounceJobId, "debounceId", deduplicationId)
                rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "deduplicated", "jobId",
                    currentDebounceJobId, "deduplicationId", deduplicationId, "deduplicatedJobId", jobId)
                return currentDebounceJobId
            else
                rcall('SET', deduplicationKey, jobId, 'PX', ttl)
                return
            end
        else
            deduplicationKeyExists = not rcall('SET', deduplicationKey, jobId, 'PX', ttl, 'NX')
        end
    else
        deduplicationKeyExists = not rcall('SET', deduplicationKey, jobId, 'NX')
    end
    if deduplicationKeyExists then
        local currentDebounceJobId = rcall('GET', deduplicationKey)
        -- TODO remove debounced event in next breaking change
        rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "debounced", "jobId",
            currentDebounceJobId, "debounceId", deduplicationId)
        rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "deduplicated", "jobId",
            currentDebounceJobId, "deduplicationId", deduplicationId, "deduplicatedJobId", jobId)
        return currentDebounceJobId
    end
end
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
local function removeDelayedJob(delayedKey, deduplicationKey, eventsKey, maxEvents, currentDeduplicatedJobId,
    jobId, deduplicationId, prefix)
    if rcall("ZREM", delayedKey, currentDeduplicatedJobId) > 0 then
        removeJobKeys(prefix .. currentDeduplicatedJobId)
        rcall("XADD", eventsKey, "*", "event", "removed", "jobId", currentDeduplicatedJobId,
            "prev", "delayed")
        -- TODO remove debounced event in next breaking change
        rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "debounced", "jobId",
            jobId, "debounceId", deduplicationId)
        rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "deduplicated", "jobId",
            jobId, "deduplicationId", deduplicationId, "deduplicatedJobId", currentDeduplicatedJobId)
        return true
    end
    return false
end
local function deduplicateJob(deduplicationOpts, jobId, delayedKey, deduplicationKey, eventsKey, maxEvents,
    prefix)
    local deduplicationId = deduplicationOpts and deduplicationOpts['id']
    if deduplicationId then
        if deduplicationOpts['replace'] then
            local ttl = deduplicationOpts['ttl']
            if ttl and ttl > 0 then
                local currentDebounceJobId = rcall('GET', deduplicationKey)
                if currentDebounceJobId then
                    local isRemoved = removeDelayedJob(delayedKey, deduplicationKey, eventsKey, maxEvents,
                        currentDebounceJobId, jobId, deduplicationId, prefix)
                    if isRemoved then
                        if deduplicationOpts['extend'] then
                            rcall('SET', deduplicationKey, jobId, 'PX', ttl)
                        else
                            rcall('SET', deduplicationKey, jobId, 'KEEPTTL')
                        end
                        return
                    else
                        return currentDebounceJobId
                    end
                else
                    rcall('SET', deduplicationKey, jobId, 'PX', ttl)
                    return
                end
            else
                local currentDebounceJobId = rcall('GET', deduplicationKey)
                if currentDebounceJobId then
                    local isRemoved = removeDelayedJob(delayedKey, deduplicationKey, eventsKey, maxEvents,
                        currentDebounceJobId, jobId, deduplicationId, prefix)
                    if isRemoved then
                        rcall('SET', deduplicationKey, jobId)
                        return
                    else
                        return currentDebounceJobId
                    end
                else
                    rcall('SET', deduplicationKey, jobId)
                    return
                end
            end
        else
            return deduplicateJobWithoutReplace(deduplicationId, deduplicationOpts,
                jobId, deduplicationKey, eventsKey, maxEvents)
        end
    end
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
--[[
  Function to handle the case when job is duplicated.
]]
-- Includes
--[[
    This function is used to update the parent's dependencies if the job
    is already completed and about to be ignored. The parent must get its
    dependencies updated to avoid the parent job being stuck forever in 
    the waiting-children state.
]]
-- Includes
--[[
  Validate and move or add dependencies to parent.
]]
-- Includes
--[[
  Validate and move parent to a wait status (waiting, delayed or prioritized)
  if no pending dependencies.
]]
-- Includes
--[[
  Validate and move parent to a wait status (waiting, delayed or prioritized) if needed.
]]
-- Includes
--[[
  Move parent to a wait status (wait, prioritized or delayed)
]]
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if nextTimestamp ~= nil then
      return nextTimestamp / 0x1000
    end
  end
end
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
  local nextTimestamp = getNextDelayedTimestamp(delayedKey)
  if nextTimestamp ~= nil then
    -- Replace the score of the marker with the newest known
    -- next timestamp.
    rcall("ZADD", markerKey, nextTimestamp, "1")
  end
end
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Function to get priority score.
]]
local function getPriorityScore(priority, priorityCounterKey)
  local prioCounter = rcall("INCR", priorityCounterKey)
  return priority * 0x100000000 + prioCounter % 0x100000000
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey,
  isPausedOrMaxed)
  local score = getPriorityScore(priority, priorityCounterKey)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to check if queue is paused or maxed
  (since an empty list and !EXISTS are not really the same).
]]
local function isQueuePausedOrMaxed(queueMetaKey, activeKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      return activeCount >= tonumber(queueAttributes[2])
    end
  end
  return false
end
local function moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    local parentWaitKey = parentQueueKey .. ":wait"
    local parentPausedKey = parentQueueKey .. ":paused"
    local parentActiveKey = parentQueueKey .. ":active"
    local parentMetaKey = parentQueueKey .. ":meta"
    local parentMarkerKey = parentQueueKey .. ":marker"
    local jobAttributes = rcall("HMGET", parentKey, "priority", "delay")
    local priority = tonumber(jobAttributes[1]) or 0
    local delay = tonumber(jobAttributes[2]) or 0
    if delay > 0 then
        local delayedTimestamp = tonumber(timestamp) + delay
        local score = delayedTimestamp * 0x1000
        local parentDelayedKey = parentQueueKey .. ":delayed"
        rcall("ZADD", parentDelayedKey, score, parentId)
        rcall("XADD", parentQueueKey .. ":events", "*", "event", "delayed", "jobId", parentId, "delay",
            delayedTimestamp)
        addDelayMarkerIfNeeded(parentMarkerKey, parentDelayedKey)
    else
        if priority == 0 then
            local parentTarget, isParentPausedOrMaxed = getTargetQueueList(parentMetaKey, parentActiveKey,
                parentWaitKey, parentPausedKey)
            addJobInTargetList(parentTarget, parentMarkerKey, "RPUSH", isParentPausedOrMaxed, parentId)
        else
            local isPausedOrMaxed = isQueuePausedOrMaxed(parentMetaKey, parentActiveKey)
            addJobWithPriority(parentMarkerKey, parentQueueKey .. ":prioritized", priority, parentId,
                parentQueueKey .. ":pc", isPausedOrMaxed)
        end
        rcall("XADD", parentQueueKey .. ":events", "*", "event", "waiting", "jobId", parentId, "prev",
            "waiting-children")
    end
end
local function moveParentToWaitIfNeeded(parentQueueKey, parentKey, parentId, timestamp)
  if rcall("EXISTS", parentKey) == 1 then
    local parentWaitingChildrenKey = parentQueueKey .. ":waiting-children"
    if rcall("ZSCORE", parentWaitingChildrenKey, parentId) then    
      rcall("ZREM", parentWaitingChildrenKey, parentId)
      moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    end
  end
end
local function moveParentToWaitIfNoPendingDependencies(parentQueueKey, parentDependenciesKey, parentKey,
  parentId, timestamp)
  local doNotHavePendingDependencies = rcall("SCARD", parentDependenciesKey) == 0
  if doNotHavePendingDependencies then
    moveParentToWaitIfNeeded(parentQueueKey, parentKey, parentId, timestamp)
  end
end
local function updateParentDepsIfNeeded(parentKey, parentQueueKey, parentDependenciesKey,
  parentId, jobIdKey, returnvalue, timestamp )
  local processedSet = parentKey .. ":processed"
  rcall("HSET", processedSet, jobIdKey, returnvalue)
  moveParentToWaitIfNoPendingDependencies(parentQueueKey, parentDependenciesKey, parentKey, parentId, timestamp)
end
local function updateExistingJobsParent(parentKey, parent, parentData,
                                        parentDependenciesKey, completedKey,
                                        jobIdKey, jobId, timestamp)
    if parentKey ~= nil then
        if rcall("ZSCORE", completedKey, jobId) then
            local returnvalue = rcall("HGET", jobIdKey, "returnvalue")
            updateParentDepsIfNeeded(parentKey, parent['queueKey'],
                                     parentDependenciesKey, parent['id'],
                                     jobIdKey, returnvalue, timestamp)
        else
            if parentDependenciesKey ~= nil then
                rcall("SADD", parentDependenciesKey, jobIdKey)
            end
        end
        rcall("HMSET", jobIdKey, "parentKey", parentKey, "parent", parentData)
    end
end
local function handleDuplicatedJob(jobKey, jobId, currentParentKey, currentParent,
  parentData, parentDependenciesKey, completedKey, eventsKey, maxEvents, timestamp)
  local existedParentKey = rcall("HGET", jobKey, "parentKey")
  if not existedParentKey or existedParentKey == currentParentKey then
    updateExistingJobsParent(currentParentKey, currentParent, parentData,
      parentDependenciesKey, completedKey, jobKey,
      jobId, timestamp)
  else
    if currentParentKey ~= nil and currentParentKey ~= existedParentKey
      and (rcall("EXISTS", existedParentKey) == 1) then
      return -7
    end
  end
  rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event",
    "duplicated", "jobId", jobId)
  return jobId .. "" -- convert to string
end
--[[
  Function to store a job
]]
local function storeJob(eventsKey, jobIdKey, jobId, name, data, opts, timestamp,
                        parentKey, parentData, repeatJobKey)
    local jsonOpts = cjson.encode(opts)
    local delay = opts['delay'] or 0
    local priority = opts['priority'] or 0
    local debounceId = opts['de'] and opts['de']['id']
    local optionalValues = {}
    if parentKey ~= nil then
        table.insert(optionalValues, "parentKey")
        table.insert(optionalValues, parentKey)
        table.insert(optionalValues, "parent")
        table.insert(optionalValues, parentData)
    end
    if repeatJobKey then
        table.insert(optionalValues, "rjk")
        table.insert(optionalValues, repeatJobKey)
    end
    if debounceId then
        table.insert(optionalValues, "deid")
        table.insert(optionalValues, debounceId)
    end
    rcall("HMSET", jobIdKey, "name", name, "data", data, "opts", jsonOpts,
          "timestamp", timestamp, "delay", delay, "priority", priority,
          unpack(optionalValues))
    rcall("XADD", eventsKey, "*", "event", "added", "jobId", jobId, "name", name)
    return delay, priority
end
if parentKey ~= nil then
    if rcall("EXISTS", parentKey) ~= 1 then return -5 end
    parentData = cjson.encode(parent)
end
local jobCounter = rcall("INCR", KEYS[4])
local metaKey = KEYS[3]
local maxEvents = getOrSetMaxEvents(metaKey)
local parentDependenciesKey = args[6]
local timestamp = args[4]
if args[2] == "" then
    jobId = jobCounter
    jobIdKey = args[1] .. jobId
else
    jobId = args[2]
    jobIdKey = args[1] .. jobId
    if rcall("EXISTS", jobIdKey) == 1 then
        return handleDuplicatedJob(jobIdKey, jobId, parentKey, parent,
            parentData, parentDependenciesKey, KEYS[5], eventsKey,
            maxEvents, timestamp)
    end
end
local deduplicationJobId = deduplicateJob(opts['de'], jobId, KEYS[6],
  deduplicationKey, eventsKey, maxEvents, args[1])
if deduplicationJobId then
  return deduplicationJobId
end
-- Store the job.
storeJob(eventsKey, jobIdKey, jobId, args[3], ARGV[2], opts, timestamp,
         parentKey, parentData, repeatJobKey)
local target, isPausedOrMaxed = getTargetQueueList(metaKey, KEYS[7], KEYS[1], KEYS[2])
-- LIFO or FIFO
local pushCmd = opts['lifo'] and 'RPUSH' or 'LPUSH'
addJobInTargetList(target, KEYS[9], pushCmd, isPausedOrMaxed, jobId)
-- Emit waiting event
rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "waiting",
      "jobId", jobId)
-- Check if this job is a child of another job, if so add it to the parents dependencies
if parentDependenciesKey ~= nil then
    rcall("SADD", parentDependenciesKey, jobIdKey)
end
return jobId .. "" -- convert to string
`,keys:9},s={name:"changeDelay",content:`--[[
  Change job delay when it is in delayed set.
  Input:
    KEYS[1] delayed key
    KEYS[2] meta key
    KEYS[3] marker key
    KEYS[4] events stream
    ARGV[1] delay
    ARGV[2] timestamp
    ARGV[3] the id of the job
    ARGV[4] job key
  Output:
    0 - OK
   -1 - Missing job.
   -3 - Job not in delayed set.
  Events:
    - delayed key.
]]
local rcall = redis.call
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if nextTimestamp ~= nil then
      return nextTimestamp / 0x1000
    end
  end
end
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
  local nextTimestamp = getNextDelayedTimestamp(delayedKey)
  if nextTimestamp ~= nil then
    -- Replace the score of the marker with the newest known
    -- next timestamp.
    rcall("ZADD", markerKey, nextTimestamp, "1")
  end
end
--[[
  Bake in the job id first 12 bits into the timestamp
  to guarantee correct execution order of delayed jobs
  (up to 4096 jobs per given timestamp or 4096 jobs apart per timestamp)
  WARNING: Jobs that are so far apart that they wrap around will cause FIFO to fail
]]
local function getDelayedScore(delayedKey, timestamp, delay)
  local delayedTimestamp = (delay > 0 and (tonumber(timestamp) + delay)) or tonumber(timestamp)
  local minScore = delayedTimestamp * 0x1000
  local maxScore = (delayedTimestamp + 1 ) * 0x1000 - 1
  local result = rcall("ZREVRANGEBYSCORE", delayedKey, maxScore,
    minScore, "WITHSCORES","LIMIT", 0, 1)
  if #result then
    local currentMaxScore = tonumber(result[2])
    if currentMaxScore ~= nil then
      if currentMaxScore >= maxScore then
        return maxScore, delayedTimestamp
      else
        return currentMaxScore + 1, delayedTimestamp
      end
    end
  end
  return minScore, delayedTimestamp
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
if rcall("EXISTS", ARGV[4]) == 1 then
  local jobId = ARGV[3]
  local delay = tonumber(ARGV[1])
  local score, delayedTimestamp = getDelayedScore(KEYS[1], ARGV[2], delay)
  local numRemovedElements = rcall("ZREM", KEYS[1], jobId)
  if numRemovedElements < 1 then
    return -3
  end
  rcall("HSET", ARGV[4], "delay", delay)
  rcall("ZADD", KEYS[1], score, jobId)
  local maxEvents = getOrSetMaxEvents(KEYS[2])
  rcall("XADD", KEYS[4], "MAXLEN", "~", maxEvents, "*", "event", "delayed",
    "jobId", jobId, "delay", delayedTimestamp)
  -- mark that a delayed job is available
  addDelayMarkerIfNeeded(KEYS[3], KEYS[1])
  return 0
else
  return -1
end`,keys:4},t={name:"changePriority",content:`--[[
  Change job priority
  Input:
    KEYS[1] 'wait',
    KEYS[2] 'paused'
    KEYS[3] 'meta'
    KEYS[4] 'prioritized'
    KEYS[5] 'active'
    KEYS[6] 'pc' priority counter
    KEYS[7] 'marker'
    ARGV[1] priority value
    ARGV[2] prefix key
    ARGV[3] job id
    ARGV[4] lifo
    Output:
       0  - OK
      -1  - Missing job
]]
local jobId = ARGV[3]
local jobKey = ARGV[2] .. jobId
local priority = tonumber(ARGV[1])
local rcall = redis.call
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Function to get priority score.
]]
local function getPriorityScore(priority, priorityCounterKey)
  local prioCounter = rcall("INCR", priorityCounterKey)
  return priority * 0x100000000 + prioCounter % 0x100000000
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey,
  isPausedOrMaxed)
  local score = getPriorityScore(priority, priorityCounterKey)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
--[[
  Function to push back job considering priority in front of same prioritized jobs.
]]
local function pushBackJobWithPriority(prioritizedKey, priority, jobId)
  -- in order to put it at front of same prioritized jobs
  -- we consider prioritized counter as 0
  local score = priority * 0x100000000
  rcall("ZADD", prioritizedKey, score, jobId)
end
local function reAddJobWithNewPriority( prioritizedKey, markerKey, targetKey,
    priorityCounter, lifo, priority, jobId, isPausedOrMaxed)
    if priority == 0 then
        local pushCmd = lifo and 'RPUSH' or 'LPUSH'
        addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
    else
        if lifo then
            pushBackJobWithPriority(prioritizedKey, priority, jobId)
        else
            addJobWithPriority(markerKey, prioritizedKey, priority, jobId,
                priorityCounter, isPausedOrMaxed)
        end
    end
end
if rcall("EXISTS", jobKey) == 1 then
    local metaKey = KEYS[3]
    local target, isPausedOrMaxed = getTargetQueueList(metaKey, KEYS[5], KEYS[1], KEYS[2])
    local prioritizedKey = KEYS[4]
    local priorityCounterKey = KEYS[6]
    local markerKey = KEYS[7]
    -- Re-add with the new priority
    if rcall("ZREM", prioritizedKey, jobId) > 0 then
        reAddJobWithNewPriority( prioritizedKey, markerKey, target,
            priorityCounterKey, ARGV[4] == '1', priority, jobId, isPausedOrMaxed)
    elseif rcall("LREM", target, -1, jobId) > 0 then
        reAddJobWithNewPriority( prioritizedKey, markerKey, target,
            priorityCounterKey, ARGV[4] == '1', priority, jobId, isPausedOrMaxed)
    end
    rcall("HSET", jobKey, "priority", priority)
    return 0
else
    return -1
end
`,keys:7},u={name:"cleanJobsInSet",content:`--[[
  Remove jobs from the specific set.
  Input:
    KEYS[1]  set key,
    KEYS[2]  events stream key
    KEYS[3]  repeat key
    ARGV[1]  jobKey prefix
    ARGV[2]  timestamp
    ARGV[3]  limit the number of jobs to be removed. 0 is unlimited
    ARGV[4]  set name, can be any of 'wait', 'active', 'paused', 'delayed', 'completed', or 'failed'
]]
local rcall = redis.call
local repeatKey = KEYS[3]
local rangeStart = 0
local rangeEnd = -1
local limit = tonumber(ARGV[3])
-- If we're only deleting _n_ items, avoid retrieving all items
-- for faster performance
--
-- Start from the tail of the list, since that's where oldest elements
-- are generally added for FIFO lists
if limit > 0 then
  rangeStart = -1 - limit + 1
  rangeEnd = -1
end
-- Includes
--[[
  Function to clean job list.
  Returns jobIds and deleted count number.
]]
-- Includes
--[[
  Function to get the latest saved timestamp.
]]
local function getTimestamp(jobKey, attributes)
  if #attributes == 1 then
    return rcall("HGET", jobKey, attributes[1])
  end
  local jobTs
  for _, ts in ipairs(rcall("HMGET", jobKey, unpack(attributes))) do
    if (ts) then
      jobTs = ts
      break
    end
  end
  return jobTs
end
--[[
  Function to check if the job belongs to a job scheduler and
  current delayed job matches with jobId
]]
local function isJobSchedulerJob(jobId, jobKey, jobSchedulersKey)
  local repeatJobKey = rcall("HGET", jobKey, "rjk")
  if repeatJobKey  then
    local prevMillis = rcall("ZSCORE", jobSchedulersKey, repeatJobKey)
    if prevMillis then
      local currentDelayedJobId = "repeat:" .. repeatJobKey .. ":" .. prevMillis
      return jobId == currentDelayedJobId
    end
  end
  return false
end
--[[
  Function to remove job.
]]
-- Includes
--[[
  Function to remove deduplication key if needed
  when a job is being removed.
]]
local function removeDeduplicationKeyIfNeededOnRemoval(prefixKey,
  jobId, deduplicationId)
  if deduplicationId then
    local deduplicationKey = prefixKey .. "de:" .. deduplicationId
    local currentJobId = rcall('GET', deduplicationKey)
    if currentJobId and currentJobId == jobId then
      return rcall("DEL", deduplicationKey)
    end
  end
end
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
--[[
  Check if this job has a parent. If so we will just remove it from
  the parent child list, but if it is the last child we should move the parent to "wait/paused"
  which requires code from "moveToFinished"
]]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Functions to destructure job key.
  Just a bit of warning, these functions may be a bit slow and affect performance significantly.
]]
local getJobIdFromKey = function (jobKey)
  return string.match(jobKey, ".*:(.*)")
end
local getJobKeyPrefix = function (jobKey, jobId)
  return string.sub(jobKey, 0, #jobKey - #jobId)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
local function _moveParentToWait(parentPrefix, parentId, emitEvent)
  local parentTarget, isPausedOrMaxed = getTargetQueueList(parentPrefix .. "meta", parentPrefix .. "active",
    parentPrefix .. "wait", parentPrefix .. "paused")
  addJobInTargetList(parentTarget, parentPrefix .. "marker", "RPUSH", isPausedOrMaxed, parentId)
  if emitEvent then
    local parentEventStream = parentPrefix .. "events"
    rcall("XADD", parentEventStream, "*", "event", "waiting", "jobId", parentId, "prev", "waiting-children")
  end
end
local function removeParentDependencyKey(jobKey, hard, parentKey, baseKey, debounceId)
  if parentKey then
    local parentDependenciesKey = parentKey .. ":dependencies"
    local result = rcall("SREM", parentDependenciesKey, jobKey)
    if result > 0 then
      local pendingDependencies = rcall("SCARD", parentDependenciesKey)
      if pendingDependencies == 0 then
        local parentId = getJobIdFromKey(parentKey)
        local parentPrefix = getJobKeyPrefix(parentKey, parentId)
        local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
        if numRemovedElements == 1 then
          if hard then -- remove parent in same queue
            if parentPrefix == baseKey then
              removeParentDependencyKey(parentKey, hard, nil, baseKey, nil)
              removeJobKeys(parentKey)
              if debounceId then
                rcall("DEL", parentPrefix .. "de:" .. debounceId)
              end
            else
              _moveParentToWait(parentPrefix, parentId)
            end
          else
            _moveParentToWait(parentPrefix, parentId, true)
          end
        end
      end
      return true
    end
  else
    local parentAttributes = rcall("HMGET", jobKey, "parentKey", "deid")
    local missedParentKey = parentAttributes[1]
    if( (type(missedParentKey) == "string") and missedParentKey ~= ""
      and (rcall("EXISTS", missedParentKey) == 1)) then
      local parentDependenciesKey = missedParentKey .. ":dependencies"
      local result = rcall("SREM", parentDependenciesKey, jobKey)
      if result > 0 then
        local pendingDependencies = rcall("SCARD", parentDependenciesKey)
        if pendingDependencies == 0 then
          local parentId = getJobIdFromKey(missedParentKey)
          local parentPrefix = getJobKeyPrefix(missedParentKey, parentId)
          local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
          if numRemovedElements == 1 then
            if hard then
              if parentPrefix == baseKey then
                removeParentDependencyKey(missedParentKey, hard, nil, baseKey, nil)
                removeJobKeys(missedParentKey)
                if parentAttributes[2] then
                  rcall("DEL", parentPrefix .. "de:" .. parentAttributes[2])
                end
              else
                _moveParentToWait(parentPrefix, parentId)
              end
            else
              _moveParentToWait(parentPrefix, parentId, true)
            end
          end
        end
        return true
      end
    end
  end
  return false
end
local function removeJob(jobId, hard, baseKey, shouldRemoveDeduplicationKey)
  local jobKey = baseKey .. jobId
  removeParentDependencyKey(jobKey, hard, nil, baseKey)
  if shouldRemoveDeduplicationKey then
    local deduplicationId = rcall("HGET", jobKey, "deid")
    removeDeduplicationKeyIfNeededOnRemoval(baseKey, jobId, deduplicationId)
  end
  removeJobKeys(jobKey)
end
local function cleanList(listKey, jobKeyPrefix, rangeStart, rangeEnd,
  timestamp, isWaiting, jobSchedulersKey)
  local jobs = rcall("LRANGE", listKey, rangeStart, rangeEnd)
  local deleted = {}
  local deletedCount = 0
  local jobTS
  local deletionMarker = ''
  local jobIdsLen = #jobs
  for i, job in ipairs(jobs) do
    if limit > 0 and deletedCount >= limit then
      break
    end
    local jobKey = jobKeyPrefix .. job
    if (isWaiting or rcall("EXISTS", jobKey .. ":lock") == 0) and
      not isJobSchedulerJob(job, jobKey, jobSchedulersKey) then
      -- Find the right timestamp of the job to compare to maxTimestamp:
      -- * finishedOn says when the job was completed, but it isn't set unless the job has actually completed
      -- * processedOn represents when the job was last attempted, but it doesn't get populated until
      --   the job is first tried
      -- * timestamp is the original job submission time
      -- Fetch all three of these (in that order) and use the first one that is set so that we'll leave jobs
      -- that have been active within the grace period:
      jobTS = getTimestamp(jobKey, {"finishedOn", "processedOn", "timestamp"})
      if (not jobTS or jobTS <= timestamp) then
        -- replace the entry with a deletion marker; the actual deletion will
        -- occur at the end of the script
        rcall("LSET", listKey, rangeEnd - jobIdsLen + i, deletionMarker)
        removeJob(job, true, jobKeyPrefix, true --[[remove debounce key]])
        deletedCount = deletedCount + 1
        table.insert(deleted, job)
      end
    end
  end
  rcall("LREM", listKey, 0, deletionMarker)
  return {deleted, deletedCount}
end
--[[
  Function to clean job set.
  Returns jobIds and deleted count number.
]] 
-- Includes
--[[
  Function to loop in batches.
  Just a bit of warning, some commands as ZREM
  could receive a maximum of 7000 parameters per call.
]]
local function batches(n, batchSize)
  local i = 0
  return function()
    local from = i * batchSize + 1
    i = i + 1
    if (from <= n) then
      local to = math.min(from + batchSize - 1, n)
      return from, to
    end
  end
end
--[[
  We use ZRANGEBYSCORE to make the case where we're deleting a limited number
  of items in a sorted set only run a single iteration. If we simply used
  ZRANGE, we may take a long time traversing through jobs that are within the
  grace period.
]]
local function getJobsInZset(zsetKey, rangeEnd, limit)
  if limit > 0 then
    return rcall("ZRANGEBYSCORE", zsetKey, 0, rangeEnd, "LIMIT", 0, limit)
  else
    return rcall("ZRANGEBYSCORE", zsetKey, 0, rangeEnd)
  end
end
local function cleanSet(
    setKey,
    jobKeyPrefix,
    rangeEnd,
    timestamp,
    limit,
    attributes,
    isFinished,
    jobSchedulersKey)
    local jobs = getJobsInZset(setKey, rangeEnd, limit)
    local deleted = {}
    local deletedCount = 0
    local jobTS
    for i, job in ipairs(jobs) do
        if limit > 0 and deletedCount >= limit then
            break
        end
        local jobKey = jobKeyPrefix .. job
        -- Extract a Job Scheduler Id from jobId ("repeat:job-scheduler-id:millis") 
        -- and check if it is in the scheduled jobs
        if not (jobSchedulersKey and isJobSchedulerJob(job, jobKey, jobSchedulersKey)) then
            if isFinished then
                removeJob(job, true, jobKeyPrefix, true --[[remove debounce key]] )
                deletedCount = deletedCount + 1
                table.insert(deleted, job)
            else
                -- * finishedOn says when the job was completed, but it isn't set unless the job has actually completed
                jobTS = getTimestamp(jobKey, attributes)
                if (not jobTS or jobTS <= timestamp) then
                    removeJob(job, true, jobKeyPrefix, true --[[remove debounce key]] )
                    deletedCount = deletedCount + 1
                    table.insert(deleted, job)
                end
            end
        end
    end
    if (#deleted > 0) then
        for from, to in batches(#deleted, 7000) do
            rcall("ZREM", setKey, unpack(deleted, from, to))
        end
    end
    return {deleted, deletedCount}
end
local result
if ARGV[4] == "active" then
  result = cleanList(KEYS[1], ARGV[1], rangeStart, rangeEnd, ARGV[2], false --[[ hasFinished ]],
                      repeatKey)
elseif ARGV[4] == "delayed" then
  rangeEnd = "+inf"
  result = cleanSet(KEYS[1], ARGV[1], rangeEnd, ARGV[2], limit,
                    {"processedOn", "timestamp"}, false  --[[ hasFinished ]], repeatKey)
elseif ARGV[4] == "prioritized" then
  rangeEnd = "+inf"
  result = cleanSet(KEYS[1], ARGV[1], rangeEnd, ARGV[2], limit,
                    {"timestamp"}, false  --[[ hasFinished ]], repeatKey)
elseif ARGV[4] == "wait" or ARGV[4] == "paused" then
  result = cleanList(KEYS[1], ARGV[1], rangeStart, rangeEnd, ARGV[2], true --[[ hasFinished ]],
                      repeatKey)
else
  rangeEnd = ARGV[2]
  -- No need to pass repeat key as in that moment job won't be related to a job scheduler
  result = cleanSet(KEYS[1], ARGV[1], rangeEnd, ARGV[2], limit,
                    {"finishedOn"}, true  --[[ hasFinished ]])
end
rcall("XADD", KEYS[2], "*", "event", "cleaned", "count", result[2])
return result[1]
`,keys:3},v={name:"drain",content:`--[[
  Drains the queue, removes all jobs that are waiting
  or delayed, but not active, completed or failed
  Input:
    KEYS[1] 'wait',
    KEYS[2] 'paused'
    KEYS[3] 'delayed'
    KEYS[4] 'prioritized'
    KEYS[5] 'jobschedulers' (repeat)
    ARGV[1]  queue key prefix
    ARGV[2]  should clean delayed jobs
]]
local rcall = redis.call
local queueBaseKey = ARGV[1]
--[[
  Functions to remove jobs.
]]
-- Includes
--[[
  Function to filter out jobs to ignore from a table.
]]
local function filterOutJobsToIgnore(jobs, jobsToIgnore)
  local filteredJobs = {}
  for i = 1, #jobs do
    if not jobsToIgnore[jobs[i]] then
      table.insert(filteredJobs, jobs[i])
    end
  end
  return filteredJobs
end
--[[
  Functions to remove jobs.
]]
-- Includes
--[[
  Function to remove job.
]]
-- Includes
--[[
  Function to remove deduplication key if needed
  when a job is being removed.
]]
local function removeDeduplicationKeyIfNeededOnRemoval(prefixKey,
  jobId, deduplicationId)
  if deduplicationId then
    local deduplicationKey = prefixKey .. "de:" .. deduplicationId
    local currentJobId = rcall('GET', deduplicationKey)
    if currentJobId and currentJobId == jobId then
      return rcall("DEL", deduplicationKey)
    end
  end
end
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
--[[
  Check if this job has a parent. If so we will just remove it from
  the parent child list, but if it is the last child we should move the parent to "wait/paused"
  which requires code from "moveToFinished"
]]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Functions to destructure job key.
  Just a bit of warning, these functions may be a bit slow and affect performance significantly.
]]
local getJobIdFromKey = function (jobKey)
  return string.match(jobKey, ".*:(.*)")
end
local getJobKeyPrefix = function (jobKey, jobId)
  return string.sub(jobKey, 0, #jobKey - #jobId)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
local function _moveParentToWait(parentPrefix, parentId, emitEvent)
  local parentTarget, isPausedOrMaxed = getTargetQueueList(parentPrefix .. "meta", parentPrefix .. "active",
    parentPrefix .. "wait", parentPrefix .. "paused")
  addJobInTargetList(parentTarget, parentPrefix .. "marker", "RPUSH", isPausedOrMaxed, parentId)
  if emitEvent then
    local parentEventStream = parentPrefix .. "events"
    rcall("XADD", parentEventStream, "*", "event", "waiting", "jobId", parentId, "prev", "waiting-children")
  end
end
local function removeParentDependencyKey(jobKey, hard, parentKey, baseKey, debounceId)
  if parentKey then
    local parentDependenciesKey = parentKey .. ":dependencies"
    local result = rcall("SREM", parentDependenciesKey, jobKey)
    if result > 0 then
      local pendingDependencies = rcall("SCARD", parentDependenciesKey)
      if pendingDependencies == 0 then
        local parentId = getJobIdFromKey(parentKey)
        local parentPrefix = getJobKeyPrefix(parentKey, parentId)
        local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
        if numRemovedElements == 1 then
          if hard then -- remove parent in same queue
            if parentPrefix == baseKey then
              removeParentDependencyKey(parentKey, hard, nil, baseKey, nil)
              removeJobKeys(parentKey)
              if debounceId then
                rcall("DEL", parentPrefix .. "de:" .. debounceId)
              end
            else
              _moveParentToWait(parentPrefix, parentId)
            end
          else
            _moveParentToWait(parentPrefix, parentId, true)
          end
        end
      end
      return true
    end
  else
    local parentAttributes = rcall("HMGET", jobKey, "parentKey", "deid")
    local missedParentKey = parentAttributes[1]
    if( (type(missedParentKey) == "string") and missedParentKey ~= ""
      and (rcall("EXISTS", missedParentKey) == 1)) then
      local parentDependenciesKey = missedParentKey .. ":dependencies"
      local result = rcall("SREM", parentDependenciesKey, jobKey)
      if result > 0 then
        local pendingDependencies = rcall("SCARD", parentDependenciesKey)
        if pendingDependencies == 0 then
          local parentId = getJobIdFromKey(missedParentKey)
          local parentPrefix = getJobKeyPrefix(missedParentKey, parentId)
          local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
          if numRemovedElements == 1 then
            if hard then
              if parentPrefix == baseKey then
                removeParentDependencyKey(missedParentKey, hard, nil, baseKey, nil)
                removeJobKeys(missedParentKey)
                if parentAttributes[2] then
                  rcall("DEL", parentPrefix .. "de:" .. parentAttributes[2])
                end
              else
                _moveParentToWait(parentPrefix, parentId)
              end
            else
              _moveParentToWait(parentPrefix, parentId, true)
            end
          end
        end
        return true
      end
    end
  end
  return false
end
local function removeJob(jobId, hard, baseKey, shouldRemoveDeduplicationKey)
  local jobKey = baseKey .. jobId
  removeParentDependencyKey(jobKey, hard, nil, baseKey)
  if shouldRemoveDeduplicationKey then
    local deduplicationId = rcall("HGET", jobKey, "deid")
    removeDeduplicationKeyIfNeededOnRemoval(baseKey, jobId, deduplicationId)
  end
  removeJobKeys(jobKey)
end
local function removeJobs(keys, hard, baseKey, max)
  for i, key in ipairs(keys) do
    removeJob(key, hard, baseKey, true --[[remove debounce key]])
  end
  return max - #keys
end
local function getListItems(keyName, max)
  return rcall('LRANGE', keyName, 0, max - 1)
end
local function removeListJobs(keyName, hard, baseKey, max, jobsToIgnore)
  local jobs = getListItems(keyName, max)
  if jobsToIgnore then
    jobs = filterOutJobsToIgnore(jobs, jobsToIgnore)
  end
  local count = removeJobs(jobs, hard, baseKey, max)
  rcall("LTRIM", keyName, #jobs, -1)
  return count
end
-- Includes
--[[
  Function to loop in batches.
  Just a bit of warning, some commands as ZREM
  could receive a maximum of 7000 parameters per call.
]]
local function batches(n, batchSize)
  local i = 0
  return function()
    local from = i * batchSize + 1
    i = i + 1
    if (from <= n) then
      local to = math.min(from + batchSize - 1, n)
      return from, to
    end
  end
end
--[[
  Function to get ZSet items.
]]
local function getZSetItems(keyName, max)
  return rcall('ZRANGE', keyName, 0, max - 1)
end
local function removeZSetJobs(keyName, hard, baseKey, max, jobsToIgnore)
  local jobs = getZSetItems(keyName, max)
  if jobsToIgnore then
    jobs = filterOutJobsToIgnore(jobs, jobsToIgnore)
  end
  local count = removeJobs(jobs, hard, baseKey, max)
  if(#jobs > 0) then
    for from, to in batches(#jobs, 7000) do
      rcall("ZREM", keyName, unpack(jobs, from, to))
    end
  end
  return count
end
-- We must not remove delayed jobs if they are associated to a job scheduler.
local scheduledJobs = {}
local jobSchedulers = rcall("ZRANGE", KEYS[5], 0, -1, "WITHSCORES")
-- For every job scheduler, get the current delayed job id.
for i = 1, #jobSchedulers, 2 do
    local jobSchedulerId = jobSchedulers[i]
    local jobSchedulerMillis = jobSchedulers[i + 1]
    local delayedJobId = "repeat:" .. jobSchedulerId .. ":" .. jobSchedulerMillis
    scheduledJobs[delayedJobId] = true
end
removeListJobs(KEYS[1], true, queueBaseKey, 0, scheduledJobs) -- wait
removeListJobs(KEYS[2], true, queueBaseKey, 0, scheduledJobs) -- paused
if ARGV[2] == "1" then
  removeZSetJobs(KEYS[3], true, queueBaseKey, 0, scheduledJobs) -- delayed
end
removeZSetJobs(KEYS[4], true, queueBaseKey, 0, scheduledJobs) -- prioritized
`,keys:5},w={name:"extendLock",content:`--[[
  Extend lock and removes the job from the stalled set.
  Input:
    KEYS[1] 'lock',
    KEYS[2] 'stalled'
    ARGV[1]  token
    ARGV[2]  lock duration in milliseconds
    ARGV[3]  jobid
  Output:
    "1" if lock extented succesfully.
]]
local rcall = redis.call
if rcall("GET", KEYS[1]) == ARGV[1] then
  --   if rcall("SET", KEYS[1], ARGV[1], "PX", ARGV[2], "XX") then
  if rcall("SET", KEYS[1], ARGV[1], "PX", ARGV[2]) then
    rcall("SREM", KEYS[2], ARGV[3])
    return 1
  end
end
return 0
`,keys:2},x={name:"extendLocks",content:`--[[
  Extend locks for multiple jobs and remove them from the stalled set if successful.
  Return the list of job IDs for which the operation failed.
  KEYS[1] = stalled key
  ARGV[1] = baseKey
  ARGV[2] = tokens
  ARGV[3] = jobIds
  ARGV[4] = lockDuration (ms)
  Output:
    An array of failed job IDs. If empty, all succeeded.
]]
local rcall = redis.call
local stalledKey = KEYS[1]
local baseKey = ARGV[1]
local tokens = cmsgpack.unpack(ARGV[2])
local jobIds = cmsgpack.unpack(ARGV[3])
local lockDuration = ARGV[4]
local jobCount = #jobIds
local failedJobs = {}
for i = 1, jobCount, 1 do
    local lockKey = baseKey .. jobIds[i] .. ':lock'
    local jobId = jobIds[i]
    local token = tokens[i]
    local currentToken = rcall("GET", lockKey)
    if currentToken then
        if currentToken == token then
            local setResult = rcall("SET", lockKey, token, "PX", lockDuration)
            if setResult then
                rcall("SREM", stalledKey, jobId)
            else
                table.insert(failedJobs, jobId)
            end
        else
            table.insert(failedJobs, jobId)
        end
    else
        table.insert(failedJobs, jobId)
    end
end
return failedJobs
`,keys:1},y={name:"getCounts",content:`--[[
  Get counts per provided states
    Input:
      KEYS[1]    'prefix'
      ARGV[1...] types
]]
local rcall = redis.call;
local prefix = KEYS[1]
local results = {}
for i = 1, #ARGV do
  local stateKey = prefix .. ARGV[i]
  if ARGV[i] == "wait" or ARGV[i] == "paused" then
    -- Markers in waitlist DEPRECATED in v5: Remove in v6.
    local marker = rcall("LINDEX", stateKey, -1)
    if marker and string.sub(marker, 1, 2) == "0:" then
      local count = rcall("LLEN", stateKey)
      if count > 1 then
        rcall("RPOP", stateKey)
        results[#results+1] = count-1
      else
        results[#results+1] = 0
      end
    else
      results[#results+1] = rcall("LLEN", stateKey)
    end
  elseif ARGV[i] == "active" then
    results[#results+1] = rcall("LLEN", stateKey)
  else
    results[#results+1] = rcall("ZCARD", stateKey)
  end
end
return results
`,keys:1},z={name:"getCountsPerPriority",content:`--[[
  Get counts per provided states
    Input:
      KEYS[1] wait key
      KEYS[2] paused key
      KEYS[3] meta key
      KEYS[4] prioritized key
      ARGV[1...] priorities
]]
local rcall = redis.call
local results = {}
local waitKey = KEYS[1]
local pausedKey = KEYS[2]
local prioritizedKey = KEYS[4]
-- Includes
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function isQueuePaused(queueMetaKey)
  return rcall("HEXISTS", queueMetaKey, "paused") == 1
end
for i = 1, #ARGV do
  local priority = tonumber(ARGV[i])
  if priority == 0 then
    if isQueuePaused(KEYS[3]) then
      results[#results+1] = rcall("LLEN", pausedKey)
    else
      results[#results+1] = rcall("LLEN", waitKey)
    end
  else
    results[#results+1] = rcall("ZCOUNT", prioritizedKey,
      priority * 0x100000000, (priority + 1)  * 0x100000000 - 1)
  end
end
return results
`,keys:4},A={name:"getDependencyCounts",content:`--[[
  Get counts per child states
    Input:
      KEYS[1]    processed key
      KEYS[2]    unprocessed key
      KEYS[3]    ignored key
      KEYS[4]    failed key
      ARGV[1...] types
]]
local rcall = redis.call;
local processedKey = KEYS[1]
local unprocessedKey = KEYS[2]
local ignoredKey = KEYS[3]
local failedKey = KEYS[4]
local results = {}
for i = 1, #ARGV do
  if ARGV[i] == "processed" then
    results[#results+1] = rcall("HLEN", processedKey)
  elseif ARGV[i] == "unprocessed" then
    results[#results+1] = rcall("SCARD", unprocessedKey)
  elseif ARGV[i] == "ignored" then
    results[#results+1] = rcall("HLEN", ignoredKey)
  else
    results[#results+1] = rcall("ZCARD", failedKey)
  end
end
return results
`,keys:4},B={name:"getJobScheduler",content:`--[[
  Get job scheduler record.
  Input:
    KEYS[1] 'repeat' key
    ARGV[1] id
]]
local rcall = redis.call
local jobSchedulerKey = KEYS[1] .. ":" .. ARGV[1]
local score = rcall("ZSCORE", KEYS[1], ARGV[1])
if score then
  return {rcall("HGETALL", jobSchedulerKey), score} -- get job data
end
return {nil, nil}
`,keys:1},C={name:"getMetrics",content:`--[[
  Get metrics
  Input:
    KEYS[1] 'metrics' key
    KEYS[2] 'metrics data' key
    ARGV[1] start index
    ARGV[2] end index
]]
local rcall = redis.call;
local metricsKey = KEYS[1]
local dataKey = KEYS[2]
local metrics = rcall("HMGET", metricsKey, "count", "prevTS", "prevCount")
local data = rcall("LRANGE", dataKey, tonumber(ARGV[1]), tonumber(ARGV[2]))
local numPoints = rcall("LLEN", dataKey)
return {metrics, data, numPoints}
`,keys:2},D={name:"getRanges",content:`--[[
  Get job ids per provided states
    Input:
      KEYS[1]    'prefix'
      ARGV[1]    start
      ARGV[2]    end
      ARGV[3]    asc
      ARGV[4...] types
]]
local rcall = redis.call
local prefix = KEYS[1]
local rangeStart = tonumber(ARGV[1])
local rangeEnd = tonumber(ARGV[2])
local asc = ARGV[3]
local results = {}
local function getRangeInList(listKey, asc, rangeStart, rangeEnd, results)
  if asc == "1" then
    local modifiedRangeStart
    local modifiedRangeEnd
    if rangeStart == -1 then
      modifiedRangeStart = 0
    else
      modifiedRangeStart = -(rangeStart + 1)
    end
    if rangeEnd == -1 then
      modifiedRangeEnd = 0
    else
      modifiedRangeEnd = -(rangeEnd + 1)
    end
    results[#results+1] = rcall("LRANGE", listKey,
      modifiedRangeEnd,
      modifiedRangeStart)
  else
    results[#results+1] = rcall("LRANGE", listKey, rangeStart, rangeEnd)
  end
end
for i = 4, #ARGV do
  local stateKey = prefix .. ARGV[i]
  if ARGV[i] == "wait" or ARGV[i] == "paused" then
    -- Markers in waitlist DEPRECATED in v5: Remove in v6.
    local marker = rcall("LINDEX", stateKey, -1)
    if marker and string.sub(marker, 1, 2) == "0:" then
      local count = rcall("LLEN", stateKey)
      if count > 1 then
        rcall("RPOP", stateKey)
        getRangeInList(stateKey, asc, rangeStart, rangeEnd, results)
      else
        results[#results+1] = {}
      end
    else
      getRangeInList(stateKey, asc, rangeStart, rangeEnd, results)
    end
  elseif ARGV[i] == "active" then
    getRangeInList(stateKey, asc, rangeStart, rangeEnd, results)
  else
    if asc == "1" then
      results[#results+1] = rcall("ZRANGE", stateKey, rangeStart, rangeEnd)
    else
      results[#results+1] = rcall("ZREVRANGE", stateKey, rangeStart, rangeEnd)
    end
  end
end
return results
`,keys:1},E={name:"getRateLimitTtl",content:`--[[
  Get rate limit ttl
    Input:
      KEYS[1] 'limiter'
      KEYS[2] 'meta'
      ARGV[1] maxJobs
]]
local rcall = redis.call
-- Includes
--[[
  Function to get current rate limit ttl.
]]
local function getRateLimitTTL(maxJobs, rateLimiterKey)
  if maxJobs and maxJobs <= tonumber(rcall("GET", rateLimiterKey) or 0) then
    local pttl = rcall("PTTL", rateLimiterKey)
    if pttl == 0 then
      rcall("DEL", rateLimiterKey)
    end
    if pttl > 0 then
      return pttl
    end
  end
  return 0
end
local rateLimiterKey = KEYS[1]
if ARGV[1] ~= "0" then
  return getRateLimitTTL(tonumber(ARGV[1]), rateLimiterKey)
else
  local rateLimitMax = rcall("HGET", KEYS[2], "max")
  if rateLimitMax then
    return getRateLimitTTL(tonumber(rateLimitMax), rateLimiterKey)
  end
  return rcall("PTTL", rateLimiterKey)
end
`,keys:2},F={name:"getState",content:`--[[
  Get a job state
  Input: 
    KEYS[1] 'completed' key,
    KEYS[2] 'failed' key
    KEYS[3] 'delayed' key
    KEYS[4] 'active' key
    KEYS[5] 'wait' key
    KEYS[6] 'paused' key
    KEYS[7] 'waiting-children' key
    KEYS[8] 'prioritized' key
    ARGV[1] job id
  Output:
    'completed'
    'failed'
    'delayed'
    'active'
    'prioritized'
    'waiting'
    'waiting-children'
    'unknown'
]]
local rcall = redis.call
if rcall("ZSCORE", KEYS[1], ARGV[1]) then
  return "completed"
end
if rcall("ZSCORE", KEYS[2], ARGV[1]) then
  return "failed"
end
if rcall("ZSCORE", KEYS[3], ARGV[1]) then
  return "delayed"
end
if rcall("ZSCORE", KEYS[8], ARGV[1]) then
  return "prioritized"
end
-- Includes
--[[
  Functions to check if a item belongs to a list.
]]
local function checkItemInList(list, item)
  for _, v in pairs(list) do
    if v == item then
      return 1
    end
  end
  return nil
end
local active_items = rcall("LRANGE", KEYS[4] , 0, -1)
if checkItemInList(active_items, ARGV[1]) ~= nil then
  return "active"
end
local wait_items = rcall("LRANGE", KEYS[5] , 0, -1)
if checkItemInList(wait_items, ARGV[1]) ~= nil then
  return "waiting"
end
local paused_items = rcall("LRANGE", KEYS[6] , 0, -1)
if checkItemInList(paused_items, ARGV[1]) ~= nil then
  return "waiting"
end
if rcall("ZSCORE", KEYS[7], ARGV[1]) then
  return "waiting-children"
end
return "unknown"
`,keys:8},G={name:"getStateV2",content:`--[[
  Get a job state
  Input: 
    KEYS[1] 'completed' key,
    KEYS[2] 'failed' key
    KEYS[3] 'delayed' key
    KEYS[4] 'active' key
    KEYS[5] 'wait' key
    KEYS[6] 'paused' key
    KEYS[7] 'waiting-children' key
    KEYS[8] 'prioritized' key
    ARGV[1] job id
  Output:
    'completed'
    'failed'
    'delayed'
    'active'
    'waiting'
    'waiting-children'
    'unknown'
]]
local rcall = redis.call
if rcall("ZSCORE", KEYS[1], ARGV[1]) then
  return "completed"
end
if rcall("ZSCORE", KEYS[2], ARGV[1]) then
  return "failed"
end
if rcall("ZSCORE", KEYS[3], ARGV[1]) then
  return "delayed"
end
if rcall("ZSCORE", KEYS[8], ARGV[1]) then
  return "prioritized"
end
if rcall("LPOS", KEYS[4] , ARGV[1]) then
  return "active"
end
if rcall("LPOS", KEYS[5] , ARGV[1]) then
  return "waiting"
end
if rcall("LPOS", KEYS[6] , ARGV[1]) then
  return "waiting"
end
if rcall("ZSCORE", KEYS[7] , ARGV[1]) then
  return "waiting-children"
end
return "unknown"
`,keys:8},H={name:"isFinished",content:`--[[
  Checks if a job is finished (.i.e. is in the completed or failed set)
  Input: 
    KEYS[1] completed key
    KEYS[2] failed key
    KEYS[3] job key
    ARGV[1] job id
    ARGV[2] return value?
  Output:
    0 - Not finished.
    1 - Completed.
    2 - Failed.
   -1 - Missing job. 
]]
local rcall = redis.call
if rcall("EXISTS", KEYS[3]) ~= 1 then
  if ARGV[2] == "1" then
    return {-1,"Missing key for job " .. KEYS[3] .. ". isFinished"}
  end  
  return -1
end
if rcall("ZSCORE", KEYS[1], ARGV[1]) then
  if ARGV[2] == "1" then
    local returnValue = rcall("HGET", KEYS[3], "returnvalue")
    return {1,returnValue}
  end
  return 1
end
if rcall("ZSCORE", KEYS[2], ARGV[1]) then
  if ARGV[2] == "1" then
    local failedReason = rcall("HGET", KEYS[3], "failedReason")
    return {2,failedReason}
  end
  return 2
end
if ARGV[2] == "1" then
  return {0}
end
return 0
`,keys:3},I={name:"isJobInList",content:`--[[
  Checks if job is in a given list.
  Input:
    KEYS[1]
    ARGV[1]
  Output:
    1 if element found in the list.
]]
-- Includes
--[[
  Functions to check if a item belongs to a list.
]]
local function checkItemInList(list, item)
  for _, v in pairs(list) do
    if v == item then
      return 1
    end
  end
  return nil
end
local items = redis.call("LRANGE", KEYS[1] , 0, -1)
return checkItemInList(items, ARGV[1])
`,keys:1},J={name:"isMaxed",content:`--[[
  Checks if queue is maxed.
  Input:
    KEYS[1] meta key
    KEYS[2] active key
  Output:
    1 if element found in the list.
]]
local rcall = redis.call
-- Includes
--[[
  Function to check if queue is maxed or not.
]]
local function isQueueMaxed(queueMetaKey, activeKey)
  local maxConcurrency = rcall("HGET", queueMetaKey, "concurrency")
  if maxConcurrency then
    local activeCount = rcall("LLEN", activeKey)
    if activeCount >= tonumber(maxConcurrency) then
      return true
    end
  end
  return false
end
return isQueueMaxed(KEYS[1], KEYS[2])
`,keys:2},K={name:"moveJobFromActiveToWait",content:`--[[
  Function to move job from active state to wait.
  Input:
    KEYS[1]  active key
    KEYS[2]  wait key
    KEYS[3]  stalled key
    KEYS[4]  paused key
    KEYS[5]  meta key
    KEYS[6]  limiter key
    KEYS[7]  prioritized key
    KEYS[8]  marker key
    KEYS[9]  event key
    ARGV[1] job id
    ARGV[2] lock token
    ARGV[3] job id key
]]
local rcall = redis.call
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to push back job considering priority in front of same prioritized jobs.
]]
local function pushBackJobWithPriority(prioritizedKey, priority, jobId)
  -- in order to put it at front of same prioritized jobs
  -- we consider prioritized counter as 0
  local score = priority * 0x100000000
  rcall("ZADD", prioritizedKey, score, jobId)
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
local function removeLock(jobKey, stalledKey, token, jobId)
  if token ~= "0" then
    local lockKey = jobKey .. ':lock'
    local lockToken = rcall("GET", lockKey)
    if lockToken == token then
      rcall("DEL", lockKey)
      rcall("SREM", stalledKey, jobId)
    else
      if lockToken then
        -- Lock exists but token does not match
        return -6
      else
        -- Lock is missing completely
        return -2
      end
    end
  end
  return 0
end
local jobId = ARGV[1]
local token = ARGV[2]
local jobKey = ARGV[3]
if rcall("EXISTS", jobKey) == 0 then
  return -1
end
local errorCode = removeLock(jobKey, KEYS[3], token, jobId)
if errorCode < 0 then
  return errorCode
end
local metaKey = KEYS[5]
local removed = rcall("LREM", KEYS[1], 1, jobId)
if removed > 0 then
  local target, isPausedOrMaxed = getTargetQueueList(metaKey, KEYS[1], KEYS[2], KEYS[4])
  local priority = tonumber(rcall("HGET", ARGV[3], "priority")) or 0
  if priority > 0 then
    pushBackJobWithPriority(KEYS[7], priority, jobId)
  else
    addJobInTargetList(target, KEYS[8], "RPUSH", isPausedOrMaxed, jobId)
  end
  local maxEvents = getOrSetMaxEvents(metaKey)
  -- Emit waiting event
  rcall("XADD", KEYS[9], "MAXLEN", "~", maxEvents, "*", "event", "waiting",
    "jobId", jobId, "prev", "active")
end
local pttl = rcall("PTTL", KEYS[6])
if pttl > 0 then
  return pttl
else
  return 0
end
`,keys:9},L={name:"moveJobsToWait",content:`--[[
  Move completed, failed or delayed jobs to wait.
  Note: Does not support jobs with priorities.
  Input:
    KEYS[1] base key
    KEYS[2] events stream
    KEYS[3] state key (failed, completed, delayed)
    KEYS[4] 'wait'
    KEYS[5] 'paused'
    KEYS[6] 'meta'
    KEYS[7] 'active'
    KEYS[8] 'marker'
    ARGV[1] count
    ARGV[2] timestamp
    ARGV[3] prev state
  Output:
    1  means the operation is not completed
    0  means the operation is completed
]]
local maxCount = tonumber(ARGV[1])
local timestamp = tonumber(ARGV[2])
local rcall = redis.call;
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
--[[
  Function to loop in batches.
  Just a bit of warning, some commands as ZREM
  could receive a maximum of 7000 parameters per call.
]]
local function batches(n, batchSize)
  local i = 0
  return function()
    local from = i * batchSize + 1
    i = i + 1
    if (from <= n) then
      local to = math.min(from + batchSize - 1, n)
      return from, to
    end
  end
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
local metaKey = KEYS[6]
local target, isPausedOrMaxed = getTargetQueueList(metaKey, KEYS[7], KEYS[4], KEYS[5])
local jobs = rcall('ZRANGEBYSCORE', KEYS[3], 0, timestamp, 'LIMIT', 0, maxCount)
if (#jobs > 0) then
    if ARGV[3] == "failed" then
        for i, key in ipairs(jobs) do
            local jobKey = KEYS[1] .. key
            rcall("HDEL", jobKey, "finishedOn", "processedOn", "failedReason")
        end
    elseif ARGV[3] == "completed" then
        for i, key in ipairs(jobs) do
            local jobKey = KEYS[1] .. key
            rcall("HDEL", jobKey, "finishedOn", "processedOn", "returnvalue")
        end
    end
    local maxEvents = getOrSetMaxEvents(metaKey)
    for i, key in ipairs(jobs) do
        -- Emit waiting event
        rcall("XADD", KEYS[2], "MAXLEN", "~", maxEvents, "*", "event",
              "waiting", "jobId", key, "prev", ARGV[3]);
    end
    for from, to in batches(#jobs, 7000) do
        rcall("ZREM", KEYS[3], unpack(jobs, from, to))
        rcall("LPUSH", target, unpack(jobs, from, to))
    end
    addBaseMarkerIfNeeded(KEYS[8], isPausedOrMaxed)
end
maxCount = maxCount - #jobs
if (maxCount <= 0) then return 1 end
return 0
`,keys:8},M={name:"moveStalledJobsToWait",content:`--[[
  Move stalled jobs to wait.
    Input:
      KEYS[1] 'stalled' (SET)
      KEYS[2] 'wait',   (LIST)
      KEYS[3] 'active', (LIST)
      KEYS[4] 'stalled-check', (KEY)
      KEYS[5] 'meta', (KEY)
      KEYS[6] 'paused', (LIST)
      KEYS[7] 'marker'
      KEYS[8] 'event stream' (STREAM)
      ARGV[1]  Max stalled job count
      ARGV[2]  queue.toKey('')
      ARGV[3]  timestamp
      ARGV[4]  max check time
    Events:
      'stalled' with stalled job id.
]]
local rcall = redis.call
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to loop in batches.
  Just a bit of warning, some commands as ZREM
  could receive a maximum of 7000 parameters per call.
]]
local function batches(n, batchSize)
  local i = 0
  return function()
    local from = i * batchSize + 1
    i = i + 1
    if (from <= n) then
      local to = math.min(from + batchSize - 1, n)
      return from, to
    end
  end
end
--[[
  Function to move job to wait to be picked up by a waiting worker.
]]
-- Includes
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
local function moveJobToWait(metaKey, activeKey, waitKey, pausedKey, markerKey, eventStreamKey,
  jobId, pushCmd)
  local target, isPausedOrMaxed = getTargetQueueList(metaKey, activeKey, waitKey, pausedKey)
  addJobInTargetList(target, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall("XADD", eventStreamKey, "*", "event", "waiting", "jobId", jobId, 'prev', 'active')
end
--[[
  Function to trim events, default 10000.
]]
-- Includes
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
local function trimEvents(metaKey, eventStreamKey)
  local maxEvents = getOrSetMaxEvents(metaKey)
  if maxEvents then
    rcall("XTRIM", eventStreamKey, "MAXLEN", "~", maxEvents)
  else
    rcall("XTRIM", eventStreamKey, "MAXLEN", "~", 10000)
  end
end
local stalledKey = KEYS[1]
local waitKey = KEYS[2]
local activeKey = KEYS[3]
local stalledCheckKey = KEYS[4]
local metaKey = KEYS[5]
local pausedKey = KEYS[6]
local markerKey = KEYS[7]
local eventStreamKey = KEYS[8]
local maxStalledJobCount = tonumber(ARGV[1])
local queueKeyPrefix = ARGV[2]
local timestamp = ARGV[3]
local maxCheckTime = ARGV[4]
if rcall("EXISTS", stalledCheckKey) == 1 then
    return {}
end
rcall("SET", stalledCheckKey, timestamp, "PX", maxCheckTime)
-- Trim events before emiting them to avoid trimming events emitted in this script
trimEvents(metaKey, eventStreamKey)
-- Move all stalled jobs to wait
local stalling = rcall('SMEMBERS', stalledKey)
local stalled = {}
if (#stalling > 0) then
    rcall('DEL', stalledKey)
    -- Remove from active list
    for i, jobId in ipairs(stalling) do
        -- Markers in waitlist DEPRECATED in v5: Remove in v6.
        if string.sub(jobId, 1, 2) == "0:" then
            -- If the jobId is a delay marker ID we just remove it.
            rcall("LREM", activeKey, 1, jobId)
        else
            local jobKey = queueKeyPrefix .. jobId
            -- Check that the lock is also missing, then we can handle this job as really stalled.
            if (rcall("EXISTS", jobKey .. ":lock") == 0) then
                --  Remove from the active queue.
                local removed = rcall("LREM", activeKey, 1, jobId)
                if (removed > 0) then
                    -- If this job has been stalled too many times, such as if it crashes the worker, then fail it.
                    local stalledCount = rcall("HINCRBY", jobKey, "stc", 1)
                    -- Check if this is a repeatable job by looking at job options
                    local jobOpts = rcall("HGET", jobKey, "opts")
                    local isRepeatableJob = false
                    if jobOpts then
                        local opts = cjson.decode(jobOpts)
                        if opts and opts["repeat"] then
                            isRepeatableJob = true
                        end
                    end
                    -- Only fail job if it exceeds stall limit AND is not a repeatable job
                    if stalledCount > maxStalledJobCount and not isRepeatableJob then
                        local failedReason = "job stalled more than allowable limit"
                        rcall("HSET", jobKey, "defa", failedReason)
                    end
                    moveJobToWait(metaKey, activeKey, waitKey, pausedKey, markerKey, eventStreamKey, jobId,
                        "RPUSH")
                    -- Emit the stalled event
                    rcall("XADD", eventStreamKey, "*", "event", "stalled", "jobId", jobId)
                    table.insert(stalled, jobId)
                end
            end
        end
    end
end
-- Mark potentially stalled jobs
local active = rcall('LRANGE', activeKey, 0, -1)
if (#active > 0) then
    for from, to in batches(#active, 7000) do
        rcall('SADD', stalledKey, unpack(active, from, to))
    end
end
return stalled
`,keys:8},N={name:"moveToActive",content:`--[[
  Move next job to be processed to active, lock it and fetch its data. The job
  may be delayed, in that case we need to move it to the delayed set instead.
  This operation guarantees that the worker owns the job during the lock
  expiration time. The worker is responsible of keeping the lock fresh
  so that no other worker picks this job again.
  Input:
    KEYS[1] wait key
    KEYS[2] active key
    KEYS[3] prioritized key
    KEYS[4] stream events key
    KEYS[5] stalled key
    -- Rate limiting
    KEYS[6] rate limiter key
    KEYS[7] delayed key
    -- Delayed jobs
    KEYS[8] paused key
    KEYS[9] meta key
    KEYS[10] pc priority counter
    -- Marker
    KEYS[11] marker key
    -- Arguments
    ARGV[1] key prefix
    ARGV[2] timestamp
    ARGV[3] opts
    opts - token - lock token
    opts - lockDuration
    opts - limiter
    opts - name - worker name
]]
local rcall = redis.call
local waitKey = KEYS[1]
local activeKey = KEYS[2]
local eventStreamKey = KEYS[4]
local rateLimiterKey = KEYS[6]
local delayedKey = KEYS[7]
local opts = cmsgpack.unpack(ARGV[3])
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if nextTimestamp ~= nil then
      return nextTimestamp / 0x1000
    end
  end
end
--[[
  Function to get current rate limit ttl.
]]
local function getRateLimitTTL(maxJobs, rateLimiterKey)
  if maxJobs and maxJobs <= tonumber(rcall("GET", rateLimiterKey) or 0) then
    local pttl = rcall("PTTL", rateLimiterKey)
    if pttl == 0 then
      rcall("DEL", rateLimiterKey)
    end
    if pttl > 0 then
      return pttl
    end
  end
  return 0
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
--[[
  Function to move job from prioritized state to active.
]]
local function moveJobFromPrioritizedToActive(priorityKey, activeKey, priorityCounterKey)
  local prioritizedJob = rcall("ZPOPMIN", priorityKey)
  if #prioritizedJob > 0 then
    rcall("LPUSH", activeKey, prioritizedJob[1])
    return prioritizedJob[1]
  else
    rcall("DEL", priorityCounterKey)
  end
end
--[[
  Function to move job from wait state to active.
  Input:
    opts - token - lock token
    opts - lockDuration
    opts - limiter
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function prepareJobForProcessing(keyPrefix, rateLimiterKey, eventStreamKey,
    jobId, processedOn, maxJobs, limiterDuration, markerKey, opts)
  local jobKey = keyPrefix .. jobId
  -- Check if we need to perform rate limiting.
  if maxJobs then
    local jobCounter = tonumber(rcall("INCR", rateLimiterKey))
    if jobCounter == 1 then
      local integerDuration = math.floor(math.abs(limiterDuration))
      rcall("PEXPIRE", rateLimiterKey, integerDuration)
    end
  end
  -- get a lock
  if opts['token'] ~= "0" then
    local lockKey = jobKey .. ':lock'
    rcall("SET", lockKey, opts['token'], "PX", opts['lockDuration'])
  end
  local optionalValues = {}
  if opts['name'] then
    -- Set "processedBy" field to the worker name
    table.insert(optionalValues, "pb")
    table.insert(optionalValues, opts['name'])
  end
  rcall("XADD", eventStreamKey, "*", "event", "active", "jobId", jobId, "prev", "waiting")
  rcall("HMSET", jobKey, "processedOn", processedOn, unpack(optionalValues))
  rcall("HINCRBY", jobKey, "ats", 1)
  addBaseMarkerIfNeeded(markerKey, false)
  -- rate limit delay must be 0 in this case to prevent adding more delay
  -- when job that is moved to active needs to be processed
  return {rcall("HGETALL", jobKey), jobId, 0, 0} -- get job data
end
--[[
  Updates the delay set, by moving delayed jobs that should
  be processed now to "wait".
     Events:
      'waiting'
]]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Function to get priority score.
]]
local function getPriorityScore(priority, priorityCounterKey)
  local prioCounter = rcall("INCR", priorityCounterKey)
  return priority * 0x100000000 + prioCounter % 0x100000000
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey,
  isPausedOrMaxed)
  local score = getPriorityScore(priority, priorityCounterKey)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
-- Try to get as much as 1000 jobs at once
local function promoteDelayedJobs(delayedKey, markerKey, targetKey, prioritizedKey,
                                  eventStreamKey, prefix, timestamp, priorityCounterKey, isPaused)
    local jobs = rcall("ZRANGEBYSCORE", delayedKey, 0, (timestamp + 1) * 0x1000 - 1, "LIMIT", 0, 1000)
    if (#jobs > 0) then
        rcall("ZREM", delayedKey, unpack(jobs))
        for _, jobId in ipairs(jobs) do
            local jobKey = prefix .. jobId
            local priority =
                tonumber(rcall("HGET", jobKey, "priority")) or 0
            if priority == 0 then
                -- LIFO or FIFO
                rcall("LPUSH", targetKey, jobId)
            else
                local score = getPriorityScore(priority, priorityCounterKey)
                rcall("ZADD", prioritizedKey, score, jobId)
            end
            -- Emit waiting event
            rcall("XADD", eventStreamKey, "*", "event", "waiting", "jobId",
                  jobId, "prev", "delayed")
            rcall("HSET", jobKey, "delay", 0)
        end
        addBaseMarkerIfNeeded(markerKey, isPaused)
    end
end
local target, isPausedOrMaxed, rateLimitMax, rateLimitDuration = getTargetQueueList(KEYS[9],
    activeKey, waitKey, KEYS[8])
-- Check if there are delayed jobs that we can move to wait.
local markerKey = KEYS[11]
promoteDelayedJobs(delayedKey, markerKey, target, KEYS[3], eventStreamKey, ARGV[1],
                   ARGV[2], KEYS[10], isPausedOrMaxed)
local maxJobs = tonumber(rateLimitMax or (opts['limiter'] and opts['limiter']['max']))
local expireTime = getRateLimitTTL(maxJobs, rateLimiterKey)
-- Check if we are rate limited first.
if expireTime > 0 then return {0, 0, expireTime, 0} end
-- paused or maxed queue
if isPausedOrMaxed then return {0, 0, 0, 0} end
local limiterDuration = (opts['limiter'] and opts['limiter']['duration']) or rateLimitDuration
-- no job ID, try non-blocking move from wait to active
local jobId = rcall("RPOPLPUSH", waitKey, activeKey)
-- Markers in waitlist DEPRECATED in v5: Will be completely removed in v6.
if jobId and string.sub(jobId, 1, 2) == "0:" then
    rcall("LREM", activeKey, 1, jobId)
    jobId = rcall("RPOPLPUSH", waitKey, activeKey)
end
if jobId then
    return prepareJobForProcessing(ARGV[1], rateLimiterKey, eventStreamKey, jobId, ARGV[2],
                                   maxJobs, limiterDuration, markerKey, opts)
else
    jobId = moveJobFromPrioritizedToActive(KEYS[3], activeKey, KEYS[10])
    if jobId then
        return prepareJobForProcessing(ARGV[1], rateLimiterKey, eventStreamKey, jobId, ARGV[2],
                                       maxJobs, limiterDuration, markerKey, opts)
    end
end
-- Return the timestamp for the next delayed job if any.
local nextTimestamp = getNextDelayedTimestamp(delayedKey)
if nextTimestamp ~= nil then return {0, 0, 0, nextTimestamp} end
return {0, 0, 0, 0}
`,keys:11},O={name:"moveToDelayed",content:`--[[
  Moves job from active to delayed set.
  Input:
    KEYS[1] marker key
    KEYS[2] active key
    KEYS[3] prioritized key
    KEYS[4] delayed key
    KEYS[5] job key
    KEYS[6] events stream
    KEYS[7] meta key
    KEYS[8] stalled key
    ARGV[1] key prefix
    ARGV[2] timestamp
    ARGV[3] the id of the job
    ARGV[4] queue token
    ARGV[5] delay value
    ARGV[6] skip attempt
    ARGV[7] optional job fields to update
  Output:
    0 - OK
   -1 - Missing job.
   -3 - Job not in active set.
  Events:
    - delayed key.
]]
local rcall = redis.call
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if nextTimestamp ~= nil then
      return nextTimestamp / 0x1000
    end
  end
end
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
  local nextTimestamp = getNextDelayedTimestamp(delayedKey)
  if nextTimestamp ~= nil then
    -- Replace the score of the marker with the newest known
    -- next timestamp.
    rcall("ZADD", markerKey, nextTimestamp, "1")
  end
end
--[[
  Bake in the job id first 12 bits into the timestamp
  to guarantee correct execution order of delayed jobs
  (up to 4096 jobs per given timestamp or 4096 jobs apart per timestamp)
  WARNING: Jobs that are so far apart that they wrap around will cause FIFO to fail
]]
local function getDelayedScore(delayedKey, timestamp, delay)
  local delayedTimestamp = (delay > 0 and (tonumber(timestamp) + delay)) or tonumber(timestamp)
  local minScore = delayedTimestamp * 0x1000
  local maxScore = (delayedTimestamp + 1 ) * 0x1000 - 1
  local result = rcall("ZREVRANGEBYSCORE", delayedKey, maxScore,
    minScore, "WITHSCORES","LIMIT", 0, 1)
  if #result then
    local currentMaxScore = tonumber(result[2])
    if currentMaxScore ~= nil then
      if currentMaxScore >= maxScore then
        return maxScore, delayedTimestamp
      else
        return currentMaxScore + 1, delayedTimestamp
      end
    end
  end
  return minScore, delayedTimestamp
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
local function removeLock(jobKey, stalledKey, token, jobId)
  if token ~= "0" then
    local lockKey = jobKey .. ':lock'
    local lockToken = rcall("GET", lockKey)
    if lockToken == token then
      rcall("DEL", lockKey)
      rcall("SREM", stalledKey, jobId)
    else
      if lockToken then
        -- Lock exists but token does not match
        return -6
      else
        -- Lock is missing completely
        return -2
      end
    end
  end
  return 0
end
--[[
  Function to update a bunch of fields in a job.
]]
local function updateJobFields(jobKey, msgpackedFields)
  if msgpackedFields and #msgpackedFields > 0 then
    local fieldsToUpdate = cmsgpack.unpack(msgpackedFields)
    if fieldsToUpdate then
      rcall("HMSET", jobKey, unpack(fieldsToUpdate))
    end
  end
end
local jobKey = KEYS[5]
local metaKey = KEYS[7]
local token = ARGV[4] 
if rcall("EXISTS", jobKey) == 1 then
    local errorCode = removeLock(jobKey, KEYS[8], token, ARGV[3])
    if errorCode < 0 then
        return errorCode
    end
    updateJobFields(jobKey, ARGV[7])
    local delayedKey = KEYS[4]
    local jobId = ARGV[3]
    local delay = tonumber(ARGV[5])
    local numRemovedElements = rcall("LREM", KEYS[2], -1, jobId)
    if numRemovedElements < 1 then return -3 end
    local score, delayedTimestamp = getDelayedScore(delayedKey, ARGV[2], delay)
    if ARGV[6] == "0" then
        rcall("HINCRBY", jobKey, "atm", 1)
    end
    rcall("HSET", jobKey, "delay", ARGV[5])
    local maxEvents = getOrSetMaxEvents(metaKey)
    rcall("ZADD", delayedKey, score, jobId)
    rcall("XADD", KEYS[6], "MAXLEN", "~", maxEvents, "*", "event", "delayed",
          "jobId", jobId, "delay", delayedTimestamp)
    -- Check if we need to push a marker job to wake up sleeping workers.
    local markerKey = KEYS[1]
    addDelayMarkerIfNeeded(markerKey, delayedKey)
    return 0
else
    return -1
end
`,keys:8},P={name:"moveToFinished",content:`--[[
  Move job from active to a finished status (completed o failed)
  A job can only be moved to completed if it was active.
  The job must be locked before it can be moved to a finished status,
  and the lock must be released in this script.
    Input:
      KEYS[1] wait key
      KEYS[2] active key
      KEYS[3] prioritized key
      KEYS[4] event stream key
      KEYS[5] stalled key
      -- Rate limiting
      KEYS[6] rate limiter key
      KEYS[7] delayed key
      KEYS[8] paused key
      KEYS[9] meta key
      KEYS[10] pc priority counter
      KEYS[11] completed/failed key
      KEYS[12] jobId key
      KEYS[13] metrics key
      KEYS[14] marker key
      ARGV[1]  jobId
      ARGV[2]  timestamp
      ARGV[3]  msg property returnvalue / failedReason
      ARGV[4]  return value / failed reason
      ARGV[5]  target (completed/failed)
      ARGV[6]  fetch next?
      ARGV[7]  keys prefix
      ARGV[8]  opts
      ARGV[9]  job fields to update
      opts - token - lock token
      opts - keepJobs
      opts - lockDuration - lock duration in milliseconds
      opts - attempts max attempts
      opts - maxMetricsSize
      opts - fpof - fail parent on fail
      opts - cpof - continue parent on fail
      opts - idof - ignore dependency on fail
      opts - rdof - remove dependency on fail
      opts - name - worker name
    Output:
      0 OK
      -1 Missing key.
      -2 Missing lock.
      -3 Job not in active set
      -4 Job has pending children
      -6 Lock is not owned by this client
      -9 Job has failed children
    Events:
      'completed/failed'
]]
local rcall = redis.call
--- Includes
--[[
  Functions to collect metrics based on a current and previous count of jobs.
  Granualarity is fixed at 1 minute.
]]
--[[
  Function to loop in batches.
  Just a bit of warning, some commands as ZREM
  could receive a maximum of 7000 parameters per call.
]]
local function batches(n, batchSize)
  local i = 0
  return function()
    local from = i * batchSize + 1
    i = i + 1
    if (from <= n) then
      local to = math.min(from + batchSize - 1, n)
      return from, to
    end
  end
end
local function collectMetrics(metaKey, dataPointsList, maxDataPoints,
                                 timestamp)
    -- Increment current count
    local count = rcall("HINCRBY", metaKey, "count", 1) - 1
    -- Compute how many data points we need to add to the list, N.
    local prevTS = rcall("HGET", metaKey, "prevTS")
    if not prevTS then
        -- If prevTS is nil, set it to the current timestamp
        rcall("HSET", metaKey, "prevTS", timestamp, "prevCount", 0)
        return
    end
    local N = math.min(math.floor(timestamp / 60000) - math.floor(prevTS / 60000), tonumber(maxDataPoints))
    if N > 0 then
        local delta = count - rcall("HGET", metaKey, "prevCount")
        -- If N > 1, add N-1 zeros to the list
        if N > 1 then
            local points = {}
            points[1] = delta
            for i = 2, N do
                points[i] = 0
            end
            for from, to in batches(#points, 7000) do
                rcall("LPUSH", dataPointsList, unpack(points, from, to))
            end
        else
            -- LPUSH delta to the list
            rcall("LPUSH", dataPointsList, delta)
        end
        -- LTRIM to keep list to its max size
        rcall("LTRIM", dataPointsList, 0, maxDataPoints - 1)
        -- update prev count with current count
        rcall("HSET", metaKey, "prevCount", count, "prevTS", timestamp)
    end
end
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if nextTimestamp ~= nil then
      return nextTimestamp / 0x1000
    end
  end
end
--[[
  Function to get current rate limit ttl.
]]
local function getRateLimitTTL(maxJobs, rateLimiterKey)
  if maxJobs and maxJobs <= tonumber(rcall("GET", rateLimiterKey) or 0) then
    local pttl = rcall("PTTL", rateLimiterKey)
    if pttl == 0 then
      rcall("DEL", rateLimiterKey)
    end
    if pttl > 0 then
      return pttl
    end
  end
  return 0
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
--[[
  Function to move job from prioritized state to active.
]]
local function moveJobFromPrioritizedToActive(priorityKey, activeKey, priorityCounterKey)
  local prioritizedJob = rcall("ZPOPMIN", priorityKey)
  if #prioritizedJob > 0 then
    rcall("LPUSH", activeKey, prioritizedJob[1])
    return prioritizedJob[1]
  else
    rcall("DEL", priorityCounterKey)
  end
end
--[[
  Function to recursively move from waitingChildren to failed.
]]
-- Includes
--[[
  Validate and move parent to a wait status (waiting, delayed or prioritized)
  if no pending dependencies.
]]
-- Includes
--[[
  Validate and move parent to a wait status (waiting, delayed or prioritized) if needed.
]]
-- Includes
--[[
  Move parent to a wait status (wait, prioritized or delayed)
]]
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
  local nextTimestamp = getNextDelayedTimestamp(delayedKey)
  if nextTimestamp ~= nil then
    -- Replace the score of the marker with the newest known
    -- next timestamp.
    rcall("ZADD", markerKey, nextTimestamp, "1")
  end
end
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Function to get priority score.
]]
local function getPriorityScore(priority, priorityCounterKey)
  local prioCounter = rcall("INCR", priorityCounterKey)
  return priority * 0x100000000 + prioCounter % 0x100000000
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey,
  isPausedOrMaxed)
  local score = getPriorityScore(priority, priorityCounterKey)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to check if queue is paused or maxed
  (since an empty list and !EXISTS are not really the same).
]]
local function isQueuePausedOrMaxed(queueMetaKey, activeKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      return activeCount >= tonumber(queueAttributes[2])
    end
  end
  return false
end
local function moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    local parentWaitKey = parentQueueKey .. ":wait"
    local parentPausedKey = parentQueueKey .. ":paused"
    local parentActiveKey = parentQueueKey .. ":active"
    local parentMetaKey = parentQueueKey .. ":meta"
    local parentMarkerKey = parentQueueKey .. ":marker"
    local jobAttributes = rcall("HMGET", parentKey, "priority", "delay")
    local priority = tonumber(jobAttributes[1]) or 0
    local delay = tonumber(jobAttributes[2]) or 0
    if delay > 0 then
        local delayedTimestamp = tonumber(timestamp) + delay
        local score = delayedTimestamp * 0x1000
        local parentDelayedKey = parentQueueKey .. ":delayed"
        rcall("ZADD", parentDelayedKey, score, parentId)
        rcall("XADD", parentQueueKey .. ":events", "*", "event", "delayed", "jobId", parentId, "delay",
            delayedTimestamp)
        addDelayMarkerIfNeeded(parentMarkerKey, parentDelayedKey)
    else
        if priority == 0 then
            local parentTarget, isParentPausedOrMaxed = getTargetQueueList(parentMetaKey, parentActiveKey,
                parentWaitKey, parentPausedKey)
            addJobInTargetList(parentTarget, parentMarkerKey, "RPUSH", isParentPausedOrMaxed, parentId)
        else
            local isPausedOrMaxed = isQueuePausedOrMaxed(parentMetaKey, parentActiveKey)
            addJobWithPriority(parentMarkerKey, parentQueueKey .. ":prioritized", priority, parentId,
                parentQueueKey .. ":pc", isPausedOrMaxed)
        end
        rcall("XADD", parentQueueKey .. ":events", "*", "event", "waiting", "jobId", parentId, "prev",
            "waiting-children")
    end
end
local function moveParentToWaitIfNeeded(parentQueueKey, parentKey, parentId, timestamp)
  if rcall("EXISTS", parentKey) == 1 then
    local parentWaitingChildrenKey = parentQueueKey .. ":waiting-children"
    if rcall("ZSCORE", parentWaitingChildrenKey, parentId) then    
      rcall("ZREM", parentWaitingChildrenKey, parentId)
      moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    end
  end
end
local function moveParentToWaitIfNoPendingDependencies(parentQueueKey, parentDependenciesKey, parentKey,
  parentId, timestamp)
  local doNotHavePendingDependencies = rcall("SCARD", parentDependenciesKey) == 0
  if doNotHavePendingDependencies then
    moveParentToWaitIfNeeded(parentQueueKey, parentKey, parentId, timestamp)
  end
end
local handleChildFailureAndMoveParentToWait = function (parentQueueKey, parentKey, parentId, jobIdKey, timestamp)
  if rcall("EXISTS", parentKey) == 1 then
    local parentWaitingChildrenKey = parentQueueKey .. ":waiting-children"
    local parentDelayedKey = parentQueueKey .. ":delayed"
    local parentWaitingChildrenOrDelayedKey
    if rcall("ZSCORE", parentWaitingChildrenKey, parentId) then
      parentWaitingChildrenOrDelayedKey = parentWaitingChildrenKey
    elseif rcall("ZSCORE", parentDelayedKey, parentId) then
      parentWaitingChildrenOrDelayedKey = parentDelayedKey
      rcall("HSET", parentKey, "delay", 0)
    end
    if parentWaitingChildrenOrDelayedKey then
      rcall("ZREM", parentWaitingChildrenOrDelayedKey, parentId)
      local deferredFailure = "child " .. jobIdKey .. " failed"
      rcall("HSET", parentKey, "defa", deferredFailure)
      moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    else
      if not rcall("ZSCORE", parentQueueKey .. ":failed", parentId) then
        local deferredFailure = "child " .. jobIdKey .. " failed"
        rcall("HSET", parentKey, "defa", deferredFailure)
      end
    end
  end
end
local moveChildFromDependenciesIfNeeded = function (rawParentData, childKey, failedReason, timestamp)
  if rawParentData then
    local parentData = cjson.decode(rawParentData)
    local parentKey = parentData['queueKey'] .. ':' .. parentData['id']
    local parentDependenciesChildrenKey = parentKey .. ":dependencies"
    if parentData['fpof'] then
      if rcall("SREM", parentDependenciesChildrenKey, childKey) == 1 then
        local parentUnsuccessfulChildrenKey = parentKey .. ":unsuccessful"
        rcall("ZADD", parentUnsuccessfulChildrenKey, timestamp, childKey)
        handleChildFailureAndMoveParentToWait(
          parentData['queueKey'],
          parentKey,
          parentData['id'],
          childKey,
          timestamp
        )
      end
    elseif parentData['cpof'] then
      if rcall("SREM", parentDependenciesChildrenKey, childKey) == 1 then
        local parentFailedChildrenKey = parentKey .. ":failed"
        rcall("HSET", parentFailedChildrenKey, childKey, failedReason)
        moveParentToWaitIfNeeded(parentData['queueKey'], parentKey, parentData['id'], timestamp)
      end
    elseif parentData['idof'] or parentData['rdof'] then
      if rcall("SREM", parentDependenciesChildrenKey, childKey) == 1 then
        moveParentToWaitIfNoPendingDependencies(parentData['queueKey'], parentDependenciesChildrenKey,
          parentKey, parentData['id'], timestamp)
        if parentData['idof'] then
          local parentFailedChildrenKey = parentKey .. ":failed"
          rcall("HSET", parentFailedChildrenKey, childKey, failedReason)
        end
      end
    end
  end
end
--[[
  Function to move job from wait state to active.
  Input:
    opts - token - lock token
    opts - lockDuration
    opts - limiter
]]
-- Includes
local function prepareJobForProcessing(keyPrefix, rateLimiterKey, eventStreamKey,
    jobId, processedOn, maxJobs, limiterDuration, markerKey, opts)
  local jobKey = keyPrefix .. jobId
  -- Check if we need to perform rate limiting.
  if maxJobs then
    local jobCounter = tonumber(rcall("INCR", rateLimiterKey))
    if jobCounter == 1 then
      local integerDuration = math.floor(math.abs(limiterDuration))
      rcall("PEXPIRE", rateLimiterKey, integerDuration)
    end
  end
  -- get a lock
  if opts['token'] ~= "0" then
    local lockKey = jobKey .. ':lock'
    rcall("SET", lockKey, opts['token'], "PX", opts['lockDuration'])
  end
  local optionalValues = {}
  if opts['name'] then
    -- Set "processedBy" field to the worker name
    table.insert(optionalValues, "pb")
    table.insert(optionalValues, opts['name'])
  end
  rcall("XADD", eventStreamKey, "*", "event", "active", "jobId", jobId, "prev", "waiting")
  rcall("HMSET", jobKey, "processedOn", processedOn, unpack(optionalValues))
  rcall("HINCRBY", jobKey, "ats", 1)
  addBaseMarkerIfNeeded(markerKey, false)
  -- rate limit delay must be 0 in this case to prevent adding more delay
  -- when job that is moved to active needs to be processed
  return {rcall("HGETALL", jobKey), jobId, 0, 0} -- get job data
end
--[[
  Updates the delay set, by moving delayed jobs that should
  be processed now to "wait".
     Events:
      'waiting'
]]
-- Includes
-- Try to get as much as 1000 jobs at once
local function promoteDelayedJobs(delayedKey, markerKey, targetKey, prioritizedKey,
                                  eventStreamKey, prefix, timestamp, priorityCounterKey, isPaused)
    local jobs = rcall("ZRANGEBYSCORE", delayedKey, 0, (timestamp + 1) * 0x1000 - 1, "LIMIT", 0, 1000)
    if (#jobs > 0) then
        rcall("ZREM", delayedKey, unpack(jobs))
        for _, jobId in ipairs(jobs) do
            local jobKey = prefix .. jobId
            local priority =
                tonumber(rcall("HGET", jobKey, "priority")) or 0
            if priority == 0 then
                -- LIFO or FIFO
                rcall("LPUSH", targetKey, jobId)
            else
                local score = getPriorityScore(priority, priorityCounterKey)
                rcall("ZADD", prioritizedKey, score, jobId)
            end
            -- Emit waiting event
            rcall("XADD", eventStreamKey, "*", "event", "waiting", "jobId",
                  jobId, "prev", "delayed")
            rcall("HSET", jobKey, "delay", 0)
        end
        addBaseMarkerIfNeeded(markerKey, isPaused)
    end
end
--[[
  Function to remove deduplication key if needed
  when a job is moved to completed or failed states.
]]
local function removeDeduplicationKeyIfNeededOnFinalization(prefixKey,
  deduplicationId, jobId)
  if deduplicationId then
    local deduplicationKey = prefixKey .. "de:" .. deduplicationId
    local pttl = rcall("PTTL", deduplicationKey)
    if pttl == 0 then
      return rcall("DEL", deduplicationKey)
    end
    if pttl == -1 then
      local currentJobId = rcall('GET', deduplicationKey)
      if currentJobId and currentJobId == jobId then
        return rcall("DEL", deduplicationKey)
      end
    end
  end
end
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
--[[
  Functions to remove jobs by max age.
]]
-- Includes
--[[
  Function to remove job.
]]
-- Includes
--[[
  Function to remove deduplication key if needed
  when a job is being removed.
]]
local function removeDeduplicationKeyIfNeededOnRemoval(prefixKey,
  jobId, deduplicationId)
  if deduplicationId then
    local deduplicationKey = prefixKey .. "de:" .. deduplicationId
    local currentJobId = rcall('GET', deduplicationKey)
    if currentJobId and currentJobId == jobId then
      return rcall("DEL", deduplicationKey)
    end
  end
end
--[[
  Check if this job has a parent. If so we will just remove it from
  the parent child list, but if it is the last child we should move the parent to "wait/paused"
  which requires code from "moveToFinished"
]]
-- Includes
--[[
  Functions to destructure job key.
  Just a bit of warning, these functions may be a bit slow and affect performance significantly.
]]
local getJobIdFromKey = function (jobKey)
  return string.match(jobKey, ".*:(.*)")
end
local getJobKeyPrefix = function (jobKey, jobId)
  return string.sub(jobKey, 0, #jobKey - #jobId)
end
local function _moveParentToWait(parentPrefix, parentId, emitEvent)
  local parentTarget, isPausedOrMaxed = getTargetQueueList(parentPrefix .. "meta", parentPrefix .. "active",
    parentPrefix .. "wait", parentPrefix .. "paused")
  addJobInTargetList(parentTarget, parentPrefix .. "marker", "RPUSH", isPausedOrMaxed, parentId)
  if emitEvent then
    local parentEventStream = parentPrefix .. "events"
    rcall("XADD", parentEventStream, "*", "event", "waiting", "jobId", parentId, "prev", "waiting-children")
  end
end
local function removeParentDependencyKey(jobKey, hard, parentKey, baseKey, debounceId)
  if parentKey then
    local parentDependenciesKey = parentKey .. ":dependencies"
    local result = rcall("SREM", parentDependenciesKey, jobKey)
    if result > 0 then
      local pendingDependencies = rcall("SCARD", parentDependenciesKey)
      if pendingDependencies == 0 then
        local parentId = getJobIdFromKey(parentKey)
        local parentPrefix = getJobKeyPrefix(parentKey, parentId)
        local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
        if numRemovedElements == 1 then
          if hard then -- remove parent in same queue
            if parentPrefix == baseKey then
              removeParentDependencyKey(parentKey, hard, nil, baseKey, nil)
              removeJobKeys(parentKey)
              if debounceId then
                rcall("DEL", parentPrefix .. "de:" .. debounceId)
              end
            else
              _moveParentToWait(parentPrefix, parentId)
            end
          else
            _moveParentToWait(parentPrefix, parentId, true)
          end
        end
      end
      return true
    end
  else
    local parentAttributes = rcall("HMGET", jobKey, "parentKey", "deid")
    local missedParentKey = parentAttributes[1]
    if( (type(missedParentKey) == "string") and missedParentKey ~= ""
      and (rcall("EXISTS", missedParentKey) == 1)) then
      local parentDependenciesKey = missedParentKey .. ":dependencies"
      local result = rcall("SREM", parentDependenciesKey, jobKey)
      if result > 0 then
        local pendingDependencies = rcall("SCARD", parentDependenciesKey)
        if pendingDependencies == 0 then
          local parentId = getJobIdFromKey(missedParentKey)
          local parentPrefix = getJobKeyPrefix(missedParentKey, parentId)
          local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
          if numRemovedElements == 1 then
            if hard then
              if parentPrefix == baseKey then
                removeParentDependencyKey(missedParentKey, hard, nil, baseKey, nil)
                removeJobKeys(missedParentKey)
                if parentAttributes[2] then
                  rcall("DEL", parentPrefix .. "de:" .. parentAttributes[2])
                end
              else
                _moveParentToWait(parentPrefix, parentId)
              end
            else
              _moveParentToWait(parentPrefix, parentId, true)
            end
          end
        end
        return true
      end
    end
  end
  return false
end
local function removeJob(jobId, hard, baseKey, shouldRemoveDeduplicationKey)
  local jobKey = baseKey .. jobId
  removeParentDependencyKey(jobKey, hard, nil, baseKey)
  if shouldRemoveDeduplicationKey then
    local deduplicationId = rcall("HGET", jobKey, "deid")
    removeDeduplicationKeyIfNeededOnRemoval(baseKey, jobId, deduplicationId)
  end
  removeJobKeys(jobKey)
end
local function removeJobsByMaxAge(timestamp, maxAge, targetSet, prefix, maxLimit)
  local start = timestamp - maxAge * 1000
  local jobIds = rcall("ZREVRANGEBYSCORE", targetSet, start, "-inf", "LIMIT", 0, maxLimit)
  for i, jobId in ipairs(jobIds) do
    removeJob(jobId, false, prefix, false --[[remove debounce key]])
  end
  if #jobIds > 0 then
    if #jobIds < maxLimit then
      rcall("ZREMRANGEBYSCORE", targetSet, "-inf", start)
    else
      for from, to in batches(#jobIds, 7000) do
        rcall("ZREM", targetSet, unpack(jobIds, from, to))
      end
    end
  end
end
--[[
  Functions to remove jobs by max count.
]]
-- Includes
local function removeJobsByMaxCount(maxCount, targetSet, prefix)
  local start = maxCount
  local jobIds = rcall("ZREVRANGE", targetSet, start, -1)
  for i, jobId in ipairs(jobIds) do
    removeJob(jobId, false, prefix, false --[[remove debounce key]])
  end
  rcall("ZREMRANGEBYRANK", targetSet, 0, -(maxCount + 1))
end
local function removeLock(jobKey, stalledKey, token, jobId)
  if token ~= "0" then
    local lockKey = jobKey .. ':lock'
    local lockToken = rcall("GET", lockKey)
    if lockToken == token then
      rcall("DEL", lockKey)
      rcall("SREM", stalledKey, jobId)
    else
      if lockToken then
        -- Lock exists but token does not match
        return -6
      else
        -- Lock is missing completely
        return -2
      end
    end
  end
  return 0
end
--[[
  Function to trim events, default 10000.
]]
-- Includes
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
local function trimEvents(metaKey, eventStreamKey)
  local maxEvents = getOrSetMaxEvents(metaKey)
  if maxEvents then
    rcall("XTRIM", eventStreamKey, "MAXLEN", "~", maxEvents)
  else
    rcall("XTRIM", eventStreamKey, "MAXLEN", "~", 10000)
  end
end
--[[
  Validate and move or add dependencies to parent.
]]
-- Includes
local function updateParentDepsIfNeeded(parentKey, parentQueueKey, parentDependenciesKey,
  parentId, jobIdKey, returnvalue, timestamp )
  local processedSet = parentKey .. ":processed"
  rcall("HSET", processedSet, jobIdKey, returnvalue)
  moveParentToWaitIfNoPendingDependencies(parentQueueKey, parentDependenciesKey, parentKey, parentId, timestamp)
end
--[[
  Function to update a bunch of fields in a job.
]]
local function updateJobFields(jobKey, msgpackedFields)
  if msgpackedFields and #msgpackedFields > 0 then
    local fieldsToUpdate = cmsgpack.unpack(msgpackedFields)
    if fieldsToUpdate then
      rcall("HMSET", jobKey, unpack(fieldsToUpdate))
    end
  end
end
local jobIdKey = KEYS[12]
if rcall("EXISTS", jobIdKey) == 1 then -- Make sure job exists
    -- Make sure it does not have pending dependencies
    -- It must happen before removing lock
    if ARGV[5] == "completed" then
        if rcall("SCARD", jobIdKey .. ":dependencies") ~= 0 then
            return -4
        end
        if rcall("ZCARD", jobIdKey .. ":unsuccessful") ~= 0 then
            return -9
        end
    end
    local opts = cmsgpack.unpack(ARGV[8])
    local token = opts['token']
    local errorCode = removeLock(jobIdKey, KEYS[5], token, ARGV[1])
    if errorCode < 0 then
        return errorCode
    end
    updateJobFields(jobIdKey, ARGV[9]);
    local attempts = opts['attempts']
    local maxMetricsSize = opts['maxMetricsSize']
    local maxCount = opts['keepJobs']['count']
    local maxAge = opts['keepJobs']['age']
    local maxLimit = opts['keepJobs']['limit'] or 1000
    local jobAttributes = rcall("HMGET", jobIdKey, "parentKey", "parent", "deid")
    local parentKey = jobAttributes[1] or ""
    local parentId = ""
    local parentQueueKey = ""
    if jobAttributes[2] then -- TODO: need to revisit this logic if it's still needed
        local jsonDecodedParent = cjson.decode(jobAttributes[2])
        parentId = jsonDecodedParent['id']
        parentQueueKey = jsonDecodedParent['queueKey']
    end
    local jobId = ARGV[1]
    local timestamp = ARGV[2]
    -- Remove from active list (if not active we shall return error)
    local numRemovedElements = rcall("LREM", KEYS[2], -1, jobId)
    if (numRemovedElements < 1) then
        return -3
    end
    local eventStreamKey = KEYS[4]
    local metaKey = KEYS[9]
    -- Trim events before emiting them to avoid trimming events emitted in this script
    trimEvents(metaKey, eventStreamKey)
    local prefix = ARGV[7]
    removeDeduplicationKeyIfNeededOnFinalization(prefix, jobAttributes[3], jobId)
    -- If job has a parent we need to
    -- 1) remove this job id from parents dependencies
    -- 2) move the job Id to parent "processed" set
    -- 3) push the results into parent "results" list
    -- 4) if parent's dependencies is empty, then move parent to "wait/paused". Note it may be a different queue!.
    if parentId == "" and parentKey ~= "" then
        parentId = getJobIdFromKey(parentKey)
        parentQueueKey = getJobKeyPrefix(parentKey, ":" .. parentId)
    end
    if parentId ~= "" then
        if ARGV[5] == "completed" then
            local dependenciesSet = parentKey .. ":dependencies"
            if rcall("SREM", dependenciesSet, jobIdKey) == 1 then
                updateParentDepsIfNeeded(parentKey, parentQueueKey, dependenciesSet, parentId, jobIdKey, ARGV[4],
                    timestamp)
            end
        else
            moveChildFromDependenciesIfNeeded(jobAttributes[2], jobIdKey, ARGV[4], timestamp)
        end
    end
    local attemptsMade = rcall("HINCRBY", jobIdKey, "atm", 1)
    -- Remove job?
    if maxCount ~= 0 then
        local targetSet = KEYS[11]
        -- Add to complete/failed set
        rcall("ZADD", targetSet, timestamp, jobId)
        rcall("HSET", jobIdKey, ARGV[3], ARGV[4], "finishedOn", timestamp)
        -- "returnvalue" / "failedReason" and "finishedOn"
        if ARGV[5] == "failed" then
            rcall("HDEL", jobIdKey, "defa")
        end
        -- Remove old jobs?
        if maxAge ~= nil then
            removeJobsByMaxAge(timestamp, maxAge, targetSet, prefix, maxLimit)
        end
        if maxCount ~= nil and maxCount > 0 then
            removeJobsByMaxCount(maxCount, targetSet, prefix)
        end
    else
        removeJobKeys(jobIdKey)
        if parentKey ~= "" then
            -- TODO: when a child is removed when finished, result or failure in parent
            -- must not be deleted, those value references should be deleted when the parent
            -- is deleted
            removeParentDependencyKey(jobIdKey, false, parentKey, jobAttributes[3])
        end
    end
    rcall("XADD", eventStreamKey, "*", "event", ARGV[5], "jobId", jobId, ARGV[3], ARGV[4], "prev", "active")
    if ARGV[5] == "failed" then
        if tonumber(attemptsMade) >= tonumber(attempts) then
            rcall("XADD", eventStreamKey, "*", "event", "retries-exhausted", "jobId", jobId, "attemptsMade",
                attemptsMade)
        end
    end
    -- Collect metrics
    if maxMetricsSize ~= "" then
        collectMetrics(KEYS[13], KEYS[13] .. ':data', maxMetricsSize, timestamp)
    end
    -- Try to get next job to avoid an extra roundtrip if the queue is not closing,
    -- and not rate limited.
    if (ARGV[6] == "1") then
        local target, isPausedOrMaxed, rateLimitMax, rateLimitDuration = getTargetQueueList(metaKey, KEYS[2],
            KEYS[1], KEYS[8])
        local markerKey = KEYS[14]
        -- Check if there are delayed jobs that can be promoted
        promoteDelayedJobs(KEYS[7], markerKey, target, KEYS[3], eventStreamKey, prefix, timestamp, KEYS[10],
            isPausedOrMaxed)
        local maxJobs = tonumber(rateLimitMax or (opts['limiter'] and opts['limiter']['max']))
        -- Check if we are rate limited first.
        local expireTime = getRateLimitTTL(maxJobs, KEYS[6])
        if expireTime > 0 then
            return {0, 0, expireTime, 0}
        end
        -- paused or maxed queue
        if isPausedOrMaxed then
            return {0, 0, 0, 0}
        end
        local limiterDuration = (opts['limiter'] and opts['limiter']['duration']) or rateLimitDuration
        jobId = rcall("RPOPLPUSH", KEYS[1], KEYS[2])
        if jobId then
            -- Markers in waitlist DEPRECATED in v5: Remove in v6.
            if string.sub(jobId, 1, 2) == "0:" then
                rcall("LREM", KEYS[2], 1, jobId)
                -- If jobId is special ID 0:delay (delay greater than 0), then there is no job to process
                -- but if ID is 0:0, then there is at least 1 prioritized job to process
                if jobId == "0:0" then
                    jobId = moveJobFromPrioritizedToActive(KEYS[3], KEYS[2], KEYS[10])
                    return prepareJobForProcessing(prefix, KEYS[6], eventStreamKey, jobId, timestamp, maxJobs,
                        limiterDuration, markerKey, opts)
                end
            else
                return prepareJobForProcessing(prefix, KEYS[6], eventStreamKey, jobId, timestamp, maxJobs,
                    limiterDuration, markerKey, opts)
            end
        else
            jobId = moveJobFromPrioritizedToActive(KEYS[3], KEYS[2], KEYS[10])
            if jobId then
                return prepareJobForProcessing(prefix, KEYS[6], eventStreamKey, jobId, timestamp, maxJobs,
                    limiterDuration, markerKey, opts)
            end
        end
        -- Return the timestamp for the next delayed job if any.
        local nextTimestamp = getNextDelayedTimestamp(KEYS[7])
        if nextTimestamp ~= nil then
            -- The result is guaranteed to be positive, since the
            -- ZRANGEBYSCORE command would have return a job otherwise.
            return {0, 0, 0, nextTimestamp}
        end
    end
    local waitLen = rcall("LLEN", KEYS[1])
    if waitLen == 0 then
        local activeLen = rcall("LLEN", KEYS[2])
        if activeLen == 0 then
            local prioritizedLen = rcall("ZCARD", KEYS[3])
            if prioritizedLen == 0 then
                rcall("XADD", eventStreamKey, "*", "event", "drained")
            end
        end
    end
    return 0
else
    return -1
end
`,keys:14},Q={name:"moveToWaitingChildren",content:`--[[
  Moves job from active to waiting children set.
  Input:
    KEYS[1] active key
    KEYS[2] wait-children key
    KEYS[3] job key
    KEYS[4] job dependencies key
    KEYS[5] job unsuccessful key
    KEYS[6] stalled key
    KEYS[7] events key
    ARGV[1] token
    ARGV[2] child key
    ARGV[3] timestamp
    ARGV[4] jobId
    ARGV[5] prefix
  Output:
    0 - OK
    1 - There are not pending dependencies.
   -1 - Missing job.
   -2 - Missing lock
   -3 - Job not in active set
   -9 - Job has failed children
]]
local rcall = redis.call
local activeKey = KEYS[1]
local waitingChildrenKey = KEYS[2]
local jobKey = KEYS[3]
local jobDependenciesKey = KEYS[4]
local jobUnsuccessfulKey = KEYS[5]
local stalledKey = KEYS[6]
local eventStreamKey = KEYS[7]
local token = ARGV[1]
local timestamp = ARGV[3]
local jobId = ARGV[4]
--- Includes
local function removeLock(jobKey, stalledKey, token, jobId)
  if token ~= "0" then
    local lockKey = jobKey .. ':lock'
    local lockToken = rcall("GET", lockKey)
    if lockToken == token then
      rcall("DEL", lockKey)
      rcall("SREM", stalledKey, jobId)
    else
      if lockToken then
        -- Lock exists but token does not match
        return -6
      else
        -- Lock is missing completely
        return -2
      end
    end
  end
  return 0
end
local function removeJobFromActive(activeKey, stalledKey, jobKey, jobId,
    token)
  local errorCode = removeLock(jobKey, stalledKey, token, jobId)
  if errorCode < 0 then
    return errorCode
  end
  local numRemovedElements = rcall("LREM", activeKey, -1, jobId)
  if numRemovedElements < 1 then
    return -3
  end
  return 0
end
local function moveToWaitingChildren(activeKey, waitingChildrenKey, stalledKey, eventStreamKey,
    jobKey, jobId, timestamp, token)
  local errorCode = removeJobFromActive(activeKey, stalledKey, jobKey, jobId, token)
  if errorCode < 0 then
    return errorCode
  end
  local score = tonumber(timestamp)
  rcall("ZADD", waitingChildrenKey, score, jobId)
  rcall("XADD", eventStreamKey, "*", "event", "waiting-children", "jobId", jobId, 'prev', 'active')
  return 0
end
if rcall("EXISTS", jobKey) == 1 then
  if rcall("ZCARD", jobUnsuccessfulKey) ~= 0 then
    return -9
  else
    if ARGV[2] ~= "" then
      if rcall("SISMEMBER", jobDependenciesKey, ARGV[2]) ~= 0 then
        return moveToWaitingChildren(activeKey, waitingChildrenKey, stalledKey, eventStreamKey,
          jobKey, jobId, timestamp, token)
      end
      return 1
    else
      if rcall("SCARD", jobDependenciesKey) ~= 0 then 
        return moveToWaitingChildren(activeKey, waitingChildrenKey, stalledKey, eventStreamKey,
          jobKey, jobId, timestamp, token)
      end
      return 1
    end    
  end
end
return -1
`,keys:7},R={name:"obliterate",content:`--[[
  Completely obliterates a queue and all of its contents
  This command completely destroys a queue including all of its jobs, current or past 
  leaving no trace of its existence. Since this script needs to iterate to find all the job
  keys, consider that this call may be slow for very large queues.
  The queue needs to be "paused" or it will return an error
  If the queue has currently active jobs then the script by default will return error,
  however this behaviour can be overrided using the 'force' option.
  Input:
    KEYS[1] meta
    KEYS[2] base
    ARGV[1] count
    ARGV[2] force
]]
local maxCount = tonumber(ARGV[1])
local baseKey = KEYS[2]
local rcall = redis.call
-- Includes
--[[
  Functions to remove jobs.
]]
-- Includes
--[[
  Function to remove job.
]]
-- Includes
--[[
  Function to remove deduplication key if needed
  when a job is being removed.
]]
local function removeDeduplicationKeyIfNeededOnRemoval(prefixKey,
  jobId, deduplicationId)
  if deduplicationId then
    local deduplicationKey = prefixKey .. "de:" .. deduplicationId
    local currentJobId = rcall('GET', deduplicationKey)
    if currentJobId and currentJobId == jobId then
      return rcall("DEL", deduplicationKey)
    end
  end
end
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
--[[
  Check if this job has a parent. If so we will just remove it from
  the parent child list, but if it is the last child we should move the parent to "wait/paused"
  which requires code from "moveToFinished"
]]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Functions to destructure job key.
  Just a bit of warning, these functions may be a bit slow and affect performance significantly.
]]
local getJobIdFromKey = function (jobKey)
  return string.match(jobKey, ".*:(.*)")
end
local getJobKeyPrefix = function (jobKey, jobId)
  return string.sub(jobKey, 0, #jobKey - #jobId)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
local function _moveParentToWait(parentPrefix, parentId, emitEvent)
  local parentTarget, isPausedOrMaxed = getTargetQueueList(parentPrefix .. "meta", parentPrefix .. "active",
    parentPrefix .. "wait", parentPrefix .. "paused")
  addJobInTargetList(parentTarget, parentPrefix .. "marker", "RPUSH", isPausedOrMaxed, parentId)
  if emitEvent then
    local parentEventStream = parentPrefix .. "events"
    rcall("XADD", parentEventStream, "*", "event", "waiting", "jobId", parentId, "prev", "waiting-children")
  end
end
local function removeParentDependencyKey(jobKey, hard, parentKey, baseKey, debounceId)
  if parentKey then
    local parentDependenciesKey = parentKey .. ":dependencies"
    local result = rcall("SREM", parentDependenciesKey, jobKey)
    if result > 0 then
      local pendingDependencies = rcall("SCARD", parentDependenciesKey)
      if pendingDependencies == 0 then
        local parentId = getJobIdFromKey(parentKey)
        local parentPrefix = getJobKeyPrefix(parentKey, parentId)
        local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
        if numRemovedElements == 1 then
          if hard then -- remove parent in same queue
            if parentPrefix == baseKey then
              removeParentDependencyKey(parentKey, hard, nil, baseKey, nil)
              removeJobKeys(parentKey)
              if debounceId then
                rcall("DEL", parentPrefix .. "de:" .. debounceId)
              end
            else
              _moveParentToWait(parentPrefix, parentId)
            end
          else
            _moveParentToWait(parentPrefix, parentId, true)
          end
        end
      end
      return true
    end
  else
    local parentAttributes = rcall("HMGET", jobKey, "parentKey", "deid")
    local missedParentKey = parentAttributes[1]
    if( (type(missedParentKey) == "string") and missedParentKey ~= ""
      and (rcall("EXISTS", missedParentKey) == 1)) then
      local parentDependenciesKey = missedParentKey .. ":dependencies"
      local result = rcall("SREM", parentDependenciesKey, jobKey)
      if result > 0 then
        local pendingDependencies = rcall("SCARD", parentDependenciesKey)
        if pendingDependencies == 0 then
          local parentId = getJobIdFromKey(missedParentKey)
          local parentPrefix = getJobKeyPrefix(missedParentKey, parentId)
          local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
          if numRemovedElements == 1 then
            if hard then
              if parentPrefix == baseKey then
                removeParentDependencyKey(missedParentKey, hard, nil, baseKey, nil)
                removeJobKeys(missedParentKey)
                if parentAttributes[2] then
                  rcall("DEL", parentPrefix .. "de:" .. parentAttributes[2])
                end
              else
                _moveParentToWait(parentPrefix, parentId)
              end
            else
              _moveParentToWait(parentPrefix, parentId, true)
            end
          end
        end
        return true
      end
    end
  end
  return false
end
local function removeJob(jobId, hard, baseKey, shouldRemoveDeduplicationKey)
  local jobKey = baseKey .. jobId
  removeParentDependencyKey(jobKey, hard, nil, baseKey)
  if shouldRemoveDeduplicationKey then
    local deduplicationId = rcall("HGET", jobKey, "deid")
    removeDeduplicationKeyIfNeededOnRemoval(baseKey, jobId, deduplicationId)
  end
  removeJobKeys(jobKey)
end
local function removeJobs(keys, hard, baseKey, max)
  for i, key in ipairs(keys) do
    removeJob(key, hard, baseKey, true --[[remove debounce key]])
  end
  return max - #keys
end
--[[
  Functions to remove jobs.
]]
-- Includes
--[[
  Function to filter out jobs to ignore from a table.
]]
local function filterOutJobsToIgnore(jobs, jobsToIgnore)
  local filteredJobs = {}
  for i = 1, #jobs do
    if not jobsToIgnore[jobs[i]] then
      table.insert(filteredJobs, jobs[i])
    end
  end
  return filteredJobs
end
local function getListItems(keyName, max)
  return rcall('LRANGE', keyName, 0, max - 1)
end
local function removeListJobs(keyName, hard, baseKey, max, jobsToIgnore)
  local jobs = getListItems(keyName, max)
  if jobsToIgnore then
    jobs = filterOutJobsToIgnore(jobs, jobsToIgnore)
  end
  local count = removeJobs(jobs, hard, baseKey, max)
  rcall("LTRIM", keyName, #jobs, -1)
  return count
end
-- Includes
--[[
  Function to loop in batches.
  Just a bit of warning, some commands as ZREM
  could receive a maximum of 7000 parameters per call.
]]
local function batches(n, batchSize)
  local i = 0
  return function()
    local from = i * batchSize + 1
    i = i + 1
    if (from <= n) then
      local to = math.min(from + batchSize - 1, n)
      return from, to
    end
  end
end
--[[
  Function to get ZSet items.
]]
local function getZSetItems(keyName, max)
  return rcall('ZRANGE', keyName, 0, max - 1)
end
local function removeZSetJobs(keyName, hard, baseKey, max, jobsToIgnore)
  local jobs = getZSetItems(keyName, max)
  if jobsToIgnore then
    jobs = filterOutJobsToIgnore(jobs, jobsToIgnore)
  end
  local count = removeJobs(jobs, hard, baseKey, max)
  if(#jobs > 0) then
    for from, to in batches(#jobs, 7000) do
      rcall("ZREM", keyName, unpack(jobs, from, to))
    end
  end
  return count
end
local function removeLockKeys(keys)
  for i, key in ipairs(keys) do
    rcall("DEL", baseKey .. key .. ':lock')
  end
end
-- 1) Check if paused, if not return with error.
if rcall("HEXISTS", KEYS[1], "paused") ~= 1 then
  return -1 -- Error, NotPaused
end
-- 2) Check if there are active jobs, if there are and not "force" return error.
local activeKey = baseKey .. 'active'
local activeJobs = getListItems(activeKey, maxCount)
if (#activeJobs > 0) then
  if(ARGV[2] == "") then 
    return -2 -- Error, ExistActiveJobs
  end
end
removeLockKeys(activeJobs)
maxCount = removeJobs(activeJobs, true, baseKey, maxCount)
rcall("LTRIM", activeKey, #activeJobs, -1)
if(maxCount <= 0) then
  return 1
end
local delayedKey = baseKey .. 'delayed'
maxCount = removeZSetJobs(delayedKey, true, baseKey, maxCount)
if(maxCount <= 0) then
  return 1
end
local repeatKey = baseKey .. 'repeat'
local repeatJobsIds = getZSetItems(repeatKey, maxCount)
for i, key in ipairs(repeatJobsIds) do
  local jobKey = repeatKey .. ":" .. key
  rcall("DEL", jobKey)
end
if(#repeatJobsIds > 0) then
  for from, to in batches(#repeatJobsIds, 7000) do
    rcall("ZREM", repeatKey, unpack(repeatJobsIds, from, to))
  end
end
maxCount = maxCount - #repeatJobsIds
if(maxCount <= 0) then
  return 1
end
local completedKey = baseKey .. 'completed'
maxCount = removeZSetJobs(completedKey, true, baseKey, maxCount)
if(maxCount <= 0) then
  return 1
end
local waitKey = baseKey .. 'paused'
maxCount = removeListJobs(waitKey, true, baseKey, maxCount)
if(maxCount <= 0) then
  return 1
end
local prioritizedKey = baseKey .. 'prioritized'
maxCount = removeZSetJobs(prioritizedKey, true, baseKey, maxCount)
if(maxCount <= 0) then
  return 1
end
local failedKey = baseKey .. 'failed'
maxCount = removeZSetJobs(failedKey, true, baseKey, maxCount)
if(maxCount <= 0) then
  return 1
end
if(maxCount > 0) then
  rcall("DEL",
    baseKey .. 'events',
    baseKey .. 'delay',
    baseKey .. 'stalled-check',
    baseKey .. 'stalled',
    baseKey .. 'id',
    baseKey .. 'pc',
    baseKey .. 'marker',
    baseKey .. 'meta',
    baseKey .. 'metrics:completed',
    baseKey .. 'metrics:completed:data',
    baseKey .. 'metrics:failed',
    baseKey .. 'metrics:failed:data')
  return 0
else
  return 1
end
`,keys:2},S={name:"paginate",content:`--[[
    Paginate a set or hash
    Input:
      KEYS[1] key pointing to the set or hash to be paginated.
      ARGV[1]  page start offset
      ARGV[2]  page end offset (-1 for all the elements)
      ARGV[3]  cursor
      ARGV[4]  offset
      ARGV[5]  max iterations
      ARGV[6]  fetch jobs?
    Output:
      [cursor, offset, items, numItems]
]]
local rcall = redis.call
-- Includes
--[[
  Function to achieve pagination for a set or hash.
  This function simulates pagination in the most efficient way possible
  for a set using sscan or hscan.
  The main limitation is that sets are not order preserving, so the
  pagination is not stable. This means that if the set is modified
  between pages, the same element may appear in different pages.
]] -- Maximum number of elements to be returned by sscan per iteration.
local maxCount = 100
-- Finds the cursor, and returns the first elements available for the requested page.
local function findPage(key, command, pageStart, pageSize, cursor, offset,
                        maxIterations, fetchJobs)
    local items = {}
    local jobs = {}
    local iterations = 0
    repeat
        -- Iterate over the set using sscan/hscan.
        local result = rcall(command, key, cursor, "COUNT", maxCount)
        cursor = result[1]
        local members = result[2]
        local step = 1
        if command == "HSCAN" then
            step = 2
        end
        if #members == 0 then
            -- If the result is empty, we can return the result.
            return cursor, offset, items, jobs
        end
        local chunkStart = offset
        local chunkEnd = offset + #members / step
        local pageEnd = pageStart + pageSize
        if chunkEnd < pageStart then
            -- If the chunk is before the page, we can skip it.
            offset = chunkEnd
        elseif chunkStart > pageEnd then
            -- If the chunk is after the page, we can return the result.
            return cursor, offset, items, jobs
        else
            -- If the chunk is overlapping the page, we need to add the elements to the result.
            for i = 1, #members, step do
                if offset >= pageEnd then
                    return cursor, offset, items, jobs
                end
                if offset >= pageStart then
                    local index = #items + 1
                    if fetchJobs ~= nil then
                        jobs[#jobs+1] = rcall("HGETALL", members[i])
                    end
                    if step == 2 then
                        items[index] = {members[i], members[i + 1]}
                    else
                        items[index] = members[i]
                    end
                end
                offset = offset + 1
            end
        end
        iterations = iterations + 1
    until cursor == "0" or iterations >= maxIterations
    return cursor, offset, items, jobs
end
local key = KEYS[1]
local scanCommand = "SSCAN"
local countCommand = "SCARD"
local type = rcall("TYPE", key)["ok"]
if type == "none" then
    return {0, 0, {}, 0}
elseif type == "hash" then
    scanCommand = "HSCAN"
    countCommand = "HLEN"
elseif type ~= "set" then
    return
        redis.error_reply("Pagination is only supported for sets and hashes.")
end
local numItems = rcall(countCommand, key)
local startOffset = tonumber(ARGV[1])
local endOffset = tonumber(ARGV[2])
if endOffset == -1 then 
  endOffset = numItems
end
local pageSize = (endOffset - startOffset) + 1
local cursor, offset, items, jobs = findPage(key, scanCommand, startOffset,
                                       pageSize, ARGV[3], tonumber(ARGV[4]),
                                       tonumber(ARGV[5]), ARGV[6])
return {cursor, offset, items, numItems, jobs}
`,keys:1},T={name:"pause",content:`--[[
  Pauses or resumes a queue globably.
  Input:
    KEYS[1] 'wait' or 'paused''
    KEYS[2] 'paused' or 'wait'
    KEYS[3] 'meta'
    KEYS[4] 'prioritized'
    KEYS[5] events stream key
    KEYS[6] 'delayed'
    KEYS|7] 'marker'
    ARGV[1] 'paused' or 'resumed'
  Event:
    publish paused or resumed event.
]]
local rcall = redis.call
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if nextTimestamp ~= nil then
      return nextTimestamp / 0x1000
    end
  end
end
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
  local nextTimestamp = getNextDelayedTimestamp(delayedKey)
  if nextTimestamp ~= nil then
    -- Replace the score of the marker with the newest known
    -- next timestamp.
    rcall("ZADD", markerKey, nextTimestamp, "1")
  end
end
local markerKey = KEYS[7]
local hasJobs = rcall("EXISTS", KEYS[1]) == 1
--TODO: check this logic to be reused when changing a delay
if hasJobs then rcall("RENAME", KEYS[1], KEYS[2]) end
if ARGV[1] == "paused" then
    rcall("HSET", KEYS[3], "paused", 1)
    rcall("DEL", markerKey)
else
    rcall("HDEL", KEYS[3], "paused")
    if hasJobs or rcall("ZCARD", KEYS[4]) > 0 then
        -- Add marker if there are waiting or priority jobs
        rcall("ZADD", markerKey, 0, "0")
    else
        addDelayMarkerIfNeeded(markerKey, KEYS[6])
    end
end
rcall("XADD", KEYS[5], "*", "event", ARGV[1]);
`,keys:7},U={name:"promote",content:`--[[
  Promotes a job that is currently "delayed" to the "waiting" state
    Input:
      KEYS[1] 'delayed'
      KEYS[2] 'wait'
      KEYS[3] 'paused'
      KEYS[4] 'meta'
      KEYS[5] 'prioritized'
      KEYS[6] 'active'
      KEYS[7] 'pc' priority counter
      KEYS[8] 'event stream'
      KEYS[9] 'marker'
      ARGV[1]  queue.toKey('')
      ARGV[2]  jobId
    Output:
       0 - OK
      -3 - Job not in delayed zset.
    Events:
      'waiting'
]]
local rcall = redis.call
local jobId = ARGV[2]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Function to get priority score.
]]
local function getPriorityScore(priority, priorityCounterKey)
  local prioCounter = rcall("INCR", priorityCounterKey)
  return priority * 0x100000000 + prioCounter % 0x100000000
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey,
  isPausedOrMaxed)
  local score = getPriorityScore(priority, priorityCounterKey)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
if rcall("ZREM", KEYS[1], jobId) == 1 then
    local jobKey = ARGV[1] .. jobId
    local priority = tonumber(rcall("HGET", jobKey, "priority")) or 0
    local metaKey = KEYS[4]
    local markerKey = KEYS[9]
    -- Remove delayed "marker" from the wait list if there is any.
    -- Since we are adding a job we do not need the marker anymore.
    -- Markers in waitlist DEPRECATED in v5: Remove in v6.
    local target, isPausedOrMaxed = getTargetQueueList(metaKey, KEYS[6], KEYS[2], KEYS[3])
    local marker = rcall("LINDEX", target, 0)
    if marker and string.sub(marker, 1, 2) == "0:" then rcall("LPOP", target) end
    if priority == 0 then
        -- LIFO or FIFO
        addJobInTargetList(target, markerKey, "LPUSH", isPausedOrMaxed, jobId)
    else
        addJobWithPriority(markerKey, KEYS[5], priority, jobId, KEYS[7], isPausedOrMaxed)
    end
    rcall("XADD", KEYS[8], "*", "event", "waiting", "jobId", jobId, "prev",
          "delayed");
    rcall("HSET", jobKey, "delay", 0)
    return 0
else
    return -3
end
`,keys:9},V={name:"releaseLock",content:`--[[
  Release lock
    Input:
      KEYS[1] 'lock',
      ARGV[1]  token
      ARGV[2]  lock duration in milliseconds
    Output:
      "OK" if lock extented succesfully.
]]
local rcall = redis.call
if rcall("GET", KEYS[1]) == ARGV[1] then
  return rcall("DEL", KEYS[1])
else
  return 0
end
`,keys:1},W={name:"removeChildDependency",content:`--[[
  Break parent-child dependency by removing
  child reference from parent
  Input:
    KEYS[1] 'key' prefix,
    ARGV[1] job key
    ARGV[2] parent key
    Output:
       0  - OK
       1  - There is not relationship.
      -1  - Missing job key
      -5  - Missing parent key
]]
local rcall = redis.call
local jobKey = ARGV[1]
local parentKey = ARGV[2]
-- Includes
--[[
  Check if this job has a parent. If so we will just remove it from
  the parent child list, but if it is the last child we should move the parent to "wait/paused"
  which requires code from "moveToFinished"
]]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Functions to destructure job key.
  Just a bit of warning, these functions may be a bit slow and affect performance significantly.
]]
local getJobIdFromKey = function (jobKey)
  return string.match(jobKey, ".*:(.*)")
end
local getJobKeyPrefix = function (jobKey, jobId)
  return string.sub(jobKey, 0, #jobKey - #jobId)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
local function _moveParentToWait(parentPrefix, parentId, emitEvent)
  local parentTarget, isPausedOrMaxed = getTargetQueueList(parentPrefix .. "meta", parentPrefix .. "active",
    parentPrefix .. "wait", parentPrefix .. "paused")
  addJobInTargetList(parentTarget, parentPrefix .. "marker", "RPUSH", isPausedOrMaxed, parentId)
  if emitEvent then
    local parentEventStream = parentPrefix .. "events"
    rcall("XADD", parentEventStream, "*", "event", "waiting", "jobId", parentId, "prev", "waiting-children")
  end
end
local function removeParentDependencyKey(jobKey, hard, parentKey, baseKey, debounceId)
  if parentKey then
    local parentDependenciesKey = parentKey .. ":dependencies"
    local result = rcall("SREM", parentDependenciesKey, jobKey)
    if result > 0 then
      local pendingDependencies = rcall("SCARD", parentDependenciesKey)
      if pendingDependencies == 0 then
        local parentId = getJobIdFromKey(parentKey)
        local parentPrefix = getJobKeyPrefix(parentKey, parentId)
        local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
        if numRemovedElements == 1 then
          if hard then -- remove parent in same queue
            if parentPrefix == baseKey then
              removeParentDependencyKey(parentKey, hard, nil, baseKey, nil)
              removeJobKeys(parentKey)
              if debounceId then
                rcall("DEL", parentPrefix .. "de:" .. debounceId)
              end
            else
              _moveParentToWait(parentPrefix, parentId)
            end
          else
            _moveParentToWait(parentPrefix, parentId, true)
          end
        end
      end
      return true
    end
  else
    local parentAttributes = rcall("HMGET", jobKey, "parentKey", "deid")
    local missedParentKey = parentAttributes[1]
    if( (type(missedParentKey) == "string") and missedParentKey ~= ""
      and (rcall("EXISTS", missedParentKey) == 1)) then
      local parentDependenciesKey = missedParentKey .. ":dependencies"
      local result = rcall("SREM", parentDependenciesKey, jobKey)
      if result > 0 then
        local pendingDependencies = rcall("SCARD", parentDependenciesKey)
        if pendingDependencies == 0 then
          local parentId = getJobIdFromKey(missedParentKey)
          local parentPrefix = getJobKeyPrefix(missedParentKey, parentId)
          local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
          if numRemovedElements == 1 then
            if hard then
              if parentPrefix == baseKey then
                removeParentDependencyKey(missedParentKey, hard, nil, baseKey, nil)
                removeJobKeys(missedParentKey)
                if parentAttributes[2] then
                  rcall("DEL", parentPrefix .. "de:" .. parentAttributes[2])
                end
              else
                _moveParentToWait(parentPrefix, parentId)
              end
            else
              _moveParentToWait(parentPrefix, parentId, true)
            end
          end
        end
        return true
      end
    end
  end
  return false
end
if rcall("EXISTS", jobKey) ~= 1 then return -1 end
if rcall("EXISTS", parentKey) ~= 1 then return -5 end
if removeParentDependencyKey(jobKey, false, parentKey, KEYS[1], nil) then
  rcall("HDEL", jobKey, "parentKey", "parent")
  return 0
else
  return 1
end`,keys:1},X={name:"removeDeduplicationKey",content:`--[[
  Remove deduplication key if it matches the job id.
  Input:
    KEYS[1] deduplication key
    ARGV[1] job id
  Output:
    0 - false
    1 - true
]]
local rcall = redis.call
local deduplicationKey = KEYS[1]
local jobId = ARGV[1]
local currentJobId = rcall('GET', deduplicationKey)
if currentJobId and currentJobId == jobId then
  return rcall("DEL", deduplicationKey)
end
return 0
`,keys:1},Y={name:"removeJob",content:`--[[
    Remove a job from all the statuses it may be in as well as all its data.
    In order to be able to remove a job, it cannot be active.
    Input:
      KEYS[1] jobKey
      KEYS[2] repeat key
      ARGV[1] jobId
      ARGV[2] remove children
      ARGV[3] queue prefix
    Events:
      'removed'
]]
local rcall = redis.call
-- Includes
--[[
  Function to check if the job belongs to a job scheduler and
  current delayed job matches with jobId
]]
local function isJobSchedulerJob(jobId, jobKey, jobSchedulersKey)
  local repeatJobKey = rcall("HGET", jobKey, "rjk")
  if repeatJobKey  then
    local prevMillis = rcall("ZSCORE", jobSchedulersKey, repeatJobKey)
    if prevMillis then
      local currentDelayedJobId = "repeat:" .. repeatJobKey .. ":" .. prevMillis
      return jobId == currentDelayedJobId
    end
  end
  return false
end
--[[
  Function to recursively check if there are no locks
  on the jobs to be removed.
  returns:
    boolean
]]
--[[
  Functions to destructure job key.
  Just a bit of warning, these functions may be a bit slow and affect performance significantly.
]]
local getJobIdFromKey = function (jobKey)
  return string.match(jobKey, ".*:(.*)")
end
local getJobKeyPrefix = function (jobKey, jobId)
  return string.sub(jobKey, 0, #jobKey - #jobId)
end
local function isLocked( prefix, jobId, removeChildren)
  local jobKey = prefix .. jobId;
  -- Check if this job is locked
  local lockKey = jobKey .. ':lock'
  local lock = rcall("GET", lockKey)
  if not lock then
    if removeChildren == "1" then
      local dependencies = rcall("SMEMBERS", jobKey .. ":dependencies")
      if (#dependencies > 0) then
        for i, childJobKey in ipairs(dependencies) do
          -- We need to get the jobId for this job.
          local childJobId = getJobIdFromKey(childJobKey)
          local childJobPrefix = getJobKeyPrefix(childJobKey, childJobId)
          local result = isLocked( childJobPrefix, childJobId, removeChildren )
          if result then
            return true
          end
        end
      end
    end
    return false
  end
  return true
end
--[[
    Remove a job from all the statuses it may be in as well as all its data,
    including its children. Active children can be ignored.
    Events:
      'removed'
]]
local rcall = redis.call
-- Includes
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
--[[
  Function to remove deduplication key if needed
  when a job is being removed.
]]
local function removeDeduplicationKeyIfNeededOnRemoval(prefixKey,
  jobId, deduplicationId)
  if deduplicationId then
    local deduplicationKey = prefixKey .. "de:" .. deduplicationId
    local currentJobId = rcall('GET', deduplicationKey)
    if currentJobId and currentJobId == jobId then
      return rcall("DEL", deduplicationKey)
    end
  end
end
--[[
  Function to remove from any state.
  returns:
    prev state
]]
local function removeJobFromAnyState( prefix, jobId)
  -- We start with the ZSCORE checks, since they have O(1) complexity
  if rcall("ZSCORE", prefix .. "completed", jobId) then
    rcall("ZREM", prefix .. "completed", jobId)
    return "completed"
  elseif rcall("ZSCORE", prefix .. "waiting-children", jobId) then
    rcall("ZREM", prefix .. "waiting-children", jobId)
    return "waiting-children"
  elseif rcall("ZSCORE", prefix .. "delayed", jobId) then
    rcall("ZREM", prefix .. "delayed", jobId)
    return "delayed"
  elseif rcall("ZSCORE", prefix .. "failed", jobId) then
    rcall("ZREM", prefix .. "failed", jobId)
    return "failed"
  elseif rcall("ZSCORE", prefix .. "prioritized", jobId) then
    rcall("ZREM", prefix .. "prioritized", jobId)
    return "prioritized"
  -- We remove only 1 element from the list, since we assume they are not added multiple times
  elseif rcall("LREM", prefix .. "wait", 1, jobId) == 1 then
    return "wait"
  elseif rcall("LREM", prefix .. "paused", 1, jobId) == 1 then
    return "paused"
  elseif rcall("LREM", prefix .. "active", 1, jobId) == 1 then
    return "active"
  end
  return "unknown"
end
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
--[[
  Check if this job has a parent. If so we will just remove it from
  the parent child list, but if it is the last child we should move the parent to "wait/paused"
  which requires code from "moveToFinished"
]]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
local function _moveParentToWait(parentPrefix, parentId, emitEvent)
  local parentTarget, isPausedOrMaxed = getTargetQueueList(parentPrefix .. "meta", parentPrefix .. "active",
    parentPrefix .. "wait", parentPrefix .. "paused")
  addJobInTargetList(parentTarget, parentPrefix .. "marker", "RPUSH", isPausedOrMaxed, parentId)
  if emitEvent then
    local parentEventStream = parentPrefix .. "events"
    rcall("XADD", parentEventStream, "*", "event", "waiting", "jobId", parentId, "prev", "waiting-children")
  end
end
local function removeParentDependencyKey(jobKey, hard, parentKey, baseKey, debounceId)
  if parentKey then
    local parentDependenciesKey = parentKey .. ":dependencies"
    local result = rcall("SREM", parentDependenciesKey, jobKey)
    if result > 0 then
      local pendingDependencies = rcall("SCARD", parentDependenciesKey)
      if pendingDependencies == 0 then
        local parentId = getJobIdFromKey(parentKey)
        local parentPrefix = getJobKeyPrefix(parentKey, parentId)
        local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
        if numRemovedElements == 1 then
          if hard then -- remove parent in same queue
            if parentPrefix == baseKey then
              removeParentDependencyKey(parentKey, hard, nil, baseKey, nil)
              removeJobKeys(parentKey)
              if debounceId then
                rcall("DEL", parentPrefix .. "de:" .. debounceId)
              end
            else
              _moveParentToWait(parentPrefix, parentId)
            end
          else
            _moveParentToWait(parentPrefix, parentId, true)
          end
        end
      end
      return true
    end
  else
    local parentAttributes = rcall("HMGET", jobKey, "parentKey", "deid")
    local missedParentKey = parentAttributes[1]
    if( (type(missedParentKey) == "string") and missedParentKey ~= ""
      and (rcall("EXISTS", missedParentKey) == 1)) then
      local parentDependenciesKey = missedParentKey .. ":dependencies"
      local result = rcall("SREM", parentDependenciesKey, jobKey)
      if result > 0 then
        local pendingDependencies = rcall("SCARD", parentDependenciesKey)
        if pendingDependencies == 0 then
          local parentId = getJobIdFromKey(missedParentKey)
          local parentPrefix = getJobKeyPrefix(missedParentKey, parentId)
          local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
          if numRemovedElements == 1 then
            if hard then
              if parentPrefix == baseKey then
                removeParentDependencyKey(missedParentKey, hard, nil, baseKey, nil)
                removeJobKeys(missedParentKey)
                if parentAttributes[2] then
                  rcall("DEL", parentPrefix .. "de:" .. parentAttributes[2])
                end
              else
                _moveParentToWait(parentPrefix, parentId)
              end
            else
              _moveParentToWait(parentPrefix, parentId, true)
            end
          end
        end
        return true
      end
    end
  end
  return false
end
local removeJobChildren
local removeJobWithChildren
removeJobChildren = function(prefix, jobKey, options)
    -- Check if this job has children
    -- If so, we are going to try to remove the children recursively in a depth-first way
    -- because if some job is locked, we must exit with an error.
    if not options.ignoreProcessed then
        local processed = rcall("HGETALL", jobKey .. ":processed")
        if #processed > 0 then
            for i = 1, #processed, 2 do
                local childJobId = getJobIdFromKey(processed[i])
                local childJobPrefix = getJobKeyPrefix(processed[i], childJobId)
                removeJobWithChildren(childJobPrefix, childJobId, jobKey, options)
            end
        end
        local failed = rcall("HGETALL", jobKey .. ":failed")
        if #failed > 0 then
            for i = 1, #failed, 2 do
                local childJobId = getJobIdFromKey(failed[i])
                local childJobPrefix = getJobKeyPrefix(failed[i], childJobId)
                removeJobWithChildren(childJobPrefix, childJobId, jobKey, options)
            end
        end
        local unsuccessful = rcall("ZRANGE", jobKey .. ":unsuccessful", 0, -1)
        if #unsuccessful > 0 then
            for i = 1, #unsuccessful, 1 do
                local childJobId = getJobIdFromKey(unsuccessful[i])
                local childJobPrefix = getJobKeyPrefix(unsuccessful[i], childJobId)
                removeJobWithChildren(childJobPrefix, childJobId, jobKey, options)
            end
        end
    end
    local dependencies = rcall("SMEMBERS", jobKey .. ":dependencies")
    if #dependencies > 0 then
        for i, childJobKey in ipairs(dependencies) do
            local childJobId = getJobIdFromKey(childJobKey)
            local childJobPrefix = getJobKeyPrefix(childJobKey, childJobId)
            removeJobWithChildren(childJobPrefix, childJobId, jobKey, options)
        end
    end
end
removeJobWithChildren = function(prefix, jobId, parentKey, options)
    local jobKey = prefix .. jobId
    if options.ignoreLocked then
        if isLocked(prefix, jobId) then
            return
        end
    end
    -- Check if job is in the failed zset
    local failedSet = prefix .. "failed"
    if not (options.ignoreProcessed and rcall("ZSCORE", failedSet, jobId)) then
        removeParentDependencyKey(jobKey, false, parentKey, nil)
        if options.removeChildren then
            removeJobChildren(prefix, jobKey, options)
        end
        local prev = removeJobFromAnyState(prefix, jobId)
        local deduplicationId = rcall("HGET", jobKey, "deid")
        removeDeduplicationKeyIfNeededOnRemoval(prefix, jobId, deduplicationId)
        if removeJobKeys(jobKey) > 0 then
            local metaKey = prefix .. "meta"
            local maxEvents = getOrSetMaxEvents(metaKey)
            rcall("XADD", prefix .. "events", "MAXLEN", "~", maxEvents, "*", "event", "removed",
                "jobId", jobId, "prev", prev)
        end
    end
end
local jobId = ARGV[1]
local shouldRemoveChildren = ARGV[2]
local prefix = ARGV[3]
local jobKey = KEYS[1]
local repeatKey = KEYS[2]
if isJobSchedulerJob(jobId, jobKey, repeatKey) then
    return -8
end
if not isLocked(prefix, jobId, shouldRemoveChildren) then
    local options = {
        removeChildren = shouldRemoveChildren == "1",
        ignoreProcessed = false,
        ignoreLocked = false
    }
    removeJobWithChildren(prefix, jobId, nil, options)
    return 1
end
return 0
`,keys:2},Z={name:"removeJobScheduler",content:`--[[
  Removes a job scheduler and its next scheduled job.
  Input:
    KEYS[1] job schedulers key
    KEYS[2] delayed jobs key
    KEYS[3] events key
    ARGV[1] job scheduler id
    ARGV[2] prefix key
  Output:
    0 - OK
    1 - Missing repeat job
  Events:
    'removed'
]]
local rcall = redis.call
-- Includes
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
local jobSchedulerId = ARGV[1]
local prefix = ARGV[2]
local millis = rcall("ZSCORE", KEYS[1], jobSchedulerId)
if millis then
  -- Delete next programmed job.
  local delayedJobId = "repeat:" .. jobSchedulerId .. ":" .. millis
  if(rcall("ZREM", KEYS[2], delayedJobId) == 1) then
    removeJobKeys(prefix .. delayedJobId)
    rcall("XADD", KEYS[3], "*", "event", "removed", "jobId", delayedJobId, "prev", "delayed")
  end
end
if(rcall("ZREM", KEYS[1], jobSchedulerId) == 1) then
  rcall("DEL", KEYS[1] .. ":" .. jobSchedulerId)
  return 0
end
return 1
`,keys:3},$={name:"removeOrphanedJobs",content:`--[[
  Removes orphaned job keys that exist in Redis but are not referenced
  in any queue state set. Checks each candidate atomically.
  Input:
    KEYS[1]  base prefix key including trailing colon (e.g. bull:queueName:)
    ARGV[1]  number of state key suffixes
    ARGV[2 .. 1+N]  state key suffixes (e.g. active, wait, completed, ...)
    ARGV[2+N]  number of job sub-key suffixes
    ARGV[3+N .. 2+N+M]  job sub-key suffixes (e.g. logs, dependencies, ...)
    ARGV[3+N+M .. end]  candidate job IDs to check
  Output:
    number of removed jobs
]]
local rcall = redis.call
local basePrefix = KEYS[1]
-- Parse state key suffixes and cache their full key names + types.
local stateKeyCount = tonumber(ARGV[1])
local stateKeys = {}
local stateKeyTypes = {}
for i = 1, stateKeyCount do
  local fullKey = basePrefix .. ARGV[1 + i]
  stateKeys[i] = fullKey
  stateKeyTypes[i] = rcall('TYPE', fullKey)['ok']
end
-- Parse job sub-key suffixes.
local subKeyCountIdx = 2 + stateKeyCount
local subKeyCount = tonumber(ARGV[subKeyCountIdx])
local subKeySuffixes = {}
for i = 1, subKeyCount do
  subKeySuffixes[i] = ARGV[subKeyCountIdx + i]
end
-- Process candidate job IDs.
local candidateStart = subKeyCountIdx + subKeyCount + 1
local removedCount = 0
for c = candidateStart, #ARGV do
  local jobId = ARGV[c]
  local found = false
  for i = 1, stateKeyCount do
    local kt = stateKeyTypes[i]
    if kt == 'list' then
      if rcall('LPOS', stateKeys[i], jobId) then
        found = true
        break
      end
    elseif kt == 'zset' then
      if rcall('ZSCORE', stateKeys[i], jobId) then
        found = true
        break
      end
    elseif kt == 'set' then
      if rcall('SISMEMBER', stateKeys[i], jobId) == 1 then
        found = true
        break
      end
    end
  end
  if not found then
    local jobKey = basePrefix .. jobId
    local keysToDelete = { jobKey }
    for _, suffix in ipairs(subKeySuffixes) do
      keysToDelete[#keysToDelete + 1] = jobKey .. ':' .. suffix
    end
    rcall('DEL', unpack(keysToDelete))
    removedCount = removedCount + 1
  end
end
return removedCount
`,keys:1},_={name:"removeRepeatable",content:`--[[
  Removes a repeatable job
  Input:
    KEYS[1] repeat jobs key
    KEYS[2] delayed jobs key
    KEYS[3] events key
    ARGV[1] old repeat job id
    ARGV[2] options concat
    ARGV[3] repeat job key
    ARGV[4] prefix key
  Output:
    0 - OK
    1 - Missing repeat job
  Events:
    'removed'
]]
local rcall = redis.call
local millis = rcall("ZSCORE", KEYS[1], ARGV[2])
-- Includes
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
-- legacy removal TODO: remove in next breaking change
if millis then
  -- Delete next programmed job.
  local repeatJobId = ARGV[1] .. millis
  if(rcall("ZREM", KEYS[2], repeatJobId) == 1) then
    removeJobKeys(ARGV[4] .. repeatJobId)
    rcall("XADD", KEYS[3], "*", "event", "removed", "jobId", repeatJobId, "prev", "delayed");
  end
end
if(rcall("ZREM", KEYS[1], ARGV[2]) == 1) then
  return 0
end
-- new removal
millis = rcall("ZSCORE", KEYS[1], ARGV[3])
if millis then
  -- Delete next programmed job.
  local repeatJobId = "repeat:" .. ARGV[3] .. ":" .. millis
  if(rcall("ZREM", KEYS[2], repeatJobId) == 1) then
    removeJobKeys(ARGV[4] .. repeatJobId)
    rcall("XADD", KEYS[3], "*", "event", "removed", "jobId", repeatJobId, "prev", "delayed")
  end
end
if(rcall("ZREM", KEYS[1], ARGV[3]) == 1) then
  rcall("DEL", KEYS[1] .. ":" .. ARGV[3])
  return 0
end
return 1
`,keys:3},aa={name:"removeUnprocessedChildren",content:`--[[
    Remove a job from all the statuses it may be in as well as all its data.
    In order to be able to remove a job, it cannot be active.
    Input:
      KEYS[1] jobKey
      KEYS[2] meta key
      ARGV[1] prefix
      ARGV[2] jobId
    Events:
      'removed' for every children removed
]]
-- Includes
--[[
    Remove a job from all the statuses it may be in as well as all its data,
    including its children. Active children can be ignored.
    Events:
      'removed'
]]
local rcall = redis.call
-- Includes
--[[
  Functions to destructure job key.
  Just a bit of warning, these functions may be a bit slow and affect performance significantly.
]]
local getJobIdFromKey = function (jobKey)
  return string.match(jobKey, ".*:(.*)")
end
local getJobKeyPrefix = function (jobKey, jobId)
  return string.sub(jobKey, 0, #jobKey - #jobId)
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
--[[
  Function to check if the job belongs to a job scheduler and
  current delayed job matches with jobId
]]
local function isJobSchedulerJob(jobId, jobKey, jobSchedulersKey)
  local repeatJobKey = rcall("HGET", jobKey, "rjk")
  if repeatJobKey  then
    local prevMillis = rcall("ZSCORE", jobSchedulersKey, repeatJobKey)
    if prevMillis then
      local currentDelayedJobId = "repeat:" .. repeatJobKey .. ":" .. prevMillis
      return jobId == currentDelayedJobId
    end
  end
  return false
end
--[[
  Function to remove deduplication key if needed
  when a job is being removed.
]]
local function removeDeduplicationKeyIfNeededOnRemoval(prefixKey,
  jobId, deduplicationId)
  if deduplicationId then
    local deduplicationKey = prefixKey .. "de:" .. deduplicationId
    local currentJobId = rcall('GET', deduplicationKey)
    if currentJobId and currentJobId == jobId then
      return rcall("DEL", deduplicationKey)
    end
  end
end
--[[
  Function to remove from any state.
  returns:
    prev state
]]
local function removeJobFromAnyState( prefix, jobId)
  -- We start with the ZSCORE checks, since they have O(1) complexity
  if rcall("ZSCORE", prefix .. "completed", jobId) then
    rcall("ZREM", prefix .. "completed", jobId)
    return "completed"
  elseif rcall("ZSCORE", prefix .. "waiting-children", jobId) then
    rcall("ZREM", prefix .. "waiting-children", jobId)
    return "waiting-children"
  elseif rcall("ZSCORE", prefix .. "delayed", jobId) then
    rcall("ZREM", prefix .. "delayed", jobId)
    return "delayed"
  elseif rcall("ZSCORE", prefix .. "failed", jobId) then
    rcall("ZREM", prefix .. "failed", jobId)
    return "failed"
  elseif rcall("ZSCORE", prefix .. "prioritized", jobId) then
    rcall("ZREM", prefix .. "prioritized", jobId)
    return "prioritized"
  -- We remove only 1 element from the list, since we assume they are not added multiple times
  elseif rcall("LREM", prefix .. "wait", 1, jobId) == 1 then
    return "wait"
  elseif rcall("LREM", prefix .. "paused", 1, jobId) == 1 then
    return "paused"
  elseif rcall("LREM", prefix .. "active", 1, jobId) == 1 then
    return "active"
  end
  return "unknown"
end
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
--[[
  Check if this job has a parent. If so we will just remove it from
  the parent child list, but if it is the last child we should move the parent to "wait/paused"
  which requires code from "moveToFinished"
]]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
local function _moveParentToWait(parentPrefix, parentId, emitEvent)
  local parentTarget, isPausedOrMaxed = getTargetQueueList(parentPrefix .. "meta", parentPrefix .. "active",
    parentPrefix .. "wait", parentPrefix .. "paused")
  addJobInTargetList(parentTarget, parentPrefix .. "marker", "RPUSH", isPausedOrMaxed, parentId)
  if emitEvent then
    local parentEventStream = parentPrefix .. "events"
    rcall("XADD", parentEventStream, "*", "event", "waiting", "jobId", parentId, "prev", "waiting-children")
  end
end
local function removeParentDependencyKey(jobKey, hard, parentKey, baseKey, debounceId)
  if parentKey then
    local parentDependenciesKey = parentKey .. ":dependencies"
    local result = rcall("SREM", parentDependenciesKey, jobKey)
    if result > 0 then
      local pendingDependencies = rcall("SCARD", parentDependenciesKey)
      if pendingDependencies == 0 then
        local parentId = getJobIdFromKey(parentKey)
        local parentPrefix = getJobKeyPrefix(parentKey, parentId)
        local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
        if numRemovedElements == 1 then
          if hard then -- remove parent in same queue
            if parentPrefix == baseKey then
              removeParentDependencyKey(parentKey, hard, nil, baseKey, nil)
              removeJobKeys(parentKey)
              if debounceId then
                rcall("DEL", parentPrefix .. "de:" .. debounceId)
              end
            else
              _moveParentToWait(parentPrefix, parentId)
            end
          else
            _moveParentToWait(parentPrefix, parentId, true)
          end
        end
      end
      return true
    end
  else
    local parentAttributes = rcall("HMGET", jobKey, "parentKey", "deid")
    local missedParentKey = parentAttributes[1]
    if( (type(missedParentKey) == "string") and missedParentKey ~= ""
      and (rcall("EXISTS", missedParentKey) == 1)) then
      local parentDependenciesKey = missedParentKey .. ":dependencies"
      local result = rcall("SREM", parentDependenciesKey, jobKey)
      if result > 0 then
        local pendingDependencies = rcall("SCARD", parentDependenciesKey)
        if pendingDependencies == 0 then
          local parentId = getJobIdFromKey(missedParentKey)
          local parentPrefix = getJobKeyPrefix(missedParentKey, parentId)
          local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
          if numRemovedElements == 1 then
            if hard then
              if parentPrefix == baseKey then
                removeParentDependencyKey(missedParentKey, hard, nil, baseKey, nil)
                removeJobKeys(missedParentKey)
                if parentAttributes[2] then
                  rcall("DEL", parentPrefix .. "de:" .. parentAttributes[2])
                end
              else
                _moveParentToWait(parentPrefix, parentId)
              end
            else
              _moveParentToWait(parentPrefix, parentId, true)
            end
          end
        end
        return true
      end
    end
  end
  return false
end
--[[
  Function to recursively check if there are no locks
  on the jobs to be removed.
  returns:
    boolean
]]
local function isLocked( prefix, jobId, removeChildren)
  local jobKey = prefix .. jobId;
  -- Check if this job is locked
  local lockKey = jobKey .. ':lock'
  local lock = rcall("GET", lockKey)
  if not lock then
    if removeChildren == "1" then
      local dependencies = rcall("SMEMBERS", jobKey .. ":dependencies")
      if (#dependencies > 0) then
        for i, childJobKey in ipairs(dependencies) do
          -- We need to get the jobId for this job.
          local childJobId = getJobIdFromKey(childJobKey)
          local childJobPrefix = getJobKeyPrefix(childJobKey, childJobId)
          local result = isLocked( childJobPrefix, childJobId, removeChildren )
          if result then
            return true
          end
        end
      end
    end
    return false
  end
  return true
end
local removeJobChildren
local removeJobWithChildren
removeJobChildren = function(prefix, jobKey, options)
    -- Check if this job has children
    -- If so, we are going to try to remove the children recursively in a depth-first way
    -- because if some job is locked, we must exit with an error.
    if not options.ignoreProcessed then
        local processed = rcall("HGETALL", jobKey .. ":processed")
        if #processed > 0 then
            for i = 1, #processed, 2 do
                local childJobId = getJobIdFromKey(processed[i])
                local childJobPrefix = getJobKeyPrefix(processed[i], childJobId)
                removeJobWithChildren(childJobPrefix, childJobId, jobKey, options)
            end
        end
        local failed = rcall("HGETALL", jobKey .. ":failed")
        if #failed > 0 then
            for i = 1, #failed, 2 do
                local childJobId = getJobIdFromKey(failed[i])
                local childJobPrefix = getJobKeyPrefix(failed[i], childJobId)
                removeJobWithChildren(childJobPrefix, childJobId, jobKey, options)
            end
        end
        local unsuccessful = rcall("ZRANGE", jobKey .. ":unsuccessful", 0, -1)
        if #unsuccessful > 0 then
            for i = 1, #unsuccessful, 1 do
                local childJobId = getJobIdFromKey(unsuccessful[i])
                local childJobPrefix = getJobKeyPrefix(unsuccessful[i], childJobId)
                removeJobWithChildren(childJobPrefix, childJobId, jobKey, options)
            end
        end
    end
    local dependencies = rcall("SMEMBERS", jobKey .. ":dependencies")
    if #dependencies > 0 then
        for i, childJobKey in ipairs(dependencies) do
            local childJobId = getJobIdFromKey(childJobKey)
            local childJobPrefix = getJobKeyPrefix(childJobKey, childJobId)
            removeJobWithChildren(childJobPrefix, childJobId, jobKey, options)
        end
    end
end
removeJobWithChildren = function(prefix, jobId, parentKey, options)
    local jobKey = prefix .. jobId
    if options.ignoreLocked then
        if isLocked(prefix, jobId) then
            return
        end
    end
    -- Check if job is in the failed zset
    local failedSet = prefix .. "failed"
    if not (options.ignoreProcessed and rcall("ZSCORE", failedSet, jobId)) then
        removeParentDependencyKey(jobKey, false, parentKey, nil)
        if options.removeChildren then
            removeJobChildren(prefix, jobKey, options)
        end
        local prev = removeJobFromAnyState(prefix, jobId)
        local deduplicationId = rcall("HGET", jobKey, "deid")
        removeDeduplicationKeyIfNeededOnRemoval(prefix, jobId, deduplicationId)
        if removeJobKeys(jobKey) > 0 then
            local metaKey = prefix .. "meta"
            local maxEvents = getOrSetMaxEvents(metaKey)
            rcall("XADD", prefix .. "events", "MAXLEN", "~", maxEvents, "*", "event", "removed",
                "jobId", jobId, "prev", prev)
        end
    end
end
local prefix = ARGV[1]
local jobId = ARGV[2]
local jobKey = KEYS[1]
local metaKey = KEYS[2]
local options = {
  removeChildren = "1",
  ignoreProcessed = true,
  ignoreLocked = true
}
removeJobChildren(prefix, jobKey, options) 
`,keys:2},ab={name:"reprocessJob",content:`--[[
  Attempts to reprocess a job
  Input:
    KEYS[1] job key
    KEYS[2] events stream
    KEYS[3] job state
    KEYS[4] wait key
    KEYS[5] meta
    KEYS[6] paused key
    KEYS[7] active key
    KEYS[8] marker key
    ARGV[1] job.id
    ARGV[2] (job.opts.lifo ? 'R' : 'L') + 'PUSH'
    ARGV[3] propVal - failedReason/returnvalue
    ARGV[4] prev state - failed/completed
    ARGV[5] reset attemptsMade - "1" or "0"
    ARGV[6] reset attemptsStarted - "1" or "0"
  Output:
     1 means the operation was a success
    -1 means the job does not exist
    -3 means the job was not found in the expected set.
]]
local rcall = redis.call;
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
local jobKey = KEYS[1]
if rcall("EXISTS", jobKey) == 1 then
  local jobId = ARGV[1]
  if (rcall("ZREM", KEYS[3], jobId) == 1) then
    local attributesToRemove = {}
    if ARGV[5] == "1" then
      table.insert(attributesToRemove, "atm")
    end
    if ARGV[6] == "1" then
      table.insert(attributesToRemove, "ats")
    end
    rcall("HDEL", jobKey, "finishedOn", "processedOn", ARGV[3], unpack(attributesToRemove))
    local target, isPausedOrMaxed = getTargetQueueList(KEYS[5], KEYS[7], KEYS[4], KEYS[6])
    addJobInTargetList(target, KEYS[8], ARGV[2], isPausedOrMaxed, jobId)
    local parentKey = rcall("HGET", jobKey, "parentKey")
    if parentKey and rcall("EXISTS", parentKey) == 1 then
      if ARGV[4] == "failed" then
        if rcall("ZREM", parentKey .. ":unsuccessful", jobKey) == 1 or
          rcall("ZREM", parentKey .. ":failed", jobKey) == 1 then
          rcall("SADD", parentKey .. ":dependencies", jobKey)
        end
      else
        if rcall("HDEL", parentKey .. ":processed", jobKey) == 1 then
          rcall("SADD", parentKey .. ":dependencies", jobKey)
        end
      end
    end
    local maxEvents = getOrSetMaxEvents(KEYS[5])
    -- Emit waiting event
    rcall("XADD", KEYS[2], "MAXLEN", "~", maxEvents, "*", "event", "waiting",
      "jobId", jobId, "prev", ARGV[4]);
    return 1
  else
    return -3
  end
else
  return -1
end
`,keys:8},ac={name:"retryJob",content:`--[[
  Retries a failed job by moving it back to the wait queue.
    Input:
      KEYS[1]  'active',
      KEYS[2]  'wait'
      KEYS[3]  'paused'
      KEYS[4]  job key
      KEYS[5]  'meta'
      KEYS[6]  events stream
      KEYS[7]  delayed key
      KEYS[8]  prioritized key
      KEYS[9]  'pc' priority counter
      KEYS[10] 'marker'
      KEYS[11] 'stalled'
      ARGV[1]  key prefix
      ARGV[2]  timestamp
      ARGV[3]  pushCmd
      ARGV[4]  jobId
      ARGV[5]  token
      ARGV[6]  optional job fields to update
    Events:
      'waiting'
    Output:
     0  - OK
     -1 - Missing key
     -2 - Missing lock
     -3 - Job not in active set
]]
local rcall = redis.call
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Function to get priority score.
]]
local function getPriorityScore(priority, priorityCounterKey)
  local prioCounter = rcall("INCR", priorityCounterKey)
  return priority * 0x100000000 + prioCounter % 0x100000000
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey,
  isPausedOrMaxed)
  local score = getPriorityScore(priority, priorityCounterKey)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
--[[
  Function to check if queue is paused or maxed
  (since an empty list and !EXISTS are not really the same).
]]
local function isQueuePausedOrMaxed(queueMetaKey, activeKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      return activeCount >= tonumber(queueAttributes[2])
    end
  end
  return false
end
--[[
  Updates the delay set, by moving delayed jobs that should
  be processed now to "wait".
     Events:
      'waiting'
]]
-- Includes
-- Try to get as much as 1000 jobs at once
local function promoteDelayedJobs(delayedKey, markerKey, targetKey, prioritizedKey,
                                  eventStreamKey, prefix, timestamp, priorityCounterKey, isPaused)
    local jobs = rcall("ZRANGEBYSCORE", delayedKey, 0, (timestamp + 1) * 0x1000 - 1, "LIMIT", 0, 1000)
    if (#jobs > 0) then
        rcall("ZREM", delayedKey, unpack(jobs))
        for _, jobId in ipairs(jobs) do
            local jobKey = prefix .. jobId
            local priority =
                tonumber(rcall("HGET", jobKey, "priority")) or 0
            if priority == 0 then
                -- LIFO or FIFO
                rcall("LPUSH", targetKey, jobId)
            else
                local score = getPriorityScore(priority, priorityCounterKey)
                rcall("ZADD", prioritizedKey, score, jobId)
            end
            -- Emit waiting event
            rcall("XADD", eventStreamKey, "*", "event", "waiting", "jobId",
                  jobId, "prev", "delayed")
            rcall("HSET", jobKey, "delay", 0)
        end
        addBaseMarkerIfNeeded(markerKey, isPaused)
    end
end
local function removeLock(jobKey, stalledKey, token, jobId)
  if token ~= "0" then
    local lockKey = jobKey .. ':lock'
    local lockToken = rcall("GET", lockKey)
    if lockToken == token then
      rcall("DEL", lockKey)
      rcall("SREM", stalledKey, jobId)
    else
      if lockToken then
        -- Lock exists but token does not match
        return -6
      else
        -- Lock is missing completely
        return -2
      end
    end
  end
  return 0
end
--[[
  Function to update a bunch of fields in a job.
]]
local function updateJobFields(jobKey, msgpackedFields)
  if msgpackedFields and #msgpackedFields > 0 then
    local fieldsToUpdate = cmsgpack.unpack(msgpackedFields)
    if fieldsToUpdate then
      rcall("HMSET", jobKey, unpack(fieldsToUpdate))
    end
  end
end
local target, isPausedOrMaxed = getTargetQueueList(KEYS[5], KEYS[1], KEYS[2], KEYS[3])
local markerKey = KEYS[10]
-- Check if there are delayed jobs that we can move to wait.
-- test example: when there are delayed jobs between retries
promoteDelayedJobs(KEYS[7], markerKey, target, KEYS[8], KEYS[6], ARGV[1], ARGV[2], KEYS[9], isPausedOrMaxed)
local jobKey = KEYS[4]
if rcall("EXISTS", jobKey) == 1 then
  local errorCode = removeLock(jobKey, KEYS[11], ARGV[5], ARGV[4]) 
  if errorCode < 0 then
    return errorCode
  end
  updateJobFields(jobKey, ARGV[6])
  local numRemovedElements = rcall("LREM", KEYS[1], -1, ARGV[4])
  if (numRemovedElements < 1) then return -3 end
  local priority = tonumber(rcall("HGET", jobKey, "priority")) or 0
  --need to re-evaluate after removing job from active
  isPausedOrMaxed = isQueuePausedOrMaxed(KEYS[5], KEYS[1])
  -- Standard or priority add
  if priority == 0 then
    addJobInTargetList(target, markerKey, ARGV[3], isPausedOrMaxed, ARGV[4])
  else
    addJobWithPriority(markerKey, KEYS[8], priority, ARGV[4], KEYS[9], isPausedOrMaxed)
  end
  rcall("HINCRBY", jobKey, "atm", 1)
  local maxEvents = getOrSetMaxEvents(KEYS[5])
  -- Emit waiting event
  rcall("XADD", KEYS[6], "MAXLEN", "~", maxEvents, "*", "event", "waiting",
    "jobId", ARGV[4], "prev", "active")
  return 0
else
  return -1
end
`,keys:11},ad={name:"saveStacktrace",content:`--[[
  Save stacktrace and failedReason.
  Input:
    KEYS[1] job key
    ARGV[1]  stacktrace
    ARGV[2]  failedReason
  Output:
     0 - OK
    -1 - Missing key
]]
local rcall = redis.call
if rcall("EXISTS", KEYS[1]) == 1 then
  rcall("HMSET", KEYS[1], "stacktrace", ARGV[1], "failedReason", ARGV[2])
  return 0
else
  return -1
end
`,keys:1},ae={name:"updateData",content:`--[[
  Update job data
  Input:
    KEYS[1] Job id key
    ARGV[1] data
  Output:
    0 - OK
   -1 - Missing job.
]]
local rcall = redis.call
if rcall("EXISTS",KEYS[1]) == 1 then -- // Make sure job exists
  rcall("HSET", KEYS[1], "data", ARGV[1])
  return 0
else
  return -1
end
`,keys:1},af={name:"updateJobScheduler",content:`--[[
  Updates a job scheduler and adds next delayed job
  Input:
    KEYS[1]  'repeat' key
    KEYS[2]  'delayed'
    KEYS[3]  'wait' key
    KEYS[4]  'paused' key
    KEYS[5]  'meta'
    KEYS[6]  'prioritized' key
    KEYS[7]  'marker',
    KEYS[8]  'id'
    KEYS[9]  events stream key
    KEYS[10] 'pc' priority counter
    KEYS[11] producer key
    KEYS[12] 'active' key
    ARGV[1] next milliseconds
    ARGV[2] jobs scheduler id
    ARGV[3] Json stringified delayed data
    ARGV[4] msgpacked delayed opts
    ARGV[5] timestamp
    ARGV[6] prefix key
    ARGV[7] producer id
    Output:
      next delayed job id  - OK
]] local rcall = redis.call
local repeatKey = KEYS[1]
local delayedKey = KEYS[2]
local waitKey = KEYS[3]
local pausedKey = KEYS[4]
local metaKey = KEYS[5]
local prioritizedKey = KEYS[6]
local nextMillis = tonumber(ARGV[1])
local jobSchedulerId = ARGV[2]
local timestamp = tonumber(ARGV[5])
local prefixKey = ARGV[6]
local producerId = ARGV[7]
local jobOpts = cmsgpack.unpack(ARGV[4])
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Adds a delayed job to the queue by doing the following:
    - Creates a new job key with the job data.
    - adds to delayed zset.
    - Emits a global event 'delayed' if the job is delayed.
]]
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if nextTimestamp ~= nil then
      return nextTimestamp / 0x1000
    end
  end
end
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
  local nextTimestamp = getNextDelayedTimestamp(delayedKey)
  if nextTimestamp ~= nil then
    -- Replace the score of the marker with the newest known
    -- next timestamp.
    rcall("ZADD", markerKey, nextTimestamp, "1")
  end
end
--[[
  Bake in the job id first 12 bits into the timestamp
  to guarantee correct execution order of delayed jobs
  (up to 4096 jobs per given timestamp or 4096 jobs apart per timestamp)
  WARNING: Jobs that are so far apart that they wrap around will cause FIFO to fail
]]
local function getDelayedScore(delayedKey, timestamp, delay)
  local delayedTimestamp = (delay > 0 and (tonumber(timestamp) + delay)) or tonumber(timestamp)
  local minScore = delayedTimestamp * 0x1000
  local maxScore = (delayedTimestamp + 1 ) * 0x1000 - 1
  local result = rcall("ZREVRANGEBYSCORE", delayedKey, maxScore,
    minScore, "WITHSCORES","LIMIT", 0, 1)
  if #result then
    local currentMaxScore = tonumber(result[2])
    if currentMaxScore ~= nil then
      if currentMaxScore >= maxScore then
        return maxScore, delayedTimestamp
      else
        return currentMaxScore + 1, delayedTimestamp
      end
    end
  end
  return minScore, delayedTimestamp
end
local function addDelayedJob(jobId, delayedKey, eventsKey, timestamp,
  maxEvents, markerKey, delay)
  local score, delayedTimestamp = getDelayedScore(delayedKey, timestamp, tonumber(delay))
  rcall("ZADD", delayedKey, score, jobId)
  rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "delayed",
    "jobId", jobId, "delay", delayedTimestamp)
  -- mark that a delayed job is available
  addDelayMarkerIfNeeded(markerKey, delayedKey)
end
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
--[[
  Function to get priority score.
]]
local function getPriorityScore(priority, priorityCounterKey)
  local prioCounter = rcall("INCR", priorityCounterKey)
  return priority * 0x100000000 + prioCounter % 0x100000000
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey,
  isPausedOrMaxed)
  local score = getPriorityScore(priority, priorityCounterKey)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function isQueuePaused(queueMetaKey)
  return rcall("HEXISTS", queueMetaKey, "paused") == 1
end
--[[
  Function to store a job
]]
local function storeJob(eventsKey, jobIdKey, jobId, name, data, opts, timestamp,
                        parentKey, parentData, repeatJobKey)
    local jsonOpts = cjson.encode(opts)
    local delay = opts['delay'] or 0
    local priority = opts['priority'] or 0
    local debounceId = opts['de'] and opts['de']['id']
    local optionalValues = {}
    if parentKey ~= nil then
        table.insert(optionalValues, "parentKey")
        table.insert(optionalValues, parentKey)
        table.insert(optionalValues, "parent")
        table.insert(optionalValues, parentData)
    end
    if repeatJobKey then
        table.insert(optionalValues, "rjk")
        table.insert(optionalValues, repeatJobKey)
    end
    if debounceId then
        table.insert(optionalValues, "deid")
        table.insert(optionalValues, debounceId)
    end
    rcall("HMSET", jobIdKey, "name", name, "data", data, "opts", jsonOpts,
          "timestamp", timestamp, "delay", delay, "priority", priority,
          unpack(optionalValues))
    rcall("XADD", eventsKey, "*", "event", "added", "jobId", jobId, "name", name)
    return delay, priority
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
local function addJobFromScheduler(jobKey, jobId, opts, waitKey, pausedKey, activeKey, metaKey, 
  prioritizedKey, priorityCounter, delayedKey, markerKey, eventsKey, name, maxEvents, timestamp,
  data, jobSchedulerId, repeatDelay)
  opts['delay'] = repeatDelay
  opts['jobId'] = jobId
  local delay, priority = storeJob(eventsKey, jobKey, jobId, name, data,
    opts, timestamp, nil, nil, jobSchedulerId)
  if delay ~= 0 then
    addDelayedJob(jobId, delayedKey, eventsKey, timestamp, maxEvents, markerKey, delay)
  else
    local target, isPausedOrMaxed = getTargetQueueList(metaKey, activeKey, waitKey, pausedKey)
    -- Standard or priority add
    if priority == 0 then
      local pushCmd = opts['lifo'] and 'RPUSH' or 'LPUSH'
      addJobInTargetList(target, markerKey, pushCmd, isPausedOrMaxed, jobId)
    else
      -- Priority add
      addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounter, isPausedOrMaxed)
    end
    -- Emit waiting event
    rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents,  "*", "event", "waiting", "jobId", jobId)
  end
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
local function getJobSchedulerEveryNextMillis(prevMillis, every, now, offset, startDate)
    local nextMillis
    if not prevMillis then
        if startDate then
            -- Assuming startDate is passed as milliseconds from JavaScript
            nextMillis = tonumber(startDate)
            nextMillis = nextMillis > now and nextMillis or now
        else
            nextMillis = now
        end
    else
        nextMillis = prevMillis + every
        -- check if we may have missed some iterations
        if nextMillis < now then
            nextMillis = math.floor(now / every) * every + every + (offset or 0)
        end
    end
    if not offset or offset == 0 then
        local timeSlot = math.floor(nextMillis / every) * every;
        offset = nextMillis - timeSlot;
    end
    -- Return a tuple nextMillis, offset
    return math.floor(nextMillis), math.floor(offset)
end
local prevMillis = rcall("ZSCORE", repeatKey, jobSchedulerId)
-- Validate that scheduler exists.
-- If it does not exist we should not iterate anymore.
if prevMillis then
    prevMillis = tonumber(prevMillis)
    local schedulerKey = repeatKey .. ":" .. jobSchedulerId
    local schedulerAttributes = rcall("HMGET", schedulerKey, "name", "data", "every", "startDate", "offset")
    local every = tonumber(schedulerAttributes[3])
    local now = tonumber(timestamp)
    -- If every is not found in scheduler attributes, try to get it from job options
    if not every and jobOpts['repeat'] and jobOpts['repeat']['every'] then
        every = tonumber(jobOpts['repeat']['every'])
    end
    if every then
        local startDate = schedulerAttributes[4]
        local jobOptsOffset = jobOpts['repeat'] and jobOpts['repeat']['offset'] or 0
        local offset = schedulerAttributes[5] or jobOptsOffset or 0
        local newOffset
        nextMillis, newOffset = getJobSchedulerEveryNextMillis(prevMillis, every, now, offset, startDate)
        if not offset then
            rcall("HSET", schedulerKey, "offset", newOffset)
            jobOpts['repeat']['offset'] = newOffset
        end
    end
    local nextDelayedJobId = "repeat:" .. jobSchedulerId .. ":" .. nextMillis
    local nextDelayedJobKey = schedulerKey .. ":" .. nextMillis
    local currentDelayedJobId = "repeat:" .. jobSchedulerId .. ":" .. prevMillis
    if producerId == currentDelayedJobId then
        local eventsKey = KEYS[9]
        local maxEvents = getOrSetMaxEvents(metaKey)
        if rcall("EXISTS", nextDelayedJobKey) ~= 1 then
            rcall("ZADD", repeatKey, nextMillis, jobSchedulerId)
            rcall("HINCRBY", schedulerKey, "ic", 1)
            rcall("INCR", KEYS[8])
            -- TODO: remove this workaround in next breaking change,
            -- all job-schedulers must save job data
            local templateData = schedulerAttributes[2] or ARGV[3]
            if templateData and templateData ~= '{}' then
                rcall("HSET", schedulerKey, "data", templateData)
            end
            local delay = nextMillis - now
            -- Fast Clamp delay to minimum of 0
            if delay < 0 then
                delay = 0
            end
            jobOpts["delay"] = delay
            addJobFromScheduler(nextDelayedJobKey, nextDelayedJobId, jobOpts, waitKey, pausedKey, KEYS[12], metaKey,
                prioritizedKey, KEYS[10], delayedKey, KEYS[7], eventsKey, schedulerAttributes[1], maxEvents, ARGV[5],
                templateData or '{}', jobSchedulerId, delay)
            -- TODO: remove this workaround in next breaking change
            if KEYS[11] ~= "" then
                rcall("HSET", KEYS[11], "nrjid", nextDelayedJobId)
            end
            return nextDelayedJobId .. "" -- convert to string
        else
            rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "duplicated", "jobId", nextDelayedJobId)
        end
    end
end
`,keys:12},ag={name:"updateProgress",content:`--[[
  Update job progress
  Input:
    KEYS[1] Job id key
    KEYS[2] event stream key
    KEYS[3] meta key
    ARGV[1] id
    ARGV[2] progress
  Output:
     0 - OK
    -1 - Missing job.
  Event:
    progress(jobId, progress)
]]
local rcall = redis.call
-- Includes
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
if rcall("EXISTS", KEYS[1]) == 1 then -- // Make sure job exists
    local maxEvents = getOrSetMaxEvents(KEYS[3])
    rcall("HSET", KEYS[1], "progress", ARGV[2])
    rcall("XADD", KEYS[2], "MAXLEN", "~", maxEvents, "*", "event", "progress",
          "jobId", ARGV[1], "data", ARGV[2]);
    return 0
else
    return -1
end
`,keys:3},ah={name:"updateRepeatableJobMillis",content:`--[[
  Adds a repeatable job
    Input:
      KEYS[1] 'repeat' key
      ARGV[1] next milliseconds
      ARGV[2] custom key
      ARGV[3] legacy custom key TODO: remove this logic in next breaking change
      Output:
        repeatableKey  - OK
]]
local rcall = redis.call
local repeatKey = KEYS[1]
local nextMillis = ARGV[1]
local customKey = ARGV[2]
local legacyCustomKey = ARGV[3]
if rcall("ZSCORE", repeatKey, customKey) then
    rcall("ZADD", repeatKey, nextMillis, customKey)
    return customKey
elseif rcall("ZSCORE", repeatKey, legacyCustomKey) ~= false then
    rcall("ZADD", repeatKey, nextMillis, legacyCustomKey)
    return legacyCustomKey
end
return ''
`,keys:1};class ai extends f.EventEmitter{constructor(a,b){if(super(),this.extraOptions=b,this.capabilities={canDoubleTimeout:!1,canBlockFor1Ms:!0},this.status="initializing",this.dbType="redis",this.packageVersion=k.r,this.extraOptions=Object.assign({shared:!1,blocking:!0,skipVersionCheck:!1,skipWaitingForReady:!1},b),(0,j.rI)(a)){if(this._client=a,this._client.options.keyPrefix)throw Error("BullMQ: ioredis does not support ioredis prefixes, use the prefix option instead.");(0,j.oA)(this._client)?this.opts=this._client.options.redisOptions:this.opts=this._client.options,this.checkBlockingOptions("BullMQ: Your redis options maxRetriesPerRequest must be null.",this.opts,!0)}else this.checkBlockingOptions("BullMQ: WARNING! Your redis options maxRetriesPerRequest must be null and will be overridden by BullMQ.",a),this.opts=Object.assign({port:6379,host:"127.0.0.1",retryStrategy:function(a){return Math.max(Math.min(Math.exp(a),2e4),1e3)}},a),this.extraOptions.blocking&&(this.opts.maxRetriesPerRequest=null);this.skipVersionCheck=(null==b?void 0:b.skipVersionCheck)||!!(this.opts&&this.opts.skipVersionCheck),this.handleClientError=a=>{this.emit("error",a)},this.handleClientClose=()=>{this.emit("close")},this.handleClientReady=()=>{this.emit("ready")},this.initializing=this.init(),this.initializing.catch(a=>this.emit("error",a))}checkBlockingOptions(a,b,c=!1){if(this.extraOptions.blocking&&b&&b.maxRetriesPerRequest)if(c)throw Error(a);else console.error(a)}static async waitUntilReady(a){let b,c,d;if("ready"!==a.status){if("wait"===a.status)return a.connect();if("end"===a.status)throw Error(i.CONNECTION_CLOSED_ERROR_MSG);try{await new Promise((e,f)=>{let g;d=a=>{g=a},b=()=>{e()},c=()=>{"end"!==a.status?f(g||Error(i.CONNECTION_CLOSED_ERROR_MSG)):g?f(g):e()},(0,j.w)(a,3),a.once("ready",b),a.on("end",c),a.once("error",d)})}finally{a.removeListener("end",c),a.removeListener("error",d),a.removeListener("ready",b),(0,j.q7)(a,3)}}}get client(){return this.initializing}loadCommands(a,b){let c=b||d;for(let b in c){let d=`${c[b].name}:${a}`;this._client[d]||this._client.defineCommand(d,{numberOfKeys:c[b].keys,lua:c[b].content})}}async init(){if(!this._client){let a=this.opts,{url:b}=a,c=(0,e.Tt)(a,["url"]);this._client=b?new(h())(b,c):new(h())(c)}if((0,j.w)(this._client,3),this._client.on("error",this.handleClientError),this._client.on("close",this.handleClientClose),this._client.on("ready",this.handleClientReady),this.extraOptions.skipWaitingForReady||await ai.waitUntilReady(this._client),this.loadCommands(this.packageVersion),"end"!==this._client.status){let a=await this.getRedisVersionAndType();if(this.version=a.version,this.dbType=a.databaseType,!0!==this.skipVersionCheck&&!this.closing){if((0,j.dP)(this.version,ai.minimumVersion,this.dbType))throw Error(`Redis version needs to be greater or equal than ${ai.minimumVersion} Current: ${this.version}`);(0,j.dP)(this.version,ai.recommendedMinimumVersion,this.dbType)&&console.warn(`It is highly recommended to use a minimum Redis version of ${ai.recommendedMinimumVersion}
             Current: ${this.version}`)}this.capabilities={canDoubleTimeout:!(0,j.dP)(this.version,"6.0.0",this.dbType),canBlockFor1Ms:!(0,j.dP)(this.version,"7.0.8",this.dbType)},this.status="ready"}return this._client}async disconnect(a=!0){let b=await this.client;if("end"!==b.status){let c,d;if(!a)return b.disconnect();let e=new Promise((a,e)=>{(0,j.w)(b,2),b.once("end",a),b.once("error",e),c=a,d=e});b.disconnect();try{await e}finally{(0,j.q7)(b,2),b.removeListener("end",c),b.removeListener("error",d)}}}async reconnect(){return(await this.client).connect()}async close(a=!1){if(!this.closing){let b=this.status;this.status="closing",this.closing=!0;try{"ready"===b&&await this.initializing,this.extraOptions.shared||("initializing"==b||a?this._client.disconnect():await this._client.quit(),this._client.status="end")}catch(a){if((0,j.sr)(a))throw a}finally{this._client.off("error",this.handleClientError),this._client.off("close",this.handleClientClose),this._client.off("ready",this.handleClientReady),(0,j.q7)(this._client,3),this.removeAllListeners(),this.status="closed"}}}async getRedisVersionAndType(){let a;if(this.skipVersionCheck)return{version:ai.minimumVersion,databaseType:"redis"};let b=await this._client.info(),c="redis_version:",d="maxmemory_policy:",e=b.split(/\r?\n/),f="redis";for(let b=0;b<e.length;b++){let g=e[b];if(g.includes("dragonfly_version:")||g.includes("server:Dragonfly")?(f="dragonfly",0===g.indexOf("dragonfly_version:")&&(a=g.substr(18))):g.includes("valkey_version:")||g.includes("server:Valkey")?(f="valkey",0===g.indexOf("valkey_version:")&&(a=g.substr(15))):0===g.indexOf(c)&&(a=g.substr(c.length),"redis"===f&&(f="redis")),0===g.indexOf(d)){let a=g.substr(d.length);"noeviction"!==a&&console.warn(`IMPORTANT! Eviction policy is ${a}. It should be "noeviction"`)}}if(!a){for(let b of e)if(b.includes("version:")){let c=b.split(":");if(c.length>=2){a=c[1];break}}}return{version:a||ai.minimumVersion,databaseType:f}}get redisVersion(){return this.version}get databaseType(){return this.dbType}}ai.minimumVersion="5.0.0",ai.recommendedMinimumVersion="6.2.0"},46369:(a,b,c)=>{"use strict";Object.defineProperty(b,"__esModule",{value:!0}),b.FailoverDetector=void 0;let d=(0,c(95422).Debug)("FailoverDetector"),e="+switch-master";class f{constructor(a,b){this.isDisconnected=!1,this.connector=a,this.sentinels=b}cleanup(){for(let a of(this.isDisconnected=!0,this.sentinels))a.client.disconnect()}async subscribe(){d("Starting FailoverDetector");let a=[];for(let b of this.sentinels){let c=b.client.subscribe(e).catch(a=>{d("Failed to subscribe to failover messages on sentinel %s:%s (%s)",b.address.host||"127.0.0.1",b.address.port||26739,a.message)});a.push(c),b.client.on("message",a=>{this.isDisconnected||a!==e||this.disconnect()})}await Promise.all(a)}disconnect(){this.isDisconnected=!0,d("Failover detected, disconnecting"),this.connector.disconnect()}}b.FailoverDetector=f},47351:(a,b,c)=>{"use strict";let d=c(72988);a.exports=(a,b)=>{try{return new d(a,b).range||"*"}catch(a){return null}}},48067:(a,b,c)=>{"use strict";let d=c(70405),e=c(35567),{safeRe:f,t:g}=c(35137);a.exports=(a,b)=>{if(a instanceof d)return a;if("number"==typeof a&&(a=String(a)),"string"!=typeof a)return null;let c=null;if((b=b||{}).rtl){let d,e=b.includePrerelease?f[g.COERCERTLFULL]:f[g.COERCERTL];for(;(d=e.exec(a))&&(!c||c.index+c[0].length!==a.length);)c&&d.index+d[0].length===c.index+c[0].length||(c=d),e.lastIndex=d.index+d[1].length+d[2].length;e.lastIndex=-1}else c=a.match(b.includePrerelease?f[g.COERCEFULL]:f[g.COERCE]);if(null===c)return null;let h=c[2],i=c[3]||"0",j=c[4]||"0",k=b.includePrerelease&&c[5]?`-${c[5]}`:"",l=b.includePrerelease&&c[6]?`+${c[6]}`:"";return e(`${h}.${i}.${j}${k}${l}`,b)}},48079:(a,b,c)=>{"use strict";Object.defineProperty(b,"__esModule",{value:!0});let d=c(95422),e=c(27399),f=(0,d.Debug)("delayqueue");class g{constructor(){this.queues={},this.timeouts={}}push(a,b,c){let d=c.callback||process.nextTick;this.queues[a]||(this.queues[a]=new e),this.queues[a].push(b),this.timeouts[a]||(this.timeouts[a]=setTimeout(()=>{d(()=>{this.timeouts[a]=null,this.execute(a)})},c.timeout))}execute(a){let b=this.queues[a];if(!b)return;let{length:c}=b;if(c)for(f("send %d commands in %s queue",c,a),this.queues[a]=null;b.length>0;)b.shift()()}}b.default=g},49414:a=>{var b=/^(?:0|[1-9]\d*)$/;function c(a,b,c){switch(c.length){case 0:return a.call(b);case 1:return a.call(b,c[0]);case 2:return a.call(b,c[0],c[1]);case 3:return a.call(b,c[0],c[1],c[2])}return a.apply(b,c)}var d=Object.prototype,e=d.hasOwnProperty,f=d.toString,g=d.propertyIsEnumerable,h=Math.max;function i(a,b,c,f){return void 0===a||l(a,d[c])&&!e.call(f,c)?b:a}function j(a,b){return b=h(void 0===b?a.length-1:b,0),function(){for(var d=arguments,e=-1,f=h(d.length-b,0),g=Array(f);++e<f;)g[e]=d[b+e];e=-1;for(var i=Array(b+1);++e<b;)i[e]=d[e];return i[b]=g,c(a,this,i)}}function k(a,c){return!!(c=null==c?0x1fffffffffffff:c)&&("number"==typeof a||b.test(a))&&a>-1&&a%1==0&&a<c}function l(a,b){return a===b||a!=a&&b!=b}var m=Array.isArray;function n(a){var b,c,d;return null!=a&&"number"==typeof(b=a.length)&&b>-1&&b%1==0&&b<=0x1fffffffffffff&&"[object Function]"!=(d=o(c=a)?f.call(c):"")&&"[object GeneratorFunction]"!=d}function o(a){var b=typeof a;return!!a&&("object"==b||"function"==b)}var p=function(a){return j(function(b,c){var d=-1,e=c.length,f=e>1?c[e-1]:void 0,g=e>2?c[2]:void 0;for(f=a.length>3&&"function"==typeof f?(e--,f):void 0,g&&function(a,b,c){if(!o(c))return!1;var d=typeof b;return("number"==d?!!(n(c)&&k(b,c.length)):"string"==d&&b in c)&&l(c[b],a)}(c[0],c[1],g)&&(f=e<3?void 0:f,e=1),b=Object(b);++d<e;){var h=c[d];h&&a(b,h,d,f)}return b})}(function(a,b,c,h){var i;!function(a,b,c,d){c||(c={});for(var f=-1,g=b.length;++f<g;){var h=b[f],i=d?d(c[h],a[h],h,c,a):void 0;!function(a,b,c){var d=a[b];e.call(a,b)&&l(d,c)&&(void 0!==c||b in a)||(a[b]=c)}(c,h,void 0===i?a[h]:i)}}(b,n(i=b)?function(a,b){var c,d,h,i=m(a)||(h=d=c=a)&&"object"==typeof h&&n(d)&&e.call(c,"callee")&&(!g.call(c,"callee")||"[object Arguments]"==f.call(c))?function(a,b){for(var c=-1,d=Array(a);++c<a;)d[c]=b(c);return d}(a.length,String):[],j=i.length,l=!!j;for(var o in a)(b||e.call(a,o))&&!(l&&("length"==o||k(o,j)))&&i.push(o);return i}(i,!0):function(a){if(!o(a)){var b,c,f=a,g=[];if(null!=f)for(var h in Object(f))g.push(h);return g}var i=(c=(b=a)&&b.constructor,b===("function"==typeof c&&c.prototype||d)),j=[];for(var k in a)"constructor"==k&&(i||!e.call(a,k))||j.push(k);return j}(i),a,h)});a.exports=j(function(a){return a.push(void 0,i),c(p,void 0,a)})},50685:(a,b,c)=>{"use strict";c.d(b,{BC:()=>k,DR:()=>p,HD:()=>l,Ie:()=>t,Il:()=>u,Im:()=>j,Mo:()=>g,TX:()=>h,a4:()=>i,ag:()=>v,cb:()=>m,dP:()=>y,jZ:()=>A,oA:()=>r,oR:()=>w,q7:()=>s,rI:()=>q,sr:()=>x,t:()=>z,uJ:()=>B,uP:()=>C,w:()=>n,zl:()=>o}),c(73192);var d=c(95422),e=c(99318),f=c(29196);let g={value:null};function h(a,b,c){try{return a.apply(b,c)}catch(a){return g.value=a,g}}function i(a){return Buffer.byteLength(a,"utf8")}function j(a){for(let b in a)if(Object.prototype.hasOwnProperty.call(a,b))return!1;return!0}function k(a){let b={};for(let c=0;c<a.length;c+=2)b[a[c]]=a[c+1];return b}function l(a){let b=[];for(let c in a)Object.prototype.hasOwnProperty.call(a,c)&&void 0!==a[c]&&(b[b.length]=c,b[b.length]=a[c]);return b}function m(a,b){return new Promise(c=>{let d,e=()=>{null==b||b.signal.removeEventListener("abort",e),clearTimeout(d),c()};d=setTimeout(e,a),null==b||b.signal.addEventListener("abort",e)})}function n(a,b){let c=a.getMaxListeners();a.setMaxListeners(c+b)}let o={de:"deduplication",fpof:"failParentOnFailure",cpof:"continueParentOnFailure",idof:"ignoreDependencyOnFailure",kl:"keepLogs",rdof:"removeDependencyOnFailure"},p=Object.assign(Object.assign({},Object.entries(o).reduce((a,[b,c])=>(a[c]=b,a),{})),{debounce:"de"});function q(a){return!!a&&["connect","disconnect","duplicate"].every(b=>"function"==typeof a[b])}function r(a){return q(a)&&a.isCluster}function s(a,b){n(a,-b)}function t(a){if(a)return`${a.queue}:${a.id}`}let u=/ERR unknown command ['`]\s*client\s*['`]/,v=5e3,w=100;function x(a){let{code:b,message:c}=a;return c!==d.CONNECTION_CLOSED_ERROR_MSG&&!c.includes("ECONNREFUSED")&&"ECONNREFUSED"!==b}let y=(a,b,c,d="redis")=>{if(c===d){let c=e.valid(e.coerce(a));return e.lt(c,b)}return!1},z=a=>{let b={};for(let c of Object.entries(a))b[c[0]]=JSON.parse(c[1]);return b},A=":qe";function B(a){let b={};for(let c in a)void 0!==a[c]&&(b[c]=a[c]);return b}async function C(a,b,c,d,e,g,h){if(!a)return g();{let i,{tracer:j,contextManager:k}=a,l=k.active();h&&(i=k.fromMetadata(l,h));let m=e?`${d} ${e}`:d,n=j.startSpan(m,{kind:b},i);try{let a,e;return n.setAttributes({[f.tC.QueueName]:c,[f.tC.QueueOperation]:d}),a=b===f.v8.CONSUMER&&i?n.setSpanOnContext(i):n.setSpanOnContext(l),2==g.length&&(e=k.getMetadata(a)),await k.with(a,()=>g(n,e))}catch(a){throw n.recordException(a),a}finally{n.end()}}}},50954:a=>{"use strict";let b=/^[0-9]+$/,c=(a,c)=>{if("number"==typeof a&&"number"==typeof c)return a===c?0:a<c?-1:1;let d=b.test(a),e=b.test(c);return d&&e&&(a*=1,c*=1),a===c?0:d&&!e?-1:e&&!d?1:a<c?-1:1};a.exports={compareIdentifiers:c,rcompareIdentifiers:(a,b)=>c(b,a)}},52510:(a,b,c)=>{"use strict";let d=c(20254);a.exports=(a,b)=>a.sort((a,c)=>d(a,c,b))},52958:(a,b,c)=>{"use strict";c.d(b,{A:()=>i});var d=c(55511);let e={randomUUID:d.randomUUID},f=new Uint8Array(256),g=f.length,h=[];for(let a=0;a<256;++a)h.push((a+256).toString(16).slice(1));let i=function(a,b,c){if(e.randomUUID&&!b&&!a)return e.randomUUID();let i=(a=a||{}).random??a.rng?.()??(g>f.length-16&&((0,d.randomFillSync)(f),g=0),f.slice(g,g+=16));if(i.length<16)throw Error("Random bytes length must be >= 16");if(i[6]=15&i[6]|64,i[8]=63&i[8]|128,b){if((c=c||0)<0||c+16>b.length)throw RangeError(`UUID byte range ${c}:${c+15} is out of buffer bounds`);for(let a=0;a<16;++a)b[c+a]=i[a];return b}return function(a,b=0){return(h[a[b+0]]+h[a[b+1]]+h[a[b+2]]+h[a[b+3]]+"-"+h[a[b+4]]+h[a[b+5]]+"-"+h[a[b+6]]+h[a[b+7]]+"-"+h[a[b+8]]+h[a[b+9]]+"-"+h[a[b+10]]+h[a[b+11]]+h[a[b+12]]+h[a[b+13]]+h[a[b+14]]+h[a[b+15]]).toLowerCase()}(i)}},53537:(a,b,c)=>{"use strict";Object.defineProperty(b,"__esModule",{value:!0}),b.SentinelConnector=b.StandaloneConnector=void 0,b.StandaloneConnector=c(5591).default,b.SentinelConnector=c(23337).default},54066:a=>{function b(a,b,c,d){return Math.round(a/c)+" "+d+(b>=1.5*c?"s":"")}a.exports=function(a,c){c=c||{};var d,e,f,g,h=typeof a;if("string"===h&&a.length>0){var i=a;if(!((i=String(i)).length>100)){var j=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(i);if(j){var k=parseFloat(j[1]);switch((j[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return 315576e5*k;case"weeks":case"week":case"w":return 6048e5*k;case"days":case"day":case"d":return 864e5*k;case"hours":case"hour":case"hrs":case"hr":case"h":return 36e5*k;case"minutes":case"minute":case"mins":case"min":case"m":return 6e4*k;case"seconds":case"second":case"secs":case"sec":case"s":return 1e3*k;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return k;default:break}}}return}if("number"===h&&isFinite(a)){return c.long?(e=Math.abs(d=a))>=864e5?b(d,e,864e5,"day"):e>=36e5?b(d,e,36e5,"hour"):e>=6e4?b(d,e,6e4,"minute"):e>=1e3?b(d,e,1e3,"second"):d+" ms":(g=Math.abs(f=a))>=864e5?Math.round(f/864e5)+"d":g>=36e5?Math.round(f/36e5)+"h":g>=6e4?Math.round(f/6e4)+"m":g>=1e3?Math.round(f/1e3)+"s":f+"ms"}throw Error("val is not a non-empty string or a valid number. val="+JSON.stringify(a))}},55193:a=>{"use strict";a.exports="object"==typeof process&&process.env&&process.env.NODE_DEBUG&&/\bsemver\b/i.test(process.env.NODE_DEBUG)?(...a)=>console.error("SEMVER",...a):()=>{}},55494:(a,b,c)=>{"use strict";let d=c(70405);a.exports=(a,b)=>new d(a,b).patch},55635:(a,b,c)=>{"use strict";c.d(b,{A:()=>e});var d=c(29196);let e=(a,b)=>async function(c,e,f){let g,h,i,j;try{let k=new Promise((k,l)=>{(async()=>{try{i=(a,b)=>{l(Error("Unexpected exit code: "+a+" signal: "+b))},(g=await b.retain(a)).on("exit",i),h=async a=>{var b,e,f,h,i;try{switch(a.cmd){case d.sc.Completed:k(a.value);break;case d.sc.Failed:case d.sc.Error:{let b=Error();Object.assign(b,a.value),l(b);break}case d.sc.Progress:await c.updateProgress(a.value);break;case d.sc.Log:await c.log(a.value);break;case d.sc.MoveToDelayed:await c.moveToDelayed(null==(b=a.value)?void 0:b.timestamp,null==(e=a.value)?void 0:e.token);break;case d.sc.MoveToWait:await c.moveToWait(null==(f=a.value)?void 0:f.token);break;case d.sc.MoveToWaitingChildren:{let b=await c.moveToWaitingChildren(null==(h=a.value)?void 0:h.token,null==(i=a.value)?void 0:i.opts);g.send({requestId:a.requestId,cmd:d.M0.MoveToWaitingChildrenResponse,value:b})}break;case d.sc.Update:await c.updateData(a.value);break;case d.sc.GetChildrenValues:{let b=await c.getChildrenValues();g.send({requestId:a.requestId,cmd:d.M0.GetChildrenValuesResponse,value:b})}break;case d.sc.GetIgnoredChildrenFailures:{let b=await c.getIgnoredChildrenFailures();g.send({requestId:a.requestId,cmd:d.M0.GetIgnoredChildrenFailuresResponse,value:b})}}}catch(a){l(a)}},g.on("message",h),g.send({cmd:d.M0.Start,job:c.asJSONSandbox(),token:e}),f&&(j=()=>{try{g.send({cmd:d.M0.Cancel,value:f.reason})}catch(a){}},f.aborted?j():f.addEventListener("abort",j,{once:!0}))}catch(a){l(a)}})()});return await k,k}finally{f&&j&&f.removeEventListener("abort",j),g&&(g.off("message",h),g.off("exit",i),null===g.exitCode&&null===g.signalCode&&b.release(g))}}},57147:a=>{"use strict";a.exports={MAX_LENGTH:256,MAX_SAFE_COMPONENT_LENGTH:16,MAX_SAFE_BUILD_LENGTH:250,MAX_SAFE_INTEGER:Number.MAX_SAFE_INTEGER||0x1fffffffffffff,RELEASE_TYPES:["major","premajor","minor","preminor","patch","prepatch","prerelease"],SEMVER_SPEC_VERSION:"2.0.0",FLAG_INCLUDE_PRERELEASE:1,FLAG_LOOSE:2}},57250:(a,b,c)=>{b.formatArgs=function(b){if(b[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+b[0]+(this.useColors?"%c ":" ")+"+"+a.exports.humanize(this.diff),!this.useColors)return;let c="color: "+this.color;b.splice(1,0,c,"color: inherit");let d=0,e=0;b[0].replace(/%[a-zA-Z%]/g,a=>{"%%"!==a&&(d++,"%c"===a&&(e=d))}),b.splice(e,0,c)},b.save=function(a){try{a?b.storage.setItem("debug",a):b.storage.removeItem("debug")}catch(a){}},b.load=function(){let a;try{a=b.storage.getItem("debug")||b.storage.getItem("DEBUG")}catch(a){}return!a&&"undefined"!=typeof process&&"env"in process&&(a=process.env.DEBUG),a},b.useColors=function(){let a;return"undefined"!=typeof window&&!!window.process&&("renderer"===window.process.type||!!window.process.__nwjs)||!("undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))&&("undefined"!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!=typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!=typeof navigator&&navigator.userAgent&&(a=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(a[1],10)>=31||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))},b.storage=function(){try{return localStorage}catch(a){}}(),b.destroy=(()=>{let a=!1;return()=>{a||(a=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})(),b.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"],b.log=console.debug||console.log||(()=>{}),a.exports=c(92289)(b);let{formatters:d}=a.exports;d.j=function(a){try{return JSON.stringify(a)}catch(a){return"[UnexpectedJSONParseError]: "+a.message}}},58438:(a,b,c)=>{"use strict";let d=c(20254);a.exports=(a,b)=>a.sort((a,c)=>d(c,a,b))},59408:(a,b,c)=>{"use strict";Object.defineProperty(b,"__esModule",{value:!0});let d=c(84968),e=c(75761),f=c(95572),g=c(28354),h=c(22013),i=c(95422),j=c(25948);class k extends j.default{constructor(a){super(),this.redis=a,this.isPipeline=!0,this.replyPending=0,this._queue=[],this._result=[],this._transactions=0,this._shaToScript={},this.isCluster="Cluster"===this.redis.constructor.name||this.redis.isCluster,this.options=a.options,Object.keys(a.scriptsSet).forEach(b=>{let c=a.scriptsSet[b];this._shaToScript[c.sha]=c,this[b]=a[b],this[b+"Buffer"]=a[b+"Buffer"]}),a.addedBuiltinSet.forEach(b=>{this[b]=a[b],this[b+"Buffer"]=a[b+"Buffer"]}),this.promise=new Promise((a,b)=>{this.resolve=a,this.reject=b});let b=this;Object.defineProperty(this,"length",{get:function(){return b._queue.length}})}fillResult(a,b){if("exec"===this._queue[b].name&&Array.isArray(a[1])){let c=a[1].length;for(let d=0;d<c;d++){if(a[1][d]instanceof Error)continue;let e=this._queue[b-(c-d)];try{a[1][d]=e.transformReply(a[1][d])}catch(b){a[1][d]=b}}}if(this._result[b]=a,--this.replyPending)return;if(this.isCluster){let a,b=!0;for(let c=0;c<this._result.length;++c){let d=this._result[c][0],f=this._queue[c];if(d){if("exec"===f.name&&"EXECABORT Transaction discarded because of previous errors."===d.message)continue;if(a){if(a.name!==d.name||a.message!==d.message){b=!1;break}}else a={name:d.name,message:d.message}}else if(!f.inTransaction&&!((0,e.exists)(f.name,{caseInsensitive:!0})&&(0,e.hasFlag)(f.name,"readonly",{nameCaseInsensitive:!0}))){b=!1;break}}if(a&&b){let b=this,c=a.message.split(" "),d=this._queue,e=!1;this._queue=[];for(let a=0;a<d.length;++a){if("ASK"===c[0]&&!e&&"asking"!==d[a].name&&(!d[a-1]||"asking"!==d[a-1].name)){let a=new h.default("asking");a.ignore=!0,this.sendCommand(a)}d[a].initPromise(),this.sendCommand(d[a]),e=d[a].inTransaction}let f=!0;void 0===this.leftRedirections&&(this.leftRedirections={});let g=function(){b.exec()},i=this.redis;if(i.handleError(a,this.leftRedirections,{moved:function(a,d){b.preferKey=d,i.slots[c[1]]?i.slots[c[1]][0]!==d&&(i.slots[c[1]]=[d]):i.slots[c[1]]=[d],i._groupsBySlot[c[1]]=i._groupsIds[i.slots[c[1]].join(";")],i.refreshSlotsCache(),b.exec()},ask:function(a,c){b.preferKey=c,b.exec()},tryagain:g,clusterDown:g,connectionClosed:g,maxRedirections:()=>{f=!1},defaults:()=>{f=!1}}),f)return}}let c=0;for(let a=0;a<this._queue.length-c;++a)this._queue[a+c].ignore&&(c+=1),this._result[a]=this._result[a+c];this.resolve(this._result.slice(0,this._result.length-c))}sendCommand(a){this._transactions>0&&(a.inTransaction=!0);let b=this._queue.length;return a.pipelineIndex=b,a.promise.then(a=>{this.fillResult([null,a],b)}).catch(a=>{this.fillResult([a],b)}),this._queue.push(a),this}addBatch(a){let b,c,d;for(let e=0;e<a.length;++e)c=(b=a[e])[0],d=b.slice(1),this[c].apply(this,d);return this}}b.default=k;let l=k.prototype.multi;k.prototype.multi=function(){return this._transactions+=1,l.apply(this,arguments)};let m=k.prototype.execBuffer;k.prototype.execBuffer=(0,g.deprecate)(function(){return this._transactions>0&&(this._transactions-=1),m.apply(this,arguments)},"Pipeline#execBuffer: Use Pipeline#exec instead"),k.prototype.exec=function(a){let b;if(this.isCluster&&!this.redis.slots.length)return"wait"===this.redis.status&&this.redis.connect().catch(i.noop),a&&!this.nodeifiedPromise&&(this.nodeifiedPromise=!0,(0,f.default)(this.promise,a)),this.redis.delayUntilReady(b=>{if(b)return void this.reject(b);this.exec(a)}),this.promise;if(this._transactions>0)return this._transactions-=1,m.apply(this,arguments);if(this.nodeifiedPromise||(this.nodeifiedPromise=!0,(0,f.default)(this.promise,a)),this._queue.length||this.resolve([]),this.isCluster){let a=[];for(let b=0;b<this._queue.length;b++){let c=this._queue[b].getKeys();if(c.length&&a.push(c[0]),c.length&&0>d.generateMulti(c))return this.reject(Error("All the keys in a pipeline command should belong to the same slot")),this.promise}if(a.length){if((b=function(a,b){let c=d(b[0]),e=a._groupsBySlot[c];for(let c=1;c<b.length;c++)if(a._groupsBySlot[d(b[c])]!==e)return -1;return c}(this.redis,a))<0)return this.reject(Error("All keys in the pipeline should belong to the same slots allocation group")),this.promise}else b=16384*Math.random()|0}let c=this;return function(){let a,d,e=c.replyPending=c._queue.length;c.isCluster&&(a={slot:b,redis:c.redis.connectionPool.nodes.all[c.preferKey]});let f="",g={isPipeline:!0,destination:c.isCluster?a:{redis:c.redis},write(a){"string"!=typeof a?(d||(d=[]),f&&(d.push(Buffer.from(f,"utf8")),f=""),d.push(a)):f+=a,--e||(d?(f&&d.push(Buffer.from(f,"utf8")),g.destination.redis.stream.write(Buffer.concat(d))):g.destination.redis.stream.write(f),e=c._queue.length,f="",d=void 0)}};for(let b=0;b<c._queue.length;++b)c.redis.sendCommand(c._queue[b],g,a);c.promise}(),this.promise}},59435:(a,b,c)=>{"use strict";a.exports=c(31976)},62007:(a,b,c)=>{"use strict";Object.defineProperty(b,"__esModule",{value:!0});let d=c(75761),e=c(94735),f=c(95572),g=c(25757),h=c(22013),i=c(53537),j=c(23337),k=c(27403),l=c(28233),m=c(80755),n=c(3504),o=c(95422),p=c(30645),q=c(25948),r=c(66721),s=c(27399),t=(0,o.Debug)("redis");class u extends q.default{constructor(a,b,c){if(super(),this.status="wait",this.isCluster=!1,this.reconnectTimeout=null,this.connectionEpoch=0,this.retryAttempts=0,this.manuallyClosing=!1,this._autoPipelines=new Map,this._runningAutoPipelines=new Set,this.parseOptions(a,b,c),e.EventEmitter.call(this),this.resetCommandQueue(),this.resetOfflineQueue(),this.options.Connector)this.connector=new this.options.Connector(this.options);else if(this.options.sentinels){let a=new j.default(this.options);a.emitter=this,this.connector=a}else this.connector=new i.StandaloneConnector(this.options);this.options.scripts&&Object.entries(this.options.scripts).forEach(([a,b])=>{this.defineCommand(a,b)}),this.options.lazyConnect?this.setStatus("wait"):this.connect().catch(r.noop)}static createClient(...a){return new u(...a)}get autoPipelineQueueSize(){let a=0;for(let b of this._autoPipelines.values())a+=b.length;return a}connect(a){let b=new Promise((a,b)=>{if("connecting"===this.status||"connect"===this.status||"ready"===this.status)return void b(Error("Redis is already connecting/connected"));this.connectionEpoch+=1,this.setStatus("connecting");let{options:c}=this;this.condition={select:c.db,auth:c.username?[c.username,c.password]:c.password,subscriber:!1};let d=this;(0,f.default)(this.connector.connect(function(a,b){d.silentEmit(a,b)}),function(e,f){if(e){d.flushQueue(e),d.silentEmit("error",e),b(e),d.setStatus("end");return}let g=c.tls?"secureConnect":"connect";if("sentinels"in c&&c.sentinels&&!c.enableTLSForSentinelMode&&(g="connect"),d.stream=f,c.noDelay&&f.setNoDelay(!0),"number"==typeof c.keepAlive&&(f.connecting?f.once(g,()=>{f.setKeepAlive(!0,c.keepAlive)}):f.setKeepAlive(!0,c.keepAlive)),f.connecting){if(f.once(g,k.connectHandler(d)),c.connectTimeout){let a=!1;f.setTimeout(c.connectTimeout,function(){if(a)return;f.setTimeout(0),f.destroy();let b=Error("connect ETIMEDOUT");b.errorno="ETIMEDOUT",b.code="ETIMEDOUT",b.syscall="connect",k.errorHandler(d)(b)}),f.once(g,function(){a=!0,f.setTimeout(0)})}}else if(f.destroyed){let a=d.connector.firstError;a&&process.nextTick(()=>{k.errorHandler(d)(a)}),process.nextTick(k.closeHandler(d))}else process.nextTick(k.connectHandler(d));f.destroyed||(f.once("error",k.errorHandler(d)),f.once("close",k.closeHandler(d)));let h=function(){d.removeListener("close",i),a()};var i=function(){d.removeListener("ready",h),b(Error(o.CONNECTION_CLOSED_ERROR_MSG))};d.once("ready",h),d.once("close",i)})});return(0,f.default)(b,a)}disconnect(a=!1){a||(this.manuallyClosing=!0),this.reconnectTimeout&&!a&&(clearTimeout(this.reconnectTimeout),this.reconnectTimeout=null),"wait"===this.status?k.closeHandler(this)():this.connector.disconnect()}end(){this.disconnect()}duplicate(a){return new u({...this.options,...a})}get mode(){var a;return this.options.monitor?"monitor":(null==(a=this.condition)?void 0:a.subscriber)?"subscriber":"normal"}monitor(a){let b=this.duplicate({monitor:!0,lazyConnect:!1});return(0,f.default)(new Promise(function(a,c){b.once("error",c),b.once("monitoring",function(){a(b)})}),a)}sendCommand(a,b){var c,e;if("wait"===this.status&&this.connect().catch(r.noop),"end"===this.status)return a.reject(Error(o.CONNECTION_CLOSED_ERROR_MSG)),a.promise;if((null==(c=this.condition)?void 0:c.subscriber)&&!h.default.checkFlag("VALID_IN_SUBSCRIBER_MODE",a.name))return a.reject(Error("Connection in subscriber mode, only subscriber commands may be used")),a.promise;"number"==typeof this.options.commandTimeout&&a.setTimeout(this.options.commandTimeout);let f=this.getBlockingTimeoutInMs(a),g="ready"===this.status||!b&&"connect"===this.status&&(0,d.exists)(a.name,{caseInsensitive:!0})&&((0,d.hasFlag)(a.name,"loading",{nameCaseInsensitive:!0})||h.default.checkFlag("HANDSHAKE_COMMANDS",a.name));if(this.stream&&this.stream.writable?this.stream._writableState&&this.stream._writableState.ended&&(g=!1):g=!1,g)t.enabled&&t("write command[%s]: %d -> %s(%o)",this._getDescription(),null==(e=this.condition)?void 0:e.select,a.name,a.args),b?"isPipeline"in b&&b.isPipeline?b.write(a.toWritable(b.destination.redis.stream)):b.write(a.toWritable(b)):this.stream.write(a.toWritable(this.stream)),this.commandQueue.push({command:a,stream:b,select:this.condition.select}),void 0!==f&&a.setBlockingTimeout(f),h.default.checkFlag("WILL_DISCONNECT",a.name)&&(this.manuallyClosing=!0),void 0!==this.options.socketTimeout&&void 0===this.socketTimeoutTimer&&this.setSocketTimeout();else{if(!this.options.enableOfflineQueue)return a.reject(Error("Stream isn't writeable and enableOfflineQueue options is false")),a.promise;if("quit"===a.name&&0===this.offlineQueue.length)return this.disconnect(),a.resolve(Buffer.from("OK")),a.promise;if(t.enabled&&t("queue command[%s]: %d -> %s(%o)",this._getDescription(),this.condition.select,a.name,a.args),this.offlineQueue.push({command:a,stream:b,select:this.condition.select}),h.default.checkFlag("BLOCKING_COMMANDS",a.name)){let b=this.getConfiguredBlockingTimeout();void 0!==b&&a.setBlockingTimeout(b)}}if("select"===a.name&&(0,o.isInt)(a.args[0])){let b=parseInt(a.args[0],10);this.condition.select!==b&&(this.condition.select=b,this.emit("select",b),t("switch to db [%d]",this.condition.select))}return a.promise}getBlockingTimeoutInMs(a){var b;if(!h.default.checkFlag("BLOCKING_COMMANDS",a.name))return;let c=this.getConfiguredBlockingTimeout();if(void 0===c)return;let d=a.extractBlockingTimeout();return"number"==typeof d?d>0?d+(null!=(b=this.options.blockingTimeoutGrace)?b:l.DEFAULT_REDIS_OPTIONS.blockingTimeoutGrace):c:null===d?c:void 0}getConfiguredBlockingTimeout(){if("number"==typeof this.options.blockingTimeout&&this.options.blockingTimeout>0)return this.options.blockingTimeout}setSocketTimeout(){this.socketTimeoutTimer=setTimeout(()=>{this.stream.destroy(Error(`Socket timeout. Expecting data, but didn't receive any in ${this.options.socketTimeout}ms.`)),this.socketTimeoutTimer=void 0},this.options.socketTimeout),this.stream.once("data",()=>{clearTimeout(this.socketTimeoutTimer),this.socketTimeoutTimer=void 0,0!==this.commandQueue.length&&this.setSocketTimeout()})}scanStream(a){return this.createScanStream("scan",{options:a})}scanBufferStream(a){return this.createScanStream("scanBuffer",{options:a})}sscanStream(a,b){return this.createScanStream("sscan",{key:a,options:b})}sscanBufferStream(a,b){return this.createScanStream("sscanBuffer",{key:a,options:b})}hscanStream(a,b){return this.createScanStream("hscan",{key:a,options:b})}hscanBufferStream(a,b){return this.createScanStream("hscanBuffer",{key:a,options:b})}zscanStream(a,b){return this.createScanStream("zscan",{key:a,options:b})}zscanBufferStream(a,b){return this.createScanStream("zscanBuffer",{key:a,options:b})}silentEmit(a,b){let c;if("error"!==a||(c=b,"end"!==this.status&&(!this.manuallyClosing||!(c instanceof Error)||c.message!==o.CONNECTION_CLOSED_ERROR_MSG&&"connect"!==c.syscall&&"read"!==c.syscall)))return this.listeners(a).length>0?this.emit.apply(this,arguments):(c&&c instanceof Error&&console.error("[ioredis] Unhandled error event:",c.stack),!1)}recoverFromFatalError(a,b,c){this.flushQueue(b,c),this.silentEmit("error",b),this.disconnect(!0)}handleReconnection(a,b){var c;let d=!1;switch(this.options.reconnectOnError&&!h.default.checkFlag("IGNORE_RECONNECT_ON_ERROR",b.command.name)&&(d=this.options.reconnectOnError(a)),d){case 1:case!0:"reconnecting"!==this.status&&this.disconnect(!0),b.command.reject(a);break;case 2:"reconnecting"!==this.status&&this.disconnect(!0),(null==(c=this.condition)?void 0:c.select)!==b.select&&"select"!==b.command.name&&this.select(b.select),this.sendCommand(b.command);break;default:b.command.reject(a)}}_getDescription(){let a;return a="path"in this.options&&this.options.path?this.options.path:this.stream&&this.stream.remoteAddress&&this.stream.remotePort?this.stream.remoteAddress+":"+this.stream.remotePort:"host"in this.options&&this.options.host?this.options.host+":"+this.options.port:"",this.options.connectionName&&(a+=` (${this.options.connectionName})`),a}resetCommandQueue(){this.commandQueue=new s}resetOfflineQueue(){this.offlineQueue=new s}parseOptions(...a){let b={},c=!1;for(let d=0;d<a.length;++d){let e=a[d];if(null!=e)if("object"==typeof e)(0,r.defaults)(b,e);else if("string"==typeof e)(0,r.defaults)(b,(0,o.parseURL)(e)),e.startsWith("rediss://")&&(c=!0);else if("number"==typeof e)b.port=e;else throw Error("Invalid argument "+e)}c&&(0,r.defaults)(b,{tls:!0}),(0,r.defaults)(b,u.defaultOptions),"string"==typeof b.port&&(b.port=parseInt(b.port,10)),"string"==typeof b.db&&(b.db=parseInt(b.db,10)),this.options=(0,o.resolveTLSProfile)(b)}setStatus(a,b){t.enabled&&t("status[%s]: %s -> %s",this._getDescription(),this.status||"[empty]",a),this.status=a,process.nextTick(this.emit.bind(this,a,b))}createScanStream(a,{key:b,options:c={}}){return new m.default({objectMode:!0,key:b,redis:this,command:a,...c})}flushQueue(a,b){let c;if((b=(0,r.defaults)({},b,{offlineQueue:!0,commandQueue:!0})).offlineQueue)for(;c=this.offlineQueue.shift();)c.command.reject(a);if(b.commandQueue&&this.commandQueue.length>0)for(this.stream&&this.stream.removeAllListeners("data");c=this.commandQueue.shift();)c.command.reject(a)}_readyCheck(a){let b=this;this.info(function(c,d){if(c)return c.message&&c.message.includes("NOPERM")?(console.warn(`Skipping the ready check because INFO command fails: "${c.message}". You can disable ready check with "enableReadyCheck". More: https://github.com/luin/ioredis/wiki/Disable-ready-check.`),a(null,{})):a(c);if("string"!=typeof d)return a(null,d);let e={},f=d.split("\r\n");for(let a=0;a<f.length;++a){let[b,...c]=f[a].split(":"),d=c.join(":");d&&(e[b]=d)}if(e.loading&&"0"!==e.loading){let c=1e3*(e.loading_eta_seconds||1),d=b.options.maxLoadingRetryTime&&b.options.maxLoadingRetryTime<c?b.options.maxLoadingRetryTime:c;t("Redis server still loading, trying again in "+d+"ms"),setTimeout(function(){b._readyCheck(a)},d)}else a(null,e)}).catch(r.noop)}}u.Cluster=g.default,u.Command=h.default,u.defaultOptions=l.DEFAULT_REDIS_OPTIONS,(0,p.default)(u,e.EventEmitter),(0,n.addTransactionSupport)(u.prototype),b.default=u},62045:(a,b,c)=>{"use strict";let d=c(70405);a.exports=(a,b)=>new d(a,b).major},62404:(a,b,c)=>{"use strict";let d=c(35463);a.exports=(a,b,c)=>0!==d(a,b,c)},63100:(a,b,c)=>{"use strict";let d=c(35463);a.exports=(a,b)=>d(a,b,!0)},63538:(a,b,c)=>{"undefined"==typeof process||"renderer"===process.type||process.__nwjs?a.exports=c(57250):a.exports=c(71940)},64011:(a,b,c)=>{"use strict";let d=c(35463);a.exports=(a,b,c)=>0>=d(a,b,c)},64845:(a,b,c)=>{"use strict";let d=c(70405),e=c(72988);a.exports=(a,b,c)=>{let f=null,g=null,h=null;try{h=new e(b,c)}catch(a){return null}return a.forEach(a=>{h.test(a)&&(!f||1===g.compare(a))&&(g=new d(f=a,c))}),f}},65380:(a,b)=>{"use strict";let c;Object.defineProperty(b,"__esModule",{value:!0});class d extends Error{}class e extends d{constructor(a){super(`Invalid DateTime: ${a.toMessage()}`)}}class f extends d{constructor(a){super(`Invalid Interval: ${a.toMessage()}`)}}class g extends d{constructor(a){super(`Invalid Duration: ${a.toMessage()}`)}}class h extends d{}class i extends d{constructor(a){super(`Invalid unit ${a}`)}}class j extends d{}class k extends d{constructor(){super("Zone is an abstract class")}}let l="numeric",m="short",n="long",o={year:l,month:l,day:l},p={year:l,month:m,day:l},q={year:l,month:m,day:l,weekday:m},r={year:l,month:n,day:l},s={year:l,month:n,day:l,weekday:n},t={hour:l,minute:l},u={hour:l,minute:l,second:l},v={hour:l,minute:l,second:l,timeZoneName:m},w={hour:l,minute:l,second:l,timeZoneName:n},x={hour:l,minute:l,hourCycle:"h23"},y={hour:l,minute:l,second:l,hourCycle:"h23"},z={hour:l,minute:l,second:l,hourCycle:"h23",timeZoneName:m},A={hour:l,minute:l,second:l,hourCycle:"h23",timeZoneName:n},B={year:l,month:l,day:l,hour:l,minute:l},C={year:l,month:l,day:l,hour:l,minute:l,second:l},D={year:l,month:m,day:l,hour:l,minute:l},E={year:l,month:m,day:l,hour:l,minute:l,second:l},F={year:l,month:m,day:l,weekday:m,hour:l,minute:l},G={year:l,month:n,day:l,hour:l,minute:l,timeZoneName:m},H={year:l,month:n,day:l,hour:l,minute:l,second:l,timeZoneName:m},I={year:l,month:n,day:l,weekday:n,hour:l,minute:l,timeZoneName:n},J={year:l,month:n,day:l,weekday:n,hour:l,minute:l,second:l,timeZoneName:n};class K{get type(){throw new k}get name(){throw new k}get ianaName(){return this.name}get isUniversal(){throw new k}offsetName(a,b){throw new k}formatOffset(a,b){throw new k}offset(a){throw new k}equals(a){throw new k}get isValid(){throw new k}}let L=null;class M extends K{static get instance(){return null===L&&(L=new M),L}get type(){return"system"}get name(){return new Intl.DateTimeFormat().resolvedOptions().timeZone}get isUniversal(){return!1}offsetName(a,{format:b,locale:c}){return a3(a,b,c)}formatOffset(a,b){return a7(this.offset(a),b)}offset(a){return-new Date(a).getTimezoneOffset()}equals(a){return"system"===a.type}get isValid(){return!0}}let N=new Map,O={year:0,month:1,day:2,era:3,hour:4,minute:5,second:6},P=new Map;class Q extends K{static create(a){let b=P.get(a);return void 0===b&&P.set(a,b=new Q(a)),b}static resetCache(){P.clear(),N.clear()}static isValidSpecifier(a){return this.isValidZone(a)}static isValidZone(a){if(!a)return!1;try{return new Intl.DateTimeFormat("en-US",{timeZone:a}).format(),!0}catch(a){return!1}}constructor(a){super(),this.zoneName=a,this.valid=Q.isValidZone(a)}get type(){return"iana"}get name(){return this.zoneName}get isUniversal(){return!1}offsetName(a,{format:b,locale:c}){return a3(a,b,c,this.name)}formatOffset(a,b){return a7(this.offset(a),b)}offset(a){var b;let c;if(!this.valid)return NaN;let d=new Date(a);if(isNaN(d))return NaN;let e=(b=this.name,void 0===(c=N.get(b))&&(c=new Intl.DateTimeFormat("en-US",{hour12:!1,timeZone:b,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",era:"short"}),N.set(b,c)),c),[f,g,h,i,j,k,l]=e.formatToParts?function(a,b){let c=a.formatToParts(b),d=[];for(let a=0;a<c.length;a++){let{type:b,value:e}=c[a],f=O[b];"era"===b?d[f]=e:aK(f)||(d[f]=parseInt(e,10))}return d}(e,d):function(a,b){let c=a.format(b).replace(/\u200E/g,""),[,d,e,f,g,h,i,j]=/(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(c);return[f,d,e,g,h,i,j]}(e,d);"BC"===i&&(f=-Math.abs(f)+1);let m=a_({year:f,month:g,day:h,hour:24===j?0:j,minute:k,second:l,millisecond:0}),n=+d,o=n%1e3;return(m-(n-=o>=0?o:1e3+o))/6e4}equals(a){return"iana"===a.type&&a.name===this.name}get isValid(){return this.valid}}let R={},S=new Map;function T(a,b={}){let c=JSON.stringify([a,b]),d=S.get(c);return void 0===d&&(d=new Intl.DateTimeFormat(a,b),S.set(c,d)),d}let U=new Map,V=new Map,W=null,X=new Map;function Y(a){let b=X.get(a);return void 0===b&&(b=new Intl.DateTimeFormat(a).resolvedOptions(),X.set(a,b)),b}let Z=new Map;function $(a,b,c,d){let e=a.listingMode();return"error"===e?null:"en"===e?c(b):d(b)}class _{constructor(a,b,c){this.padTo=c.padTo||0,this.floor=c.floor||!1;let{padTo:d,floor:e,...f}=c;if(!b||Object.keys(f).length>0){let b={useGrouping:!1,...c};c.padTo>0&&(b.minimumIntegerDigits=c.padTo),this.inf=function(a,b={}){let c=JSON.stringify([a,b]),d=U.get(c);return void 0===d&&(d=new Intl.NumberFormat(a,b),U.set(c,d)),d}(a,b)}}format(a){if(!this.inf)return aT(this.floor?Math.floor(a):aX(a,3),this.padTo);{let b=this.floor?Math.floor(a):a;return this.inf.format(b)}}}class aa{constructor(a,b,c){let d;if(this.opts=c,this.originalZone=void 0,this.opts.timeZone)this.dt=a;else if("fixed"===a.zone.type){let b=-1*(a.offset/60),c=b>=0?`Etc/GMT+${b}`:`Etc/GMT${b}`;0!==a.offset&&Q.create(c).valid?(d=c,this.dt=a):(d="UTC",this.dt=0===a.offset?a:a.setZone("UTC").plus({minutes:a.offset}),this.originalZone=a.zone)}else"system"===a.zone.type?this.dt=a:"iana"===a.zone.type?(this.dt=a,d=a.zone.name):(d="UTC",this.dt=a.setZone("UTC").plus({minutes:a.offset}),this.originalZone=a.zone);let e={...this.opts};e.timeZone=e.timeZone||d,this.dtf=T(b,e)}format(){return this.originalZone?this.formatToParts().map(({value:a})=>a).join(""):this.dtf.format(this.dt.toJSDate())}formatToParts(){let a=this.dtf.formatToParts(this.dt.toJSDate());return this.originalZone?a.map(a=>{if("timeZoneName"!==a.type)return a;{let b=this.originalZone.offsetName(this.dt.ts,{locale:this.dt.locale,format:this.opts.timeZoneName});return{...a,value:b}}}):a}resolvedOptions(){return this.dtf.resolvedOptions()}}class ab{constructor(a,b,c){this.opts={style:"long",...c},!b&&aN()&&(this.rtf=function(a,b={}){let{base:c,...d}=b,e=JSON.stringify([a,d]),f=V.get(e);return void 0===f&&(f=new Intl.RelativeTimeFormat(a,b),V.set(e,f)),f}(a,c))}format(a,b){return this.rtf?this.rtf.format(a,b):function(a,b,c="always",d=!1){let e={years:["year","yr."],quarters:["quarter","qtr."],months:["month","mo."],weeks:["week","wk."],days:["day","day","days"],hours:["hour","hr."],minutes:["minute","min."],seconds:["second","sec."]},f=-1===["hours","minutes","seconds"].indexOf(a);if("auto"===c&&f){let c="days"===a;switch(b){case 1:return c?"tomorrow":`next ${e[a][0]}`;case -1:return c?"yesterday":`last ${e[a][0]}`;case 0:return c?"today":`this ${e[a][0]}`}}let g=Object.is(b,-0)||b<0,h=Math.abs(b),i=1===h,j=e[a],k=d?i?j[1]:j[2]||j[1]:i?e[a][0]:a;return g?`${h} ${k} ago`:`in ${h} ${k}`}(b,a,this.opts.numeric,"long"!==this.opts.style)}formatToParts(a,b){return this.rtf?this.rtf.formatToParts(a,b):[]}}let ac={firstDay:1,minimalDays:4,weekend:[6,7]};class ad{static fromOpts(a){return ad.create(a.locale,a.numberingSystem,a.outputCalendar,a.weekSettings,a.defaultToEN)}static create(a,b,c,d,e=!1){let f=a||av.defaultLocale,g=f||(e?"en-US":W||(W=new Intl.DateTimeFormat().resolvedOptions().locale)),h=b||av.defaultNumberingSystem;return new ad(g,h,c||av.defaultOutputCalendar,aR(d)||av.defaultWeekSettings,f)}static resetCache(){W=null,S.clear(),U.clear(),V.clear(),X.clear(),Z.clear()}static fromObject({locale:a,numberingSystem:b,outputCalendar:c,weekSettings:d}={}){return ad.create(a,b,c,d)}constructor(a,b,c,d,e){let[f,g,h]=function(a){let b=a.indexOf("-x-");-1!==b&&(a=a.substring(0,b));let c=a.indexOf("-u-");if(-1===c)return[a];{let b,d;try{b=T(a).resolvedOptions(),d=a}catch(f){let e=a.substring(0,c);b=T(e).resolvedOptions(),d=e}let{numberingSystem:e,calendar:f}=b;return[d,e,f]}}(a);this.locale=f,this.numberingSystem=b||g||null,this.outputCalendar=c||h||null,this.weekSettings=d,this.intl=function(a,b,c){return(c||b)&&(a.includes("-u-")||(a+="-u"),c&&(a+=`-ca-${c}`),b&&(a+=`-nu-${b}`)),a}(this.locale,this.numberingSystem,this.outputCalendar),this.weekdaysCache={format:{},standalone:{}},this.monthsCache={format:{},standalone:{}},this.meridiemCache=null,this.eraCache={},this.specifiedLocale=e,this.fastNumbersCached=null}get fastNumbers(){return null==this.fastNumbersCached&&(this.fastNumbersCached=(!this.numberingSystem||"latn"===this.numberingSystem)&&("latn"===this.numberingSystem||!this.locale||this.locale.startsWith("en")||"latn"===Y(this.locale).numberingSystem)),this.fastNumbersCached}listingMode(){let a=this.isEnglish(),b=(null===this.numberingSystem||"latn"===this.numberingSystem)&&(null===this.outputCalendar||"gregory"===this.outputCalendar);return a&&b?"en":"intl"}clone(a){return a&&0!==Object.getOwnPropertyNames(a).length?ad.create(a.locale||this.specifiedLocale,a.numberingSystem||this.numberingSystem,a.outputCalendar||this.outputCalendar,aR(a.weekSettings)||this.weekSettings,a.defaultToEN||!1):this}redefaultToEN(a={}){return this.clone({...a,defaultToEN:!0})}redefaultToSystem(a={}){return this.clone({...a,defaultToEN:!1})}months(a,b=!1){return $(this,a,bc,()=>{let c="ja"===this.intl||this.intl.startsWith("ja-"),d=(b&=!c)?{month:a,day:"numeric"}:{month:a},e=b?"format":"standalone";if(!this.monthsCache[e][a]){let b=c?a=>this.dtFormatter(a,d).format():a=>this.extract(a,d,"month");this.monthsCache[e][a]=function(a){let b=[];for(let c=1;c<=12;c++){let d=cV.utc(2009,c,1);b.push(a(d))}return b}(b)}return this.monthsCache[e][a]})}weekdays(a,b=!1){return $(this,a,bg,()=>{let c=b?{weekday:a,year:"numeric",month:"long",day:"numeric"}:{weekday:a},d=b?"format":"standalone";return this.weekdaysCache[d][a]||(this.weekdaysCache[d][a]=function(a){let b=[];for(let c=1;c<=7;c++){let d=cV.utc(2016,11,13+c);b.push(a(d))}return b}(a=>this.extract(a,c,"weekday"))),this.weekdaysCache[d][a]})}meridiems(){return $(this,void 0,()=>bh,()=>{if(!this.meridiemCache){let a={hour:"numeric",hourCycle:"h12"};this.meridiemCache=[cV.utc(2016,11,13,9),cV.utc(2016,11,13,19)].map(b=>this.extract(b,a,"dayperiod"))}return this.meridiemCache})}eras(a){return $(this,a,bl,()=>{let b={era:a};return this.eraCache[a]||(this.eraCache[a]=[cV.utc(-40,1,1),cV.utc(2017,1,1)].map(a=>this.extract(a,b,"era"))),this.eraCache[a]})}extract(a,b,c){let d=this.dtFormatter(a,b).formatToParts().find(a=>a.type.toLowerCase()===c);return d?d.value:null}numberFormatter(a={}){return new _(this.intl,a.forceSimple||this.fastNumbers,a)}dtFormatter(a,b={}){return new aa(a,this.intl,b)}relFormatter(a={}){return new ab(this.intl,this.isEnglish(),a)}listFormatter(a={}){return function(a,b={}){let c=JSON.stringify([a,b]),d=R[c];return d||(d=new Intl.ListFormat(a,b),R[c]=d),d}(this.intl,a)}isEnglish(){return"en"===this.locale||"en-us"===this.locale.toLowerCase()||Y(this.intl).locale.startsWith("en-us")}getWeekSettings(){if(this.weekSettings)return this.weekSettings;if(!aO())return ac;var a=this.locale;let b=Z.get(a);if(!b){let c=new Intl.Locale(a);"minimalDays"in(b="getWeekInfo"in c?c.getWeekInfo():c.weekInfo)||(b={...ac,...b}),Z.set(a,b)}return b}getStartOfWeek(){return this.getWeekSettings().firstDay}getMinDaysInFirstWeek(){return this.getWeekSettings().minimalDays}getWeekendDays(){return this.getWeekSettings().weekend}equals(a){return this.locale===a.locale&&this.numberingSystem===a.numberingSystem&&this.outputCalendar===a.outputCalendar}toString(){return`Locale(${this.locale}, ${this.numberingSystem}, ${this.outputCalendar})`}}let ae=null;class af extends K{static get utcInstance(){return null===ae&&(ae=new af(0)),ae}static instance(a){return 0===a?af.utcInstance:new af(a)}static parseSpecifier(a){if(a){let b=a.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);if(b)return new af(a4(b[1],b[2]))}return null}constructor(a){super(),this.fixed=a}get type(){return"fixed"}get name(){return 0===this.fixed?"UTC":`UTC${a7(this.fixed,"narrow")}`}get ianaName(){return 0===this.fixed?"Etc/UTC":`Etc/GMT${a7(-this.fixed,"narrow")}`}offsetName(){return this.name}formatOffset(a,b){return a7(this.fixed,b)}get isUniversal(){return!0}offset(){return this.fixed}equals(a){return"fixed"===a.type&&a.fixed===this.fixed}get isValid(){return!0}}class ag extends K{constructor(a){super(),this.zoneName=a}get type(){return"invalid"}get name(){return this.zoneName}get isUniversal(){return!1}offsetName(){return null}formatOffset(){return""}offset(){return NaN}equals(){return!1}get isValid(){return!1}}function ah(a,b){if(aK(a)||null===a)return b;if(a instanceof K)return a;if("string"==typeof a){let c=a.toLowerCase();return"default"===c?b:"local"===c||"system"===c?M.instance:"utc"===c||"gmt"===c?af.utcInstance:af.parseSpecifier(c)||Q.create(a)}if(aL(a))return af.instance(a);if("object"==typeof a&&"offset"in a&&"function"==typeof a.offset)return a;else return new ag(a)}let ai={arab:"[٠-٩]",arabext:"[۰-۹]",bali:"[᭐-᭙]",beng:"[০-৯]",deva:"[०-९]",fullwide:"[０-９]",gujr:"[૦-૯]",hanidec:"[〇|一|二|三|四|五|六|七|八|九]",khmr:"[០-៩]",knda:"[೦-೯]",laoo:"[໐-໙]",limb:"[᥆-᥏]",mlym:"[൦-൯]",mong:"[᠐-᠙]",mymr:"[၀-၉]",orya:"[୦-୯]",tamldec:"[௦-௯]",telu:"[౦-౯]",thai:"[๐-๙]",tibt:"[༠-༩]",latn:"\\d"},aj={arab:[1632,1641],arabext:[1776,1785],bali:[6992,7001],beng:[2534,2543],deva:[2406,2415],fullwide:[65296,65303],gujr:[2790,2799],khmr:[6112,6121],knda:[3302,3311],laoo:[3792,3801],limb:[6470,6479],mlym:[3430,3439],mong:[6160,6169],mymr:[4160,4169],orya:[2918,2927],tamldec:[3046,3055],telu:[3174,3183],thai:[3664,3673],tibt:[3872,3881]},ak=ai.hanidec.replace(/[\[|\]]/g,"").split(""),al=new Map;function am({numberingSystem:a},b=""){let c=a||"latn",d=al.get(c);void 0===d&&(d=new Map,al.set(c,d));let e=d.get(b);return void 0===e&&(e=RegExp(`${ai[c]}${b}`),d.set(b,e)),e}let an=()=>Date.now(),ao="system",ap=null,aq=null,ar=null,as=60,at,au=null;class av{static get now(){return an}static set now(a){an=a}static set defaultZone(a){ao=a}static get defaultZone(){return ah(ao,M.instance)}static get defaultLocale(){return ap}static set defaultLocale(a){ap=a}static get defaultNumberingSystem(){return aq}static set defaultNumberingSystem(a){aq=a}static get defaultOutputCalendar(){return ar}static set defaultOutputCalendar(a){ar=a}static get defaultWeekSettings(){return au}static set defaultWeekSettings(a){au=aR(a)}static get twoDigitCutoffYear(){return as}static set twoDigitCutoffYear(a){as=a%100}static get throwOnInvalid(){return at}static set throwOnInvalid(a){at=a}static resetCaches(){ad.resetCache(),Q.resetCache(),cV.resetCache(),al.clear()}}class aw{constructor(a,b){this.reason=a,this.explanation=b}toMessage(){return this.explanation?`${this.reason}: ${this.explanation}`:this.reason}}let ax=[0,31,59,90,120,151,181,212,243,273,304,334],ay=[0,31,60,91,121,152,182,213,244,274,305,335];function az(a,b){return new aw("unit out of range",`you specified ${b} (of type ${typeof b}) as a ${a}, which is invalid`)}function aA(a,b,c){let d=new Date(Date.UTC(a,b-1,c));a<100&&a>=0&&d.setUTCFullYear(d.getUTCFullYear()-1900);let e=d.getUTCDay();return 0===e?7:e}function aB(a,b){let c=aY(a)?ay:ax,d=c.findIndex(a=>a<b),e=b-c[d];return{month:d+1,day:e}}function aC(a,b){return(a-b+7)%7+1}function aD(a,b=4,c=1){let{year:d,month:e,day:f}=a,g=f+(aY(d)?ay:ax)[e-1],h=aC(aA(d,e,f),c),i=Math.floor((g-h+14-b)/7),j;return i<1?i=a1(j=d-1,b,c):i>a1(d,b,c)?(j=d+1,i=1):j=d,{weekYear:j,weekNumber:i,weekday:h,...a8(a)}}function aE(a,b=4,c=1){let{weekYear:d,weekNumber:e,weekday:f}=a,g=aC(aA(d,1,b),c),h=aZ(d),i=7*e+f-g-7+b,j;i<1?i+=aZ(j=d-1):i>h?(j=d+1,i-=aZ(d)):j=d;let{month:k,day:l}=aB(j,i);return{year:j,month:k,day:l,...a8(a)}}function aF(a){let{year:b,month:c,day:d}=a,e=d+(aY(b)?ay:ax)[c-1];return{year:b,ordinal:e,...a8(a)}}function aG(a){let{year:b,ordinal:c}=a,{month:d,day:e}=aB(b,c);return{year:b,month:d,day:e,...a8(a)}}function aH(a,b){if(!(!aK(a.localWeekday)||!aK(a.localWeekNumber)||!aK(a.localWeekYear)))return{minDaysInFirstWeek:4,startOfWeek:1};if(!aK(a.weekday)||!aK(a.weekNumber)||!aK(a.weekYear))throw new h("Cannot mix locale-based week fields with ISO-based week fields");return aK(a.localWeekday)||(a.weekday=a.localWeekday),aK(a.localWeekNumber)||(a.weekNumber=a.localWeekNumber),aK(a.localWeekYear)||(a.weekYear=a.localWeekYear),delete a.localWeekday,delete a.localWeekNumber,delete a.localWeekYear,{minDaysInFirstWeek:b.getMinDaysInFirstWeek(),startOfWeek:b.getStartOfWeek()}}function aI(a){let b=aM(a.year),c=aS(a.month,1,12),d=aS(a.day,1,a$(a.year,a.month));return b?c?!d&&az("day",a.day):az("month",a.month):az("year",a.year)}function aJ(a){let{hour:b,minute:c,second:d,millisecond:e}=a,f=aS(b,0,23)||24===b&&0===c&&0===d&&0===e,g=aS(c,0,59),h=aS(d,0,59),i=aS(e,0,999);return f?g?h?!i&&az("millisecond",e):az("second",d):az("minute",c):az("hour",b)}function aK(a){return void 0===a}function aL(a){return"number"==typeof a}function aM(a){return"number"==typeof a&&a%1==0}function aN(){try{return"undefined"!=typeof Intl&&!!Intl.RelativeTimeFormat}catch(a){return!1}}function aO(){try{return"undefined"!=typeof Intl&&!!Intl.Locale&&("weekInfo"in Intl.Locale.prototype||"getWeekInfo"in Intl.Locale.prototype)}catch(a){return!1}}function aP(a,b,c){if(0!==a.length)return a.reduce((a,d)=>{let e=[b(d),d];return a&&c(a[0],e[0])===a[0]?a:e},null)[1]}function aQ(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function aR(a){if(null==a)return null;if("object"!=typeof a)throw new j("Week settings must be an object");if(!aS(a.firstDay,1,7)||!aS(a.minimalDays,1,7)||!Array.isArray(a.weekend)||a.weekend.some(a=>!aS(a,1,7)))throw new j("Invalid week settings");return{firstDay:a.firstDay,minimalDays:a.minimalDays,weekend:Array.from(a.weekend)}}function aS(a,b,c){return aM(a)&&a>=b&&a<=c}function aT(a,b=2){return a<0?"-"+(""+-a).padStart(b,"0"):(""+a).padStart(b,"0")}function aU(a){if(!aK(a)&&null!==a&&""!==a)return parseInt(a,10)}function aV(a){if(!aK(a)&&null!==a&&""!==a)return parseFloat(a)}function aW(a){if(!aK(a)&&null!==a&&""!==a)return Math.floor(1e3*parseFloat("0."+a))}function aX(a,b,c="round"){let d=10**b;switch(c){case"expand":return a>0?Math.ceil(a*d)/d:Math.floor(a*d)/d;case"trunc":return Math.trunc(a*d)/d;case"round":return Math.round(a*d)/d;case"floor":return Math.floor(a*d)/d;case"ceil":return Math.ceil(a*d)/d;default:throw RangeError(`Value rounding ${c} is out of range`)}}function aY(a){return a%4==0&&(a%100!=0||a%400==0)}function aZ(a){return aY(a)?366:365}function a$(a,b){var c;let d=(c=b-1)-12*Math.floor(c/12)+1;return 2===d?aY(a+(b-d)/12)?29:28:[31,null,31,30,31,30,31,31,30,31,30,31][d-1]}function a_(a){let b=Date.UTC(a.year,a.month-1,a.day,a.hour,a.minute,a.second,a.millisecond);return a.year<100&&a.year>=0&&(b=new Date(b)).setUTCFullYear(a.year,a.month-1,a.day),+b}function a0(a,b,c){return-aC(aA(a,1,b),c)+b-1}function a1(a,b=4,c=1){let d=a0(a,b,c),e=a0(a+1,b,c);return(aZ(a)-d+e)/7}function a2(a){return a>99?a:a>av.twoDigitCutoffYear?1900+a:2e3+a}function a3(a,b,c,d=null){let e=new Date(a),f={hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"};d&&(f.timeZone=d);let g={timeZoneName:b,...f},h=new Intl.DateTimeFormat(c,g).formatToParts(e).find(a=>"timezonename"===a.type.toLowerCase());return h?h.value:null}function a4(a,b){let c=parseInt(a,10);Number.isNaN(c)&&(c=0);let d=parseInt(b,10)||0,e=c<0||Object.is(c,-0)?-d:d;return 60*c+e}function a5(a){let b=Number(a);if("boolean"==typeof a||""===a||!Number.isFinite(b))throw new j(`Invalid unit value ${a}`);return b}function a6(a,b){let c={};for(let d in a)if(aQ(a,d)){let e=a[d];if(null==e)continue;c[b(d)]=a5(e)}return c}function a7(a,b){let c=Math.trunc(Math.abs(a/60)),d=Math.trunc(Math.abs(a%60)),e=a>=0?"+":"-";switch(b){case"short":return`${e}${aT(c,2)}:${aT(d,2)}`;case"narrow":return`${e}${c}${d>0?`:${d}`:""}`;case"techie":return`${e}${aT(c,2)}${aT(d,2)}`;default:throw RangeError(`Value format ${b} is out of range for property format`)}}function a8(a){return["hour","minute","second","millisecond"].reduce((b,c)=>(b[c]=a[c],b),{})}let a9=["January","February","March","April","May","June","July","August","September","October","November","December"],ba=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],bb=["J","F","M","A","M","J","J","A","S","O","N","D"];function bc(a){switch(a){case"narrow":return[...bb];case"short":return[...ba];case"long":return[...a9];case"numeric":return["1","2","3","4","5","6","7","8","9","10","11","12"];case"2-digit":return["01","02","03","04","05","06","07","08","09","10","11","12"];default:return null}}let bd=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],be=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],bf=["M","T","W","T","F","S","S"];function bg(a){switch(a){case"narrow":return[...bf];case"short":return[...be];case"long":return[...bd];case"numeric":return["1","2","3","4","5","6","7"];default:return null}}let bh=["AM","PM"],bi=["Before Christ","Anno Domini"],bj=["BC","AD"],bk=["B","A"];function bl(a){switch(a){case"narrow":return[...bk];case"short":return[...bj];case"long":return[...bi];default:return null}}function bm(a,b){let c="";for(let d of a)d.literal?c+=d.val:c+=b(d.val);return c}let bn={D:o,DD:p,DDD:r,DDDD:s,t:t,tt:u,ttt:v,tttt:w,T:x,TT:y,TTT:z,TTTT:A,f:B,ff:D,fff:G,ffff:I,F:C,FF:E,FFF:H,FFFF:J};class bo{static create(a,b={}){return new bo(a,b)}static parseFormat(a){let b=null,c="",d=!1,e=[];for(let f=0;f<a.length;f++){let g=a.charAt(f);"'"===g?((c.length>0||d)&&e.push({literal:d||/^\s+$/.test(c),val:""===c?"'":c}),b=null,c="",d=!d):d||g===b?c+=g:(c.length>0&&e.push({literal:/^\s+$/.test(c),val:c}),c=g,b=g)}return c.length>0&&e.push({literal:d||/^\s+$/.test(c),val:c}),e}static macroTokenToFormatOpts(a){return bn[a]}constructor(a,b){this.opts=b,this.loc=a,this.systemLoc=null}formatWithSystemDefault(a,b){return null===this.systemLoc&&(this.systemLoc=this.loc.redefaultToSystem()),this.systemLoc.dtFormatter(a,{...this.opts,...b}).format()}dtFormatter(a,b={}){return this.loc.dtFormatter(a,{...this.opts,...b})}formatDateTime(a,b){return this.dtFormatter(a,b).format()}formatDateTimeParts(a,b){return this.dtFormatter(a,b).formatToParts()}formatInterval(a,b){return this.dtFormatter(a.start,b).dtf.formatRange(a.start.toJSDate(),a.end.toJSDate())}resolvedOptions(a,b){return this.dtFormatter(a,b).resolvedOptions()}num(a,b=0,c){if(this.opts.forceSimple)return aT(a,b);let d={...this.opts};return b>0&&(d.padTo=b),c&&(d.signDisplay=c),this.loc.numberFormatter(d).format(a)}formatDateTimeFromString(a,b){let c="en"===this.loc.listingMode(),d=this.loc.outputCalendar&&"gregory"!==this.loc.outputCalendar,e=(b,c)=>this.loc.extract(a,b,c),f=b=>a.isOffsetFixed&&0===a.offset&&b.allowZ?"Z":a.isValid?a.zone.formatOffset(a.ts,b.format):"",g=(b,d)=>c?bc(b)[a.month-1]:e(d?{month:b}:{month:b,day:"numeric"},"month"),h=(b,d)=>c?bg(b)[a.weekday-1]:e(d?{weekday:b}:{weekday:b,month:"long",day:"numeric"},"weekday"),i=b=>{let c=bo.macroTokenToFormatOpts(b);return c?this.formatWithSystemDefault(a,c):b},j=b=>c?bl(b)[a.year<0?0:1]:e({era:b},"era"),k=b=>{switch(b){case"S":return this.num(a.millisecond);case"u":case"SSS":return this.num(a.millisecond,3);case"s":return this.num(a.second);case"ss":return this.num(a.second,2);case"uu":return this.num(Math.floor(a.millisecond/10),2);case"uuu":return this.num(Math.floor(a.millisecond/100));case"m":return this.num(a.minute);case"mm":return this.num(a.minute,2);case"h":return this.num(a.hour%12==0?12:a.hour%12);case"hh":return this.num(a.hour%12==0?12:a.hour%12,2);case"H":return this.num(a.hour);case"HH":return this.num(a.hour,2);case"Z":return f({format:"narrow",allowZ:this.opts.allowZ});case"ZZ":return f({format:"short",allowZ:this.opts.allowZ});case"ZZZ":return f({format:"techie",allowZ:this.opts.allowZ});case"ZZZZ":return a.zone.offsetName(a.ts,{format:"short",locale:this.loc.locale});case"ZZZZZ":return a.zone.offsetName(a.ts,{format:"long",locale:this.loc.locale});case"z":return a.zoneName;case"a":return c?bh[a.hour<12?0:1]:e({hour:"numeric",hourCycle:"h12"},"dayperiod");case"d":return d?e({day:"numeric"},"day"):this.num(a.day);case"dd":return d?e({day:"2-digit"},"day"):this.num(a.day,2);case"c":case"E":return this.num(a.weekday);case"ccc":return h("short",!0);case"cccc":return h("long",!0);case"ccccc":return h("narrow",!0);case"EEE":return h("short",!1);case"EEEE":return h("long",!1);case"EEEEE":return h("narrow",!1);case"L":return d?e({month:"numeric",day:"numeric"},"month"):this.num(a.month);case"LL":return d?e({month:"2-digit",day:"numeric"},"month"):this.num(a.month,2);case"LLL":return g("short",!0);case"LLLL":return g("long",!0);case"LLLLL":return g("narrow",!0);case"M":return d?e({month:"numeric"},"month"):this.num(a.month);case"MM":return d?e({month:"2-digit"},"month"):this.num(a.month,2);case"MMM":return g("short",!1);case"MMMM":return g("long",!1);case"MMMMM":return g("narrow",!1);case"y":return d?e({year:"numeric"},"year"):this.num(a.year);case"yy":return d?e({year:"2-digit"},"year"):this.num(a.year.toString().slice(-2),2);case"yyyy":return d?e({year:"numeric"},"year"):this.num(a.year,4);case"yyyyyy":return d?e({year:"numeric"},"year"):this.num(a.year,6);case"G":return j("short");case"GG":return j("long");case"GGGGG":return j("narrow");case"kk":return this.num(a.weekYear.toString().slice(-2),2);case"kkkk":return this.num(a.weekYear,4);case"W":return this.num(a.weekNumber);case"WW":return this.num(a.weekNumber,2);case"n":return this.num(a.localWeekNumber);case"nn":return this.num(a.localWeekNumber,2);case"ii":return this.num(a.localWeekYear.toString().slice(-2),2);case"iiii":return this.num(a.localWeekYear,4);case"o":return this.num(a.ordinal);case"ooo":return this.num(a.ordinal,3);case"q":return this.num(a.quarter);case"qq":return this.num(a.quarter,2);case"X":return this.num(Math.floor(a.ts/1e3));case"x":return this.num(a.ts);default:return i(b)}};return bm(bo.parseFormat(b),k)}formatDurationFromString(a,b){let c="negativeLargestOnly"===this.opts.signMode?-1:1,d=a=>{switch(a[0]){case"S":return"milliseconds";case"s":return"seconds";case"m":return"minutes";case"h":return"hours";case"d":return"days";case"w":return"weeks";case"M":return"months";case"y":return"years";default:return null}},e=(a,b)=>e=>{let f=d(e);if(!f)return e;{let d,g=b.isNegativeDuration&&f!==b.largestUnit?c:1;return d="negativeLargestOnly"===this.opts.signMode&&f!==b.largestUnit?"never":"all"===this.opts.signMode?"always":"auto",this.num(a.get(f)*g,e.length,d)}},f=bo.parseFormat(b),g=f.reduce((a,{literal:b,val:c})=>b?a:a.concat(c),[]),h=a.shiftTo(...g.map(d).filter(a=>a)),i={isNegativeDuration:h<0,largestUnit:Object.keys(h.values)[0]};return bm(f,e(h,i))}}let bp=/[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;function bq(...a){let b=a.reduce((a,b)=>a+b.source,"");return RegExp(`^${b}$`)}function br(...a){return b=>a.reduce(([a,c,d],e)=>{let[f,g,h]=e(b,d);return[{...a,...f},g||c,h]},[{},null,1]).slice(0,2)}function bs(a,...b){if(null==a)return[null,null];for(let[c,d]of b){let b=c.exec(a);if(b)return d(b)}return[null,null]}function bt(...a){return(b,c)=>{let d,e={};for(d=0;d<a.length;d++)e[a[d]]=aU(b[c+d]);return[e,null,c+d]}}let bu=/(?:([Zz])|([+-]\d\d)(?::?(\d\d))?)/,bv=`(?:${bu.source}?(?:\\[(${bp.source})\\])?)?`,bw=/(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/,bx=RegExp(`${bw.source}${bv}`),by=RegExp(`(?:[Tt]${bx.source})?`),bz=bt("weekYear","weekNumber","weekDay"),bA=bt("year","ordinal"),bB=RegExp(`${bw.source} ?(?:${bu.source}|(${bp.source}))?`),bC=RegExp(`(?: ${bB.source})?`);function bD(a,b,c){let d=a[b];return aK(d)?c:aU(d)}function bE(a,b){return[{hours:bD(a,b,0),minutes:bD(a,b+1,0),seconds:bD(a,b+2,0),milliseconds:aW(a[b+3])},null,b+4]}function bF(a,b){let c=!a[b]&&!a[b+1],d=a4(a[b+1],a[b+2]);return[{},c?null:af.instance(d),b+3]}function bG(a,b){return[{},a[b]?Q.create(a[b]):null,b+1]}let bH=RegExp(`^T?${bw.source}$`),bI=/^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;function bJ(a){let[b,c,d,e,f,g,h,i,j]=a,k="-"===b[0],l=i&&"-"===i[0],m=(a,b=!1)=>void 0!==a&&(b||a&&k)?-a:a;return[{years:m(aV(c)),months:m(aV(d)),weeks:m(aV(e)),days:m(aV(f)),hours:m(aV(g)),minutes:m(aV(h)),seconds:m(aV(i),"-0"===i),milliseconds:m(aW(j),l)}]}let bK={GMT:0,EDT:-240,EST:-300,CDT:-300,CST:-360,MDT:-360,MST:-420,PDT:-420,PST:-480};function bL(a,b,c,d,e,f,g){let h={year:2===b.length?a2(aU(b)):aU(b),month:ba.indexOf(c)+1,day:aU(d),hour:aU(e),minute:aU(f)};return g&&(h.second=aU(g)),a&&(h.weekday=a.length>3?bd.indexOf(a)+1:be.indexOf(a)+1),h}let bM=/^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;function bN(a){let[,b,c,d,e,f,g,h,i,j,k,l]=a;return[bL(b,e,d,c,f,g,h),new af(i?bK[i]:j?0:a4(k,l))]}let bO=/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/,bP=/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/,bQ=/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;function bR(a){let[,b,c,d,e,f,g,h]=a;return[bL(b,e,d,c,f,g,h),af.utcInstance]}function bS(a){let[,b,c,d,e,f,g,h]=a;return[bL(b,h,c,d,e,f,g),af.utcInstance]}let bT=bq(/([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/,by),bU=bq(/(\d{4})-?W(\d\d)(?:-?(\d))?/,by),bV=bq(/(\d{4})-?(\d{3})/,by),bW=bq(bx),bX=br(function(a,b){return[{year:bD(a,b),month:bD(a,b+1,1),day:bD(a,b+2,1)},null,b+3]},bE,bF,bG),bY=br(bz,bE,bF,bG),bZ=br(bA,bE,bF,bG),b$=br(bE,bF,bG),b_=br(bE),b0=bq(/(\d{4})-(\d\d)-(\d\d)/,bC),b1=bq(bB),b2=br(bE,bF,bG),b3="Invalid Duration",b4={weeks:{days:7,hours:168,minutes:10080,seconds:604800,milliseconds:6048e5},days:{hours:24,minutes:1440,seconds:86400,milliseconds:864e5},hours:{minutes:60,seconds:3600,milliseconds:36e5},minutes:{seconds:60,milliseconds:6e4},seconds:{milliseconds:1e3}},b5={years:{quarters:4,months:12,weeks:52,days:365,hours:8760,minutes:525600,seconds:31536e3,milliseconds:31536e6},quarters:{months:3,weeks:13,days:91,hours:2184,minutes:131040,seconds:7862400,milliseconds:78624e5},months:{weeks:4,days:30,hours:720,minutes:43200,seconds:2592e3,milliseconds:2592e6},...b4},b6={years:{quarters:4,months:12,weeks:52.1775,days:365.2425,hours:8765.82,minutes:525949.2,seconds:0x1e18558,milliseconds:31556952e3},quarters:{months:3,weeks:13.044375,days:91.310625,hours:2191.455,minutes:131487.3,seconds:7889238,milliseconds:7889238e3},months:{weeks:30.436875/7,days:30.436875,hours:730.485,minutes:43829.1,seconds:2629746,milliseconds:2629746e3},...b4},b7=["years","quarters","months","weeks","days","hours","minutes","seconds","milliseconds"],b8=b7.slice(0).reverse();function b9(a,b,c=!1){return new cd({values:c?b.values:{...a.values,...b.values||{}},loc:a.loc.clone(b.loc),conversionAccuracy:b.conversionAccuracy||a.conversionAccuracy,matrix:b.matrix||a.matrix})}function ca(a,b){var c;let d=null!=(c=b.milliseconds)?c:0;for(let c of b8.slice(1))b[c]&&(d+=b[c]*a[c].milliseconds);return d}function cb(a,b){let c=0>ca(a,b)?-1:1;b7.reduceRight((d,e)=>{if(aK(b[e]))return d;if(d){let f=b[d]*c,g=a[e][d],h=Math.floor(f/g);b[e]+=h*c,b[d]-=h*g*c}return e},null),b7.reduce((c,d)=>{if(aK(b[d]))return c;if(c){let e=b[c]%1;b[c]-=e,b[d]+=e*a[c][d]}return d},null)}function cc(a){let b={};for(let[c,d]of Object.entries(a))0!==d&&(b[c]=d);return b}class cd{constructor(a){let b="longterm"===a.conversionAccuracy,c=b?b6:b5;a.matrix&&(c=a.matrix),this.values=a.values,this.loc=a.loc||ad.create(),this.conversionAccuracy=b?"longterm":"casual",this.invalid=a.invalid||null,this.matrix=c,this.isLuxonDuration=!0}static fromMillis(a,b){return cd.fromObject({milliseconds:a},b)}static fromObject(a,b={}){if(null==a||"object"!=typeof a)throw new j(`Duration.fromObject: argument expected to be an object, got ${null===a?"null":typeof a}`);return new cd({values:a6(a,cd.normalizeUnit),loc:ad.fromObject(b),conversionAccuracy:b.conversionAccuracy,matrix:b.matrix})}static fromDurationLike(a){if(aL(a))return cd.fromMillis(a);if(cd.isDuration(a))return a;if("object"==typeof a)return cd.fromObject(a);throw new j(`Unknown duration argument ${a} of type ${typeof a}`)}static fromISO(a,b){let[c]=bs(a,[bI,bJ]);return c?cd.fromObject(c,b):cd.invalid("unparsable",`the input "${a}" can't be parsed as ISO 8601`)}static fromISOTime(a,b){let[c]=bs(a,[bH,b_]);return c?cd.fromObject(c,b):cd.invalid("unparsable",`the input "${a}" can't be parsed as ISO 8601`)}static invalid(a,b=null){if(!a)throw new j("need to specify a reason the Duration is invalid");let c=a instanceof aw?a:new aw(a,b);if(!av.throwOnInvalid)return new cd({invalid:c});throw new g(c)}static normalizeUnit(a){let b={year:"years",years:"years",quarter:"quarters",quarters:"quarters",month:"months",months:"months",week:"weeks",weeks:"weeks",day:"days",days:"days",hour:"hours",hours:"hours",minute:"minutes",minutes:"minutes",second:"seconds",seconds:"seconds",millisecond:"milliseconds",milliseconds:"milliseconds"}[a?a.toLowerCase():a];if(!b)throw new i(a);return b}static isDuration(a){return a&&a.isLuxonDuration||!1}get locale(){return this.isValid?this.loc.locale:null}get numberingSystem(){return this.isValid?this.loc.numberingSystem:null}toFormat(a,b={}){let c={...b,floor:!1!==b.round&&!1!==b.floor};return this.isValid?bo.create(this.loc,c).formatDurationFromString(this,a):b3}toHuman(a={}){if(!this.isValid)return b3;let b=!1!==a.showZeros,c=b7.map(c=>{let d=this.values[c];return aK(d)||0===d&&!b?null:this.loc.numberFormatter({style:"unit",unitDisplay:"long",...a,unit:c.slice(0,-1)}).format(d)}).filter(a=>a);return this.loc.listFormatter({type:"conjunction",style:a.listStyle||"narrow",...a}).format(c)}toObject(){return this.isValid?{...this.values}:{}}toISO(){if(!this.isValid)return null;let a="P";return 0!==this.years&&(a+=this.years+"Y"),(0!==this.months||0!==this.quarters)&&(a+=this.months+3*this.quarters+"M"),0!==this.weeks&&(a+=this.weeks+"W"),0!==this.days&&(a+=this.days+"D"),(0!==this.hours||0!==this.minutes||0!==this.seconds||0!==this.milliseconds)&&(a+="T"),0!==this.hours&&(a+=this.hours+"H"),0!==this.minutes&&(a+=this.minutes+"M"),(0!==this.seconds||0!==this.milliseconds)&&(a+=aX(this.seconds+this.milliseconds/1e3,3)+"S"),"P"===a&&(a+="T0S"),a}toISOTime(a={}){if(!this.isValid)return null;let b=this.toMillis();return b<0||b>=864e5?null:(a={suppressMilliseconds:!1,suppressSeconds:!1,includePrefix:!1,format:"extended",...a,includeOffset:!1},cV.fromMillis(b,{zone:"UTC"}).toISOTime(a))}toJSON(){return this.toISO()}toString(){return this.toISO()}[Symbol.for("nodejs.util.inspect.custom")](){return this.isValid?`Duration { values: ${JSON.stringify(this.values)} }`:`Duration { Invalid, reason: ${this.invalidReason} }`}toMillis(){return this.isValid?ca(this.matrix,this.values):NaN}valueOf(){return this.toMillis()}plus(a){if(!this.isValid)return this;let b=cd.fromDurationLike(a),c={};for(let a of b7)(aQ(b.values,a)||aQ(this.values,a))&&(c[a]=b.get(a)+this.get(a));return b9(this,{values:c},!0)}minus(a){if(!this.isValid)return this;let b=cd.fromDurationLike(a);return this.plus(b.negate())}mapUnits(a){if(!this.isValid)return this;let b={};for(let c of Object.keys(this.values))b[c]=a5(a(this.values[c],c));return b9(this,{values:b},!0)}get(a){return this[cd.normalizeUnit(a)]}set(a){return this.isValid?b9(this,{values:{...this.values,...a6(a,cd.normalizeUnit)}}):this}reconfigure({locale:a,numberingSystem:b,conversionAccuracy:c,matrix:d}={}){return b9(this,{loc:this.loc.clone({locale:a,numberingSystem:b}),matrix:d,conversionAccuracy:c})}as(a){return this.isValid?this.shiftTo(a).get(a):NaN}normalize(){if(!this.isValid)return this;let a=this.toObject();return cb(this.matrix,a),b9(this,{values:a},!0)}rescale(){return this.isValid?b9(this,{values:cc(this.normalize().shiftToAll().toObject())},!0):this}shiftTo(...a){let b;if(!this.isValid||0===a.length)return this;a=a.map(a=>cd.normalizeUnit(a));let c={},d={},e=this.toObject();for(let f of b7)if(a.indexOf(f)>=0){b=f;let a=0;for(let b in d)a+=this.matrix[b][f]*d[b],d[b]=0;aL(e[f])&&(a+=e[f]);let g=Math.trunc(a);c[f]=g,d[f]=(1e3*a-1e3*g)/1e3}else aL(e[f])&&(d[f]=e[f]);for(let a in d)0!==d[a]&&(c[b]+=a===b?d[a]:d[a]/this.matrix[b][a]);return cb(this.matrix,c),b9(this,{values:c},!0)}shiftToAll(){return this.isValid?this.shiftTo("years","months","weeks","days","hours","minutes","seconds","milliseconds"):this}negate(){if(!this.isValid)return this;let a={};for(let b of Object.keys(this.values))a[b]=0===this.values[b]?0:-this.values[b];return b9(this,{values:a},!0)}removeZeros(){return this.isValid?b9(this,{values:cc(this.values)},!0):this}get years(){return this.isValid?this.values.years||0:NaN}get quarters(){return this.isValid?this.values.quarters||0:NaN}get months(){return this.isValid?this.values.months||0:NaN}get weeks(){return this.isValid?this.values.weeks||0:NaN}get days(){return this.isValid?this.values.days||0:NaN}get hours(){return this.isValid?this.values.hours||0:NaN}get minutes(){return this.isValid?this.values.minutes||0:NaN}get seconds(){return this.isValid?this.values.seconds||0:NaN}get milliseconds(){return this.isValid?this.values.milliseconds||0:NaN}get isValid(){return null===this.invalid}get invalidReason(){return this.invalid?this.invalid.reason:null}get invalidExplanation(){return this.invalid?this.invalid.explanation:null}equals(a){if(!this.isValid||!a.isValid||!this.loc.equals(a.loc))return!1;for(let d of b7){var b,c;if(b=this.values[d],c=a.values[d],void 0===b||0===b?void 0!==c&&0!==c:b!==c)return!1}return!0}}let ce="Invalid Interval";class cf{constructor(a){this.s=a.start,this.e=a.end,this.invalid=a.invalid||null,this.isLuxonInterval=!0}static invalid(a,b=null){if(!a)throw new j("need to specify a reason the Interval is invalid");let c=a instanceof aw?a:new aw(a,b);if(!av.throwOnInvalid)return new cf({invalid:c});throw new f(c)}static fromDateTimes(a,b){var c,d;let e=cW(a),f=cW(b),g=(c=e,d=f,c&&c.isValid?d&&d.isValid?d<c?cf.invalid("end before start",`The end of an interval must be after its start, but you had start=${c.toISO()} and end=${d.toISO()}`):null:cf.invalid("missing or invalid end"):cf.invalid("missing or invalid start"));return null==g?new cf({start:e,end:f}):g}static after(a,b){let c=cd.fromDurationLike(b),d=cW(a);return cf.fromDateTimes(d,d.plus(c))}static before(a,b){let c=cd.fromDurationLike(b),d=cW(a);return cf.fromDateTimes(d.minus(c),d)}static fromISO(a,b){let[c,d]=(a||"").split("/",2);if(c&&d){let a,e,f,g;try{e=(a=cV.fromISO(c,b)).isValid}catch(a){e=!1}try{g=(f=cV.fromISO(d,b)).isValid}catch(a){g=!1}if(e&&g)return cf.fromDateTimes(a,f);if(e){let c=cd.fromISO(d,b);if(c.isValid)return cf.after(a,c)}else if(g){let a=cd.fromISO(c,b);if(a.isValid)return cf.before(f,a)}}return cf.invalid("unparsable",`the input "${a}" can't be parsed as ISO 8601`)}static isInterval(a){return a&&a.isLuxonInterval||!1}get start(){return this.isValid?this.s:null}get end(){return this.isValid?this.e:null}get lastDateTime(){return this.isValid&&this.e?this.e.minus(1):null}get isValid(){return null===this.invalidReason}get invalidReason(){return this.invalid?this.invalid.reason:null}get invalidExplanation(){return this.invalid?this.invalid.explanation:null}length(a="milliseconds"){return this.isValid?this.toDuration(a).get(a):NaN}count(a="milliseconds",b){let c;if(!this.isValid)return NaN;let d=this.start.startOf(a,b);return Math.floor((c=(c=null!=b&&b.useLocaleWeeks?this.end.reconfigure({locale:d.locale}):this.end).startOf(a,b)).diff(d,a).get(a))+(c.valueOf()!==this.end.valueOf())}hasSame(a){return!!this.isValid&&(this.isEmpty()||this.e.minus(1).hasSame(this.s,a))}isEmpty(){return this.s.valueOf()===this.e.valueOf()}isAfter(a){return!!this.isValid&&this.s>a}isBefore(a){return!!this.isValid&&this.e<=a}contains(a){return!!this.isValid&&this.s<=a&&this.e>a}set({start:a,end:b}={}){return this.isValid?cf.fromDateTimes(a||this.s,b||this.e):this}splitAt(...a){if(!this.isValid)return[];let b=a.map(cW).filter(a=>this.contains(a)).sort((a,b)=>a.toMillis()-b.toMillis()),c=[],{s:d}=this,e=0;for(;d<this.e;){let a=b[e]||this.e,f=+a>+this.e?this.e:a;c.push(cf.fromDateTimes(d,f)),d=f,e+=1}return c}splitBy(a){let b=cd.fromDurationLike(a);if(!this.isValid||!b.isValid||0===b.as("milliseconds"))return[];let{s:c}=this,d=1,e,f=[];for(;c<this.e;){let a=this.start.plus(b.mapUnits(a=>a*d));e=+a>+this.e?this.e:a,f.push(cf.fromDateTimes(c,e)),c=e,d+=1}return f}divideEqually(a){return this.isValid?this.splitBy(this.length()/a).slice(0,a):[]}overlaps(a){return this.e>a.s&&this.s<a.e}abutsStart(a){return!!this.isValid&&+this.e==+a.s}abutsEnd(a){return!!this.isValid&&+a.e==+this.s}engulfs(a){return!!this.isValid&&this.s<=a.s&&this.e>=a.e}equals(a){return!!this.isValid&&!!a.isValid&&this.s.equals(a.s)&&this.e.equals(a.e)}intersection(a){if(!this.isValid)return this;let b=this.s>a.s?this.s:a.s,c=this.e<a.e?this.e:a.e;return b>=c?null:cf.fromDateTimes(b,c)}union(a){if(!this.isValid)return this;let b=this.s<a.s?this.s:a.s,c=this.e>a.e?this.e:a.e;return cf.fromDateTimes(b,c)}static merge(a){let[b,c]=a.sort((a,b)=>a.s-b.s).reduce(([a,b],c)=>b?b.overlaps(c)||b.abutsStart(c)?[a,b.union(c)]:[a.concat([b]),c]:[a,c],[[],null]);return c&&b.push(c),b}static xor(a){let b=null,c=0,d=[],e=a.map(a=>[{time:a.s,type:"s"},{time:a.e,type:"e"}]);for(let a of Array.prototype.concat(...e).sort((a,b)=>a.time-b.time))1===(c+="s"===a.type?1:-1)?b=a.time:(b&&+b!=+a.time&&d.push(cf.fromDateTimes(b,a.time)),b=null);return cf.merge(d)}difference(...a){return cf.xor([this].concat(a)).map(a=>this.intersection(a)).filter(a=>a&&!a.isEmpty())}toString(){return this.isValid?`[${this.s.toISO()} – ${this.e.toISO()})`:ce}[Symbol.for("nodejs.util.inspect.custom")](){return this.isValid?`Interval { start: ${this.s.toISO()}, end: ${this.e.toISO()} }`:`Interval { Invalid, reason: ${this.invalidReason} }`}toLocaleString(a=o,b={}){return this.isValid?bo.create(this.s.loc.clone(b),a).formatInterval(this):ce}toISO(a){return this.isValid?`${this.s.toISO(a)}/${this.e.toISO(a)}`:ce}toISODate(){return this.isValid?`${this.s.toISODate()}/${this.e.toISODate()}`:ce}toISOTime(a){return this.isValid?`${this.s.toISOTime(a)}/${this.e.toISOTime(a)}`:ce}toFormat(a,{separator:b=" – "}={}){return this.isValid?`${this.s.toFormat(a)}${b}${this.e.toFormat(a)}`:ce}toDuration(a,b){return this.isValid?this.e.diff(this.s,a,b):cd.invalid(this.invalidReason)}mapEndpoints(a){return cf.fromDateTimes(a(this.s),a(this.e))}}class cg{static hasDST(a=av.defaultZone){let b=cV.now().setZone(a).set({month:12});return!a.isUniversal&&b.offset!==b.set({month:6}).offset}static isValidIANAZone(a){return Q.isValidZone(a)}static normalizeZone(a){return ah(a,av.defaultZone)}static getStartOfWeek({locale:a=null,locObj:b=null}={}){return(b||ad.create(a)).getStartOfWeek()}static getMinimumDaysInFirstWeek({locale:a=null,locObj:b=null}={}){return(b||ad.create(a)).getMinDaysInFirstWeek()}static getWeekendWeekdays({locale:a=null,locObj:b=null}={}){return(b||ad.create(a)).getWeekendDays().slice()}static months(a="long",{locale:b=null,numberingSystem:c=null,locObj:d=null,outputCalendar:e="gregory"}={}){return(d||ad.create(b,c,e)).months(a)}static monthsFormat(a="long",{locale:b=null,numberingSystem:c=null,locObj:d=null,outputCalendar:e="gregory"}={}){return(d||ad.create(b,c,e)).months(a,!0)}static weekdays(a="long",{locale:b=null,numberingSystem:c=null,locObj:d=null}={}){return(d||ad.create(b,c,null)).weekdays(a)}static weekdaysFormat(a="long",{locale:b=null,numberingSystem:c=null,locObj:d=null}={}){return(d||ad.create(b,c,null)).weekdays(a,!0)}static meridiems({locale:a=null}={}){return ad.create(a).meridiems()}static eras(a="short",{locale:b=null}={}){return ad.create(b,null,"gregory").eras(a)}static features(){return{relative:aN(),localeWeek:aO()}}}function ch(a,b){let c=a=>a.toUTC(0,{keepLocalTime:!0}).startOf("day").valueOf(),d=c(b)-c(a);return Math.floor(cd.fromMillis(d).as("days"))}function ci(a,b=a=>a){return{regex:a,deser:([a])=>b(function(a){let b=parseInt(a,10);if(!isNaN(b))return b;b="";for(let c=0;c<a.length;c++){let d=a.charCodeAt(c);if(-1!==a[c].search(ai.hanidec))b+=ak.indexOf(a[c]);else for(let a in aj){let[c,e]=aj[a];d>=c&&d<=e&&(b+=d-c)}}return parseInt(b,10)}(a))}}let cj=String.fromCharCode(160),ck=`[ ${cj}]`,cl=RegExp(ck,"g");function cm(a){return a.replace(/\./g,"\\.?").replace(cl,ck)}function cn(a){return a.replace(/\./g,"").replace(cl," ").toLowerCase()}function co(a,b){return null===a?null:{regex:RegExp(a.map(cm).join("|")),deser:([c])=>a.findIndex(a=>cn(c)===cn(a))+b}}function cp(a,b){return{regex:a,deser:([,a,b])=>a4(a,b),groups:b}}function cq(a){return{regex:a,deser:([a])=>a}}let cr={year:{"2-digit":"yy",numeric:"yyyyy"},month:{numeric:"M","2-digit":"MM",short:"MMM",long:"MMMM"},day:{numeric:"d","2-digit":"dd"},weekday:{short:"EEE",long:"EEEE"},dayperiod:"a",dayPeriod:"a",hour12:{numeric:"h","2-digit":"hh"},hour24:{numeric:"H","2-digit":"HH"},minute:{numeric:"m","2-digit":"mm"},second:{numeric:"s","2-digit":"ss"},timeZoneName:{long:"ZZZZZ",short:"ZZZ"}},cs=null;function ct(a,b){return Array.prototype.concat(...a.map(a=>(function(a,b){if(a.literal)return a;let c=cw(bo.macroTokenToFormatOpts(a.val),b);return null==c||c.includes(void 0)?a:c})(a,b)))}class cu{constructor(a,b){if(this.locale=a,this.format=b,this.tokens=ct(bo.parseFormat(b),a),this.units=this.tokens.map(b=>(function(a,b){let c=am(b),d=am(b,"{2}"),e=am(b,"{3}"),f=am(b,"{4}"),g=am(b,"{6}"),h=am(b,"{1,2}"),i=am(b,"{1,3}"),j=am(b,"{1,6}"),k=am(b,"{1,9}"),l=am(b,"{2,4}"),m=am(b,"{4,6}"),n=a=>({regex:RegExp(a.val.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")),deser:([a])=>a,literal:!0}),o=(o=>{if(a.literal)return n(o);switch(o.val){case"G":return co(b.eras("short"),0);case"GG":return co(b.eras("long"),0);case"y":return ci(j);case"yy":case"kk":return ci(l,a2);case"yyyy":case"kkkk":return ci(f);case"yyyyy":return ci(m);case"yyyyyy":return ci(g);case"M":case"L":case"d":case"H":case"h":case"m":case"q":case"s":case"W":return ci(h);case"MM":case"LL":case"dd":case"HH":case"hh":case"mm":case"qq":case"ss":case"WW":return ci(d);case"MMM":return co(b.months("short",!0),1);case"MMMM":return co(b.months("long",!0),1);case"LLL":return co(b.months("short",!1),1);case"LLLL":return co(b.months("long",!1),1);case"o":case"S":return ci(i);case"ooo":case"SSS":return ci(e);case"u":return cq(k);case"uu":return cq(h);case"uuu":case"E":case"c":return ci(c);case"a":return co(b.meridiems(),0);case"EEE":return co(b.weekdays("short",!1),1);case"EEEE":return co(b.weekdays("long",!1),1);case"ccc":return co(b.weekdays("short",!0),1);case"cccc":return co(b.weekdays("long",!0),1);case"Z":case"ZZ":return cp(RegExp(`([+-]${h.source})(?::(${d.source}))?`),2);case"ZZZ":return cp(RegExp(`([+-]${h.source})(${d.source})?`),2);case"z":return cq(/[a-z_+-/]{1,256}?/i);case" ":return cq(/[^\S\n\r]/);default:return n(o)}})(a)||{invalidReason:"missing Intl.DateTimeFormat.formatToParts support"};return o.token=a,o})(b,a)),this.disqualifyingUnit=this.units.find(a=>a.invalidReason),!this.disqualifyingUnit){let[a,b]=function(a){let b=a.map(a=>a.regex).reduce((a,b)=>`${a}(${b.source})`,"");return[`^${b}$`,a]}(this.units);this.regex=RegExp(a,"i"),this.handlers=b}}explainFromTokens(a){if(!this.isValid)return{input:a,tokens:this.tokens,invalidReason:this.invalidReason};{let b,c,[d,e]=function(a,b,c){let d=a.match(b);if(!d)return[d,{}];{let a={},b=1;for(let e in c)if(aQ(c,e)){let f=c[e],g=f.groups?f.groups+1:1;!f.literal&&f.token&&(a[f.token.val[0]]=f.deser(d.slice(b,b+g))),b+=g}return[d,a]}}(a,this.regex,this.handlers),[f,g,i]=e?(c=null,aK(e.z)||(c=Q.create(e.z)),aK(e.Z)||(c||(c=new af(e.Z)),b=e.Z),aK(e.q)||(e.M=(e.q-1)*3+1),aK(e.h)||(e.h<12&&1===e.a?e.h+=12:12===e.h&&0===e.a&&(e.h=0)),0===e.G&&e.y&&(e.y=-e.y),aK(e.u)||(e.S=aW(e.u)),[Object.keys(e).reduce((a,b)=>{let c=(a=>{switch(a){case"S":return"millisecond";case"s":return"second";case"m":return"minute";case"h":case"H":return"hour";case"d":return"day";case"o":return"ordinal";case"L":case"M":return"month";case"y":return"year";case"E":case"c":return"weekday";case"W":return"weekNumber";case"k":return"weekYear";case"q":return"quarter";default:return null}})(b);return c&&(a[c]=e[b]),a},{}),c,b]):[null,null,void 0];if(aQ(e,"a")&&aQ(e,"H"))throw new h("Can't include meridiem when specifying 24-hour format");return{input:a,tokens:this.tokens,regex:this.regex,rawMatches:d,matches:e,result:f,zone:g,specificOffset:i}}}get isValid(){return!this.disqualifyingUnit}get invalidReason(){return this.disqualifyingUnit?this.disqualifyingUnit.invalidReason:null}}function cv(a,b,c){return new cu(a,c).explainFromTokens(b)}function cw(a,b){if(!a)return null;let c=bo.create(b,a).dtFormatter((cs||(cs=cV.fromMillis(0x16a2e5618e3)),cs)),d=c.formatToParts(),e=c.resolvedOptions();return d.map(b=>(function(a,b,c){let{type:d,value:e}=a;if("literal"===d){let a=/^\s+$/.test(e);return{literal:!a,val:a?" ":e}}let f=b[d],g=d;"hour"===d&&(g=null!=b.hour12?b.hour12?"hour12":"hour24":null!=b.hourCycle?"h11"===b.hourCycle||"h12"===b.hourCycle?"hour12":"hour24":c.hour12?"hour12":"hour24");let h=cr[g];if("object"==typeof h&&(h=h[f]),h)return{literal:!1,val:h}})(b,a,e))}let cx="Invalid DateTime";function cy(a){return new aw("unsupported zone",`the zone "${a.name}" is not supported`)}function cz(a){return null===a.weekData&&(a.weekData=aD(a.c)),a.weekData}function cA(a){return null===a.localWeekData&&(a.localWeekData=aD(a.c,a.loc.getMinDaysInFirstWeek(),a.loc.getStartOfWeek())),a.localWeekData}function cB(a,b){let c={ts:a.ts,zone:a.zone,c:a.c,o:a.o,loc:a.loc,invalid:a.invalid};return new cV({...c,...b,old:c})}function cC(a,b,c){let d=a-60*b*1e3,e=c.offset(d);if(b===e)return[d,b];d-=(e-b)*6e4;let f=c.offset(d);return e===f?[d,e]:[a-60*Math.min(e,f)*1e3,Math.max(e,f)]}function cD(a,b){let c=new Date(a+=60*b*1e3);return{year:c.getUTCFullYear(),month:c.getUTCMonth()+1,day:c.getUTCDate(),hour:c.getUTCHours(),minute:c.getUTCMinutes(),second:c.getUTCSeconds(),millisecond:c.getUTCMilliseconds()}}function cE(a,b){let c=a.o,d=a.c.year+Math.trunc(b.years),e=a.c.month+Math.trunc(b.months)+3*Math.trunc(b.quarters),f={...a.c,year:d,month:e,day:Math.min(a.c.day,a$(d,e))+Math.trunc(b.days)+7*Math.trunc(b.weeks)},g=cd.fromObject({years:b.years-Math.trunc(b.years),quarters:b.quarters-Math.trunc(b.quarters),months:b.months-Math.trunc(b.months),weeks:b.weeks-Math.trunc(b.weeks),days:b.days-Math.trunc(b.days),hours:b.hours,minutes:b.minutes,seconds:b.seconds,milliseconds:b.milliseconds}).as("milliseconds"),[h,i]=cC(a_(f),c,a.zone);return 0!==g&&(h+=g,i=a.zone.offset(h)),{ts:h,o:i}}function cF(a,b,c,d,e,f){let{setZone:g,zone:h}=c;if((!a||0===Object.keys(a).length)&&!b)return cV.invalid(new aw("unparsable",`the input "${e}" can't be parsed as ${d}`));{let d=cV.fromObject(a,{...c,zone:b||h,specificOffset:f});return g?d:d.setZone(h)}}function cG(a,b,c=!0){return a.isValid?bo.create(ad.create("en-US"),{allowZ:c,forceSimple:!0}).formatDateTimeFromString(a,b):null}function cH(a,b,c){let d=a.c.year>9999||a.c.year<0,e="";if(d&&a.c.year>=0&&(e+="+"),e+=aT(a.c.year,d?6:4),"year"===c)return e;if(b){if(e+="-",e+=aT(a.c.month),"month"===c)return e;e+="-"}else if(e+=aT(a.c.month),"month"===c)return e;return e+aT(a.c.day)}function cI(a,b,c,d,e,f,g){let h=!c||0!==a.c.millisecond||0!==a.c.second,i="";switch(g){case"day":case"month":case"year":break;default:if(i+=aT(a.c.hour),"hour"===g)break;if(b){if(i+=":",i+=aT(a.c.minute),"minute"===g)break;h&&(i+=":",i+=aT(a.c.second))}else{if(i+=aT(a.c.minute),"minute"===g)break;h&&(i+=aT(a.c.second))}if("second"===g)break;h&&(!d||0!==a.c.millisecond)&&(i+=".",i+=aT(a.c.millisecond,3))}return e&&(a.isOffsetFixed&&0===a.offset&&!f?i+="Z":a.o<0?(i+="-",i+=aT(Math.trunc(-a.o/60)),i+=":",i+=aT(Math.trunc(-a.o%60))):(i+="+",i+=aT(Math.trunc(a.o/60)),i+=":",i+=aT(Math.trunc(a.o%60)))),f&&(i+="["+a.zone.ianaName+"]"),i}let cJ={month:1,day:1,hour:0,minute:0,second:0,millisecond:0},cK={weekNumber:1,weekday:1,hour:0,minute:0,second:0,millisecond:0},cL={ordinal:1,hour:0,minute:0,second:0,millisecond:0},cM=["year","month","day","hour","minute","second","millisecond"],cN=["weekYear","weekNumber","weekday","hour","minute","second","millisecond"],cO=["year","ordinal","hour","minute","second","millisecond"];function cP(a){let b={year:"year",years:"year",month:"month",months:"month",day:"day",days:"day",hour:"hour",hours:"hour",minute:"minute",minutes:"minute",quarter:"quarter",quarters:"quarter",second:"second",seconds:"second",millisecond:"millisecond",milliseconds:"millisecond",weekday:"weekday",weekdays:"weekday",weeknumber:"weekNumber",weeksnumber:"weekNumber",weeknumbers:"weekNumber",weekyear:"weekYear",weekyears:"weekYear",ordinal:"ordinal"}[a.toLowerCase()];if(!b)throw new i(a);return b}function cQ(a){switch(a.toLowerCase()){case"localweekday":case"localweekdays":return"localWeekday";case"localweeknumber":case"localweeknumbers":return"localWeekNumber";case"localweekyear":case"localweekyears":return"localWeekYear";default:return cP(a)}}function cR(a,b){let d,e,f=ah(b.zone,av.defaultZone);if(!f.isValid)return cV.invalid(cy(f));let g=ad.fromObject(b);if(aK(a.year))d=av.now();else{for(let b of cM)aK(a[b])&&(a[b]=cJ[b]);let b=aI(a)||aJ(a);if(b)return cV.invalid(b);let g=function(a){if(void 0===c&&(c=av.now()),"iana"!==a.type)return a.offset(c);let b=a.name,d=cU.get(b);return void 0===d&&(d=a.offset(c),cU.set(b,d)),d}(f);[d,e]=cC(a_(a),g,f)}return new cV({ts:d,zone:f,loc:g,o:e})}function cS(a,b,c){let d=!!aK(c.round)||c.round,e=aK(c.rounding)?"trunc":c.rounding,f=(a,f)=>(a=aX(a,d||c.calendary?0:2,c.calendary?"round":e),b.loc.clone(c).relFormatter(c).format(a,f)),g=d=>c.calendary?b.hasSame(a,d)?0:b.startOf(d).diff(a.startOf(d),d).get(d):b.diff(a,d).get(d);if(c.unit)return f(g(c.unit),c.unit);for(let a of c.units){let b=g(a);if(Math.abs(b)>=1)return f(b,a)}return f(a>b?-0:0,c.units[c.units.length-1])}function cT(a){let b={},c;return a.length>0&&"object"==typeof a[a.length-1]?(b=a[a.length-1],c=Array.from(a).slice(0,a.length-1)):c=Array.from(a),[b,c]}let cU=new Map;class cV{constructor(a){let b=a.zone||av.defaultZone,c=a.invalid||(Number.isNaN(a.ts)?new aw("invalid input"):null)||(b.isValid?null:cy(b));this.ts=aK(a.ts)?av.now():a.ts;let d=null,e=null;if(!c)if(a.old&&a.old.ts===this.ts&&a.old.zone.equals(b))[d,e]=[a.old.c,a.old.o];else{let f=aL(a.o)&&!a.old?a.o:b.offset(this.ts);d=(c=Number.isNaN((d=cD(this.ts,f)).year)?new aw("invalid input"):null)?null:d,e=c?null:f}this._zone=b,this.loc=a.loc||ad.create(),this.invalid=c,this.weekData=null,this.localWeekData=null,this.c=d,this.o=e,this.isLuxonDateTime=!0}static now(){return new cV({})}static local(){let[a,b]=cT(arguments),[c,d,e,f,g,h,i]=b;return cR({year:c,month:d,day:e,hour:f,minute:g,second:h,millisecond:i},a)}static utc(){let[a,b]=cT(arguments),[c,d,e,f,g,h,i]=b;return a.zone=af.utcInstance,cR({year:c,month:d,day:e,hour:f,minute:g,second:h,millisecond:i},a)}static fromJSDate(a,b={}){let c="[object Date]"===Object.prototype.toString.call(a)?a.valueOf():NaN;if(Number.isNaN(c))return cV.invalid("invalid input");let d=ah(b.zone,av.defaultZone);return d.isValid?new cV({ts:c,zone:d,loc:ad.fromObject(b)}):cV.invalid(cy(d))}static fromMillis(a,b={}){if(aL(a))if(a<-864e13||a>864e13)return cV.invalid("Timestamp out of range");else return new cV({ts:a,zone:ah(b.zone,av.defaultZone),loc:ad.fromObject(b)});throw new j(`fromMillis requires a numerical input, but received a ${typeof a} with value ${a}`)}static fromSeconds(a,b={}){if(aL(a))return new cV({ts:1e3*a,zone:ah(b.zone,av.defaultZone),loc:ad.fromObject(b)});throw new j("fromSeconds requires a numerical input")}static fromObject(a,b={}){var c;a=a||{};let d=ah(b.zone,av.defaultZone);if(!d.isValid)return cV.invalid(cy(d));let e=ad.fromObject(b),f=a6(a,cQ),{minDaysInFirstWeek:g,startOfWeek:i}=aH(f,e),j=av.now(),k=aK(b.specificOffset)?d.offset(j):b.specificOffset,l=!aK(f.ordinal),m=!aK(f.year),n=!aK(f.month)||!aK(f.day),o=m||n,p=f.weekYear||f.weekNumber;if((o||l)&&p)throw new h("Can't mix weekYear/weekNumber units with year/month/day or ordinals");if(n&&l)throw new h("Can't mix ordinal dates with month/day");let q=p||f.weekday&&!o,r,s,t=cD(j,k);q?(r=cN,s=cK,t=aD(t,g,i)):l?(r=cO,s=cL,t=aF(t)):(r=cM,s=cJ);let u=!1;for(let a of r)aK(f[a])?u?f[a]=s[a]:f[a]=t[a]:u=!0;let v=(q?function(a,b=4,c=1){let d=aM(a.weekYear),e=aS(a.weekNumber,1,a1(a.weekYear,b,c)),f=aS(a.weekday,1,7);return d?e?!f&&az("weekday",a.weekday):az("week",a.weekNumber):az("weekYear",a.weekYear)}(f,g,i):l?function(a){let b=aM(a.year),c=aS(a.ordinal,1,aZ(a.year));return b?!c&&az("ordinal",a.ordinal):az("year",a.year)}(f):aI(f))||aJ(f);if(v)return cV.invalid(v);let[w,x]=(c=q?aE(f,g,i):l?aG(f):f,cC(a_(c),k,d)),y=new cV({ts:w,zone:d,o:x,loc:e});return f.weekday&&o&&a.weekday!==y.weekday?cV.invalid("mismatched weekday",`you can't specify both a weekday of ${f.weekday} and a date of ${y.toISO()}`):y.isValid?y:cV.invalid(y.invalid)}static fromISO(a,b={}){let[c,d]=bs(a,[bT,bX],[bU,bY],[bV,bZ],[bW,b$]);return cF(c,d,b,"ISO 8601",a)}static fromRFC2822(a,b={}){let[c,d]=bs(a.replace(/\([^()]*\)|[\n\t]/g," ").replace(/(\s\s+)/g," ").trim(),[bM,bN]);return cF(c,d,b,"RFC 2822",a)}static fromHTTP(a,b={}){let[c,d]=bs(a,[bO,bR],[bP,bR],[bQ,bS]);return cF(c,d,b,"HTTP",b)}static fromFormat(a,b,c={}){if(aK(a)||aK(b))throw new j("fromFormat requires an input string and a format");let{locale:d=null,numberingSystem:e=null}=c,[f,g,h,i]=function(a,b,c){let{result:d,zone:e,specificOffset:f,invalidReason:g}=cv(a,b,c);return[d,e,f,g]}(ad.fromOpts({locale:d,numberingSystem:e,defaultToEN:!0}),a,b);return i?cV.invalid(i):cF(f,g,c,`format ${b}`,a,h)}static fromString(a,b,c={}){return cV.fromFormat(a,b,c)}static fromSQL(a,b={}){let[c,d]=bs(a,[b0,bX],[b1,b2]);return cF(c,d,b,"SQL",a)}static invalid(a,b=null){if(!a)throw new j("need to specify a reason the DateTime is invalid");let c=a instanceof aw?a:new aw(a,b);if(!av.throwOnInvalid)return new cV({invalid:c});throw new e(c)}static isDateTime(a){return a&&a.isLuxonDateTime||!1}static parseFormatForOpts(a,b={}){let c=cw(a,ad.fromObject(b));return c?c.map(a=>a?a.val:null).join(""):null}static expandFormat(a,b={}){return ct(bo.parseFormat(a),ad.fromObject(b)).map(a=>a.val).join("")}static resetCache(){c=void 0,cU.clear()}get(a){return this[a]}get isValid(){return null===this.invalid}get invalidReason(){return this.invalid?this.invalid.reason:null}get invalidExplanation(){return this.invalid?this.invalid.explanation:null}get locale(){return this.isValid?this.loc.locale:null}get numberingSystem(){return this.isValid?this.loc.numberingSystem:null}get outputCalendar(){return this.isValid?this.loc.outputCalendar:null}get zone(){return this._zone}get zoneName(){return this.isValid?this.zone.name:null}get year(){return this.isValid?this.c.year:NaN}get quarter(){return this.isValid?Math.ceil(this.c.month/3):NaN}get month(){return this.isValid?this.c.month:NaN}get day(){return this.isValid?this.c.day:NaN}get hour(){return this.isValid?this.c.hour:NaN}get minute(){return this.isValid?this.c.minute:NaN}get second(){return this.isValid?this.c.second:NaN}get millisecond(){return this.isValid?this.c.millisecond:NaN}get weekYear(){return this.isValid?cz(this).weekYear:NaN}get weekNumber(){return this.isValid?cz(this).weekNumber:NaN}get weekday(){return this.isValid?cz(this).weekday:NaN}get isWeekend(){return this.isValid&&this.loc.getWeekendDays().includes(this.weekday)}get localWeekday(){return this.isValid?cA(this).weekday:NaN}get localWeekNumber(){return this.isValid?cA(this).weekNumber:NaN}get localWeekYear(){return this.isValid?cA(this).weekYear:NaN}get ordinal(){return this.isValid?aF(this.c).ordinal:NaN}get monthShort(){return this.isValid?cg.months("short",{locObj:this.loc})[this.month-1]:null}get monthLong(){return this.isValid?cg.months("long",{locObj:this.loc})[this.month-1]:null}get weekdayShort(){return this.isValid?cg.weekdays("short",{locObj:this.loc})[this.weekday-1]:null}get weekdayLong(){return this.isValid?cg.weekdays("long",{locObj:this.loc})[this.weekday-1]:null}get offset(){return this.isValid?+this.o:NaN}get offsetNameShort(){return this.isValid?this.zone.offsetName(this.ts,{format:"short",locale:this.locale}):null}get offsetNameLong(){return this.isValid?this.zone.offsetName(this.ts,{format:"long",locale:this.locale}):null}get isOffsetFixed(){return this.isValid?this.zone.isUniversal:null}get isInDST(){return!this.isOffsetFixed&&(this.offset>this.set({month:1,day:1}).offset||this.offset>this.set({month:5}).offset)}getPossibleOffsets(){if(!this.isValid||this.isOffsetFixed)return[this];let a=a_(this.c),b=this.zone.offset(a-864e5),c=this.zone.offset(a+864e5),d=this.zone.offset(a-6e4*b),e=this.zone.offset(a-6e4*c);if(d===e)return[this];let f=a-6e4*d,g=a-6e4*e,h=cD(f,d),i=cD(g,e);return h.hour===i.hour&&h.minute===i.minute&&h.second===i.second&&h.millisecond===i.millisecond?[cB(this,{ts:f}),cB(this,{ts:g})]:[this]}get isInLeapYear(){return aY(this.year)}get daysInMonth(){return a$(this.year,this.month)}get daysInYear(){return this.isValid?aZ(this.year):NaN}get weeksInWeekYear(){return this.isValid?a1(this.weekYear):NaN}get weeksInLocalWeekYear(){return this.isValid?a1(this.localWeekYear,this.loc.getMinDaysInFirstWeek(),this.loc.getStartOfWeek()):NaN}resolvedLocaleOptions(a={}){let{locale:b,numberingSystem:c,calendar:d}=bo.create(this.loc.clone(a),a).resolvedOptions(this);return{locale:b,numberingSystem:c,outputCalendar:d}}toUTC(a=0,b={}){return this.setZone(af.instance(a),b)}toLocal(){return this.setZone(av.defaultZone)}setZone(a,{keepLocalTime:b=!1,keepCalendarTime:c=!1}={}){if((a=ah(a,av.defaultZone)).equals(this.zone))return this;{if(!a.isValid)return cV.invalid(cy(a));let e=this.ts;if(b||c){var d;let b=a.offset(this.ts),c=this.toObject();[e]=(d=a,cC(a_(c),b,d))}return cB(this,{ts:e,zone:a})}}reconfigure({locale:a,numberingSystem:b,outputCalendar:c}={}){return cB(this,{loc:this.loc.clone({locale:a,numberingSystem:b,outputCalendar:c})})}setLocale(a){return this.reconfigure({locale:a})}set(a){var b,c,d;let e;if(!this.isValid)return this;let f=a6(a,cQ),{minDaysInFirstWeek:g,startOfWeek:i}=aH(f,this.loc),j=!aK(f.weekYear)||!aK(f.weekNumber)||!aK(f.weekday),k=!aK(f.ordinal),l=!aK(f.year),m=!aK(f.month)||!aK(f.day),n=f.weekYear||f.weekNumber;if((l||m||k)&&n)throw new h("Can't mix weekYear/weekNumber units with year/month/day or ordinals");if(m&&k)throw new h("Can't mix ordinal dates with month/day");j?e=aE({...aD(this.c,g,i),...f},g,i):aK(f.ordinal)?(e={...this.toObject(),...f},aK(f.day)&&(e.day=Math.min(a$(e.year,e.month),e.day))):e=aG({...aF(this.c),...f});let[o,p]=(b=e,c=this.o,d=this.zone,cC(a_(b),c,d));return cB(this,{ts:o,o:p})}plus(a){return this.isValid?cB(this,cE(this,cd.fromDurationLike(a))):this}minus(a){return this.isValid?cB(this,cE(this,cd.fromDurationLike(a).negate())):this}startOf(a,{useLocaleWeeks:b=!1}={}){if(!this.isValid)return this;let c={},d=cd.normalizeUnit(a);switch(d){case"years":c.month=1;case"quarters":case"months":c.day=1;case"weeks":case"days":c.hour=0;case"hours":c.minute=0;case"minutes":c.second=0;case"seconds":c.millisecond=0}if("weeks"===d)if(b){let a=this.loc.getStartOfWeek(),{weekday:b}=this;b<a&&(c.weekNumber=this.weekNumber-1),c.weekday=a}else c.weekday=1;return"quarters"===d&&(c.month=(Math.ceil(this.month/3)-1)*3+1),this.set(c)}endOf(a,b){return this.isValid?this.plus({[a]:1}).startOf(a,b).minus(1):this}toFormat(a,b={}){return this.isValid?bo.create(this.loc.redefaultToEN(b)).formatDateTimeFromString(this,a):cx}toLocaleString(a=o,b={}){return this.isValid?bo.create(this.loc.clone(b),a).formatDateTime(this):cx}toLocaleParts(a={}){return this.isValid?bo.create(this.loc.clone(a),a).formatDateTimeParts(this):[]}toISO({format:a="extended",suppressSeconds:b=!1,suppressMilliseconds:c=!1,includeOffset:d=!0,extendedZone:e=!1,precision:f="milliseconds"}={}){if(!this.isValid)return null;f=cP(f);let g="extended"===a,h=cH(this,g,f);return cM.indexOf(f)>=3&&(h+="T"),h+=cI(this,g,b,c,d,e,f)}toISODate({format:a="extended",precision:b="day"}={}){return this.isValid?cH(this,"extended"===a,cP(b)):null}toISOWeekDate(){return cG(this,"kkkk-'W'WW-c")}toISOTime({suppressMilliseconds:a=!1,suppressSeconds:b=!1,includeOffset:c=!0,includePrefix:d=!1,extendedZone:e=!1,format:f="extended",precision:g="milliseconds"}={}){return this.isValid?(g=cP(g),(d&&cM.indexOf(g)>=3?"T":"")+cI(this,"extended"===f,b,a,c,e,g)):null}toRFC2822(){return cG(this,"EEE, dd LLL yyyy HH:mm:ss ZZZ",!1)}toHTTP(){return cG(this.toUTC(),"EEE, dd LLL yyyy HH:mm:ss 'GMT'")}toSQLDate(){return this.isValid?cH(this,!0):null}toSQLTime({includeOffset:a=!0,includeZone:b=!1,includeOffsetSpace:c=!0}={}){let d="HH:mm:ss.SSS";return(b||a)&&(c&&(d+=" "),b?d+="z":a&&(d+="ZZ")),cG(this,d,!0)}toSQL(a={}){return this.isValid?`${this.toSQLDate()} ${this.toSQLTime(a)}`:null}toString(){return this.isValid?this.toISO():cx}[Symbol.for("nodejs.util.inspect.custom")](){return this.isValid?`DateTime { ts: ${this.toISO()}, zone: ${this.zone.name}, locale: ${this.locale} }`:`DateTime { Invalid, reason: ${this.invalidReason} }`}valueOf(){return this.toMillis()}toMillis(){return this.isValid?this.ts:NaN}toSeconds(){return this.isValid?this.ts/1e3:NaN}toUnixInteger(){return this.isValid?Math.floor(this.ts/1e3):NaN}toJSON(){return this.toISO()}toBSON(){return this.toJSDate()}toObject(a={}){if(!this.isValid)return{};let b={...this.c};return a.includeConfig&&(b.outputCalendar=this.outputCalendar,b.numberingSystem=this.loc.numberingSystem,b.locale=this.loc.locale),b}toJSDate(){return new Date(this.isValid?this.ts:NaN)}diff(a,b="milliseconds",c={}){if(!this.isValid||!a.isValid)return cd.invalid("created by diffing an invalid DateTime");let d={locale:this.locale,numberingSystem:this.numberingSystem,...c},e=(Array.isArray(b)?b:[b]).map(cd.normalizeUnit),f=a.valueOf()>this.valueOf(),g=function(a,b,c,d){let[e,f,g,h]=function(a,b,c){let d,e,f={},g=a;for(let[h,i]of[["years",(a,b)=>b.year-a.year],["quarters",(a,b)=>b.quarter-a.quarter+(b.year-a.year)*4],["months",(a,b)=>b.month-a.month+(b.year-a.year)*12],["weeks",(a,b)=>{let c=ch(a,b);return(c-c%7)/7}],["days",ch]])c.indexOf(h)>=0&&(d=h,f[h]=i(a,b),(e=g.plus(f))>b?(f[h]--,(a=g.plus(f))>b&&(e=a,f[h]--,a=g.plus(f))):a=e);return[a,f,e,d]}(a,b,c),i=b-e,j=c.filter(a=>["hours","minutes","seconds","milliseconds"].indexOf(a)>=0);0===j.length&&(g<b&&(g=e.plus({[h]:1})),g!==e&&(f[h]=(f[h]||0)+i/(g-e)));let k=cd.fromObject(f,d);return j.length>0?cd.fromMillis(i,d).shiftTo(...j).plus(k):k}(f?this:a,f?a:this,e,d);return f?g.negate():g}diffNow(a="milliseconds",b={}){return this.diff(cV.now(),a,b)}until(a){return this.isValid?cf.fromDateTimes(this,a):this}hasSame(a,b,c){if(!this.isValid)return!1;let d=a.valueOf(),e=this.setZone(a.zone,{keepLocalTime:!0});return e.startOf(b,c)<=d&&d<=e.endOf(b,c)}equals(a){return this.isValid&&a.isValid&&this.valueOf()===a.valueOf()&&this.zone.equals(a.zone)&&this.loc.equals(a.loc)}toRelative(a={}){if(!this.isValid)return null;let b=a.base||cV.fromObject({},{zone:this.zone}),c=a.padding?this<b?-a.padding:a.padding:0,d=["years","months","days","hours","minutes","seconds"],e=a.unit;return Array.isArray(a.unit)&&(d=a.unit,e=void 0),cS(b,this.plus(c),{...a,numeric:"always",units:d,unit:e})}toRelativeCalendar(a={}){return this.isValid?cS(a.base||cV.fromObject({},{zone:this.zone}),this,{...a,numeric:"auto",units:["years","months","days"],calendary:!0}):null}static min(...a){if(!a.every(cV.isDateTime))throw new j("min requires all arguments be DateTimes");return aP(a,a=>a.valueOf(),Math.min)}static max(...a){if(!a.every(cV.isDateTime))throw new j("max requires all arguments be DateTimes");return aP(a,a=>a.valueOf(),Math.max)}static fromFormatExplain(a,b,c={}){let{locale:d=null,numberingSystem:e=null}=c;return cv(ad.fromOpts({locale:d,numberingSystem:e,defaultToEN:!0}),a,b)}static fromStringExplain(a,b,c={}){return cV.fromFormatExplain(a,b,c)}static buildFormatParser(a,b={}){let{locale:c=null,numberingSystem:d=null}=b;return new cu(ad.fromOpts({locale:c,numberingSystem:d,defaultToEN:!0}),a)}static fromFormatParser(a,b,c={}){if(aK(a)||aK(b))throw new j("fromFormatParser requires an input string and a format parser");let{locale:d=null,numberingSystem:e=null}=c,f=ad.fromOpts({locale:d,numberingSystem:e,defaultToEN:!0});if(!f.equals(b.locale))throw new j(`fromFormatParser called with a locale of ${f}, but the format parser was created for ${b.locale}`);let{result:g,zone:h,specificOffset:i,invalidReason:k}=b.explainFromTokens(a);return k?cV.invalid(k):cF(g,h,c,`format ${b.format}`,a,i)}static get DATE_SHORT(){return o}static get DATE_MED(){return p}static get DATE_MED_WITH_WEEKDAY(){return q}static get DATE_FULL(){return r}static get DATE_HUGE(){return s}static get TIME_SIMPLE(){return t}static get TIME_WITH_SECONDS(){return u}static get TIME_WITH_SHORT_OFFSET(){return v}static get TIME_WITH_LONG_OFFSET(){return w}static get TIME_24_SIMPLE(){return x}static get TIME_24_WITH_SECONDS(){return y}static get TIME_24_WITH_SHORT_OFFSET(){return z}static get TIME_24_WITH_LONG_OFFSET(){return A}static get DATETIME_SHORT(){return B}static get DATETIME_SHORT_WITH_SECONDS(){return C}static get DATETIME_MED(){return D}static get DATETIME_MED_WITH_SECONDS(){return E}static get DATETIME_MED_WITH_WEEKDAY(){return F}static get DATETIME_FULL(){return G}static get DATETIME_FULL_WITH_SECONDS(){return H}static get DATETIME_HUGE(){return I}static get DATETIME_HUGE_WITH_SECONDS(){return J}}function cW(a){if(cV.isDateTime(a))return a;if(a&&a.valueOf&&aL(a.valueOf()))return cV.fromJSDate(a);if(a&&"object"==typeof a)return cV.fromObject(a);throw new j(`Unknown datetime argument: ${a}, of type ${typeof a}`)}b.DateTime=cV,b.Duration=cd,b.FixedOffsetZone=af,b.IANAZone=Q,b.Info=cg,b.Interval=cf,b.InvalidZone=ag,b.Settings=av,b.SystemZone=M,b.VERSION="3.7.2",b.Zone=K},66131:(a,b,c)=>{"use strict";let d=c(70405),e=c(72988);a.exports=(a,b,c)=>{let f=null,g=null,h=null;try{h=new e(b,c)}catch(a){return null}return a.forEach(a=>{h.test(a)&&(!f||-1===g.compare(a))&&(g=new d(f=a,c))}),f}},66721:(a,b,c)=>{"use strict";Object.defineProperty(b,"__esModule",{value:!0}),b.isArguments=b.defaults=b.noop=void 0,b.defaults=c(49414),b.isArguments=c(76504),b.noop=function(){}},68115:(a,b,c)=>{"use strict";c.d(b,{u:()=>d});class d{static normalize(a){return Number.isFinite(a)?{type:"fixed",delay:a}:a||void 0}static calculate(a,b,c,e,f){if(a)return(function(a,b){if(a.type in d.builtinStrategies)return d.builtinStrategies[a.type](a.delay,a.jitter);if(b)return b;throw Error(`Unknown backoff strategy ${a.type}.
      If a custom backoff strategy is used, specify it when the queue is created.`)})(a,f)(b,a.type,c,e)}}d.builtinStrategies={fixed:function(a,b=0){return function(){return b>0?Math.floor(Math.random()*a*b+a*(1-b)):a}},exponential:function(a,b=0){return function(c){if(!(b>0))return Math.round(Math.pow(2,c-1)*a);{let d=Math.round(Math.pow(2,c-1)*a);return Math.floor(Math.random()*d*b+d*(1-b))}}}}},70359:(a,b,c)=>{"use strict";c.d(b,{r:()=>d});let d="5.70.4"},70380:(a,b,c)=>{"use strict";let d=c(70405);a.exports=(a,b,c,e,f)=>{"string"==typeof c&&(f=e,e=c,c=void 0);try{return new d(a instanceof d?a.version:a,c).inc(b,e,f).version}catch(a){return null}}},70405:(a,b,c)=>{"use strict";let d=c(55193),{MAX_LENGTH:e,MAX_SAFE_INTEGER:f}=c(57147),{safeRe:g,t:h}=c(35137),i=c(13714),{compareIdentifiers:j}=c(50954);class k{constructor(a,b){if(b=i(b),a instanceof k)if(!!b.loose===a.loose&&!!b.includePrerelease===a.includePrerelease)return a;else a=a.version;else if("string"!=typeof a)throw TypeError(`Invalid version. Must be a string. Got type "${typeof a}".`);if(a.length>e)throw TypeError(`version is longer than ${e} characters`);d("SemVer",a,b),this.options=b,this.loose=!!b.loose,this.includePrerelease=!!b.includePrerelease;let c=a.trim().match(b.loose?g[h.LOOSE]:g[h.FULL]);if(!c)throw TypeError(`Invalid Version: ${a}`);if(this.raw=a,this.major=+c[1],this.minor=+c[2],this.patch=+c[3],this.major>f||this.major<0)throw TypeError("Invalid major version");if(this.minor>f||this.minor<0)throw TypeError("Invalid minor version");if(this.patch>f||this.patch<0)throw TypeError("Invalid patch version");c[4]?this.prerelease=c[4].split(".").map(a=>{if(/^[0-9]+$/.test(a)){let b=+a;if(b>=0&&b<f)return b}return a}):this.prerelease=[],this.build=c[5]?c[5].split("."):[],this.format()}format(){return this.version=`${this.major}.${this.minor}.${this.patch}`,this.prerelease.length&&(this.version+=`-${this.prerelease.join(".")}`),this.version}toString(){return this.version}compare(a){if(d("SemVer.compare",this.version,this.options,a),!(a instanceof k)){if("string"==typeof a&&a===this.version)return 0;a=new k(a,this.options)}return a.version===this.version?0:this.compareMain(a)||this.comparePre(a)}compareMain(a){return(a instanceof k||(a=new k(a,this.options)),this.major<a.major)?-1:this.major>a.major?1:this.minor<a.minor?-1:this.minor>a.minor?1:this.patch<a.patch?-1:+(this.patch>a.patch)}comparePre(a){if(a instanceof k||(a=new k(a,this.options)),this.prerelease.length&&!a.prerelease.length)return -1;if(!this.prerelease.length&&a.prerelease.length)return 1;if(!this.prerelease.length&&!a.prerelease.length)return 0;let b=0;do{let c=this.prerelease[b],e=a.prerelease[b];if(d("prerelease compare",b,c,e),void 0===c&&void 0===e)return 0;if(void 0===e)return 1;if(void 0===c)return -1;else if(c===e)continue;else return j(c,e)}while(++b)}compareBuild(a){a instanceof k||(a=new k(a,this.options));let b=0;do{let c=this.build[b],e=a.build[b];if(d("build compare",b,c,e),void 0===c&&void 0===e)return 0;if(void 0===e)return 1;if(void 0===c)return -1;else if(c===e)continue;else return j(c,e)}while(++b)}inc(a,b,c){if(a.startsWith("pre")){if(!b&&!1===c)throw Error("invalid increment argument: identifier is empty");if(b){let a=`-${b}`.match(this.options.loose?g[h.PRERELEASELOOSE]:g[h.PRERELEASE]);if(!a||a[1]!==b)throw Error(`invalid identifier: ${b}`)}}switch(a){case"premajor":this.prerelease.length=0,this.patch=0,this.minor=0,this.major++,this.inc("pre",b,c);break;case"preminor":this.prerelease.length=0,this.patch=0,this.minor++,this.inc("pre",b,c);break;case"prepatch":this.prerelease.length=0,this.inc("patch",b,c),this.inc("pre",b,c);break;case"prerelease":0===this.prerelease.length&&this.inc("patch",b,c),this.inc("pre",b,c);break;case"release":if(0===this.prerelease.length)throw Error(`version ${this.raw} is not a prerelease`);this.prerelease.length=0;break;case"major":(0!==this.minor||0!==this.patch||0===this.prerelease.length)&&this.major++,this.minor=0,this.patch=0,this.prerelease=[];break;case"minor":(0!==this.patch||0===this.prerelease.length)&&this.minor++,this.patch=0,this.prerelease=[];break;case"patch":0===this.prerelease.length&&this.patch++,this.prerelease=[];break;case"pre":{let a=+!!Number(c);if(0===this.prerelease.length)this.prerelease=[a];else{let d=this.prerelease.length;for(;--d>=0;)"number"==typeof this.prerelease[d]&&(this.prerelease[d]++,d=-2);if(-1===d){if(b===this.prerelease.join(".")&&!1===c)throw Error("invalid increment argument: identifier already exists");this.prerelease.push(a)}}if(b){let d=[b,a];!1===c&&(d=[b]),0===j(this.prerelease[0],b)?isNaN(this.prerelease[1])&&(this.prerelease=d):this.prerelease=d}break}default:throw Error(`invalid increment argument: ${a}`)}return this.raw=this.format(),this.build.length&&(this.raw+=`+${this.build.join(".")}`),this}}a.exports=k},70537:(a,b)=>{"use strict";Object.defineProperty(b,"__esModule",{value:!0});let c=`-----BEGIN CERTIFICATE-----
MIIDTzCCAjegAwIBAgIJAKSVpiDswLcwMA0GCSqGSIb3DQEBBQUAMD4xFjAUBgNV
BAoMDUdhcmFudGlhIERhdGExJDAiBgNVBAMMG1NTTCBDZXJ0aWZpY2F0aW9uIEF1
dGhvcml0eTAeFw0xMzEwMDExMjE0NTVaFw0yMzA5MjkxMjE0NTVaMD4xFjAUBgNV
BAoMDUdhcmFudGlhIERhdGExJDAiBgNVBAMMG1NTTCBDZXJ0aWZpY2F0aW9uIEF1
dGhvcml0eTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALZqkh/DczWP
JnxnHLQ7QL0T4B4CDKWBKCcisriGbA6ZePWVNo4hfKQC6JrzfR+081NeD6VcWUiz
rmd+jtPhIY4c+WVQYm5PKaN6DT1imYdxQw7aqO5j2KUCEh/cznpLxeSHoTxlR34E
QwF28Wl3eg2vc5ct8LjU3eozWVk3gb7alx9mSA2SgmuX5lEQawl++rSjsBStemY2
BDwOpAMXIrdEyP/cVn8mkvi/BDs5M5G+09j0gfhyCzRWMQ7Hn71u1eolRxwVxgi3
TMn+/vTaFSqxKjgck6zuAYjBRPaHe7qLxHNr1So/Mc9nPy+3wHebFwbIcnUojwbp
4nctkWbjb2cCAwEAAaNQME4wHQYDVR0OBBYEFP1whtcrydmW3ZJeuSoKZIKjze3w
MB8GA1UdIwQYMBaAFP1whtcrydmW3ZJeuSoKZIKjze3wMAwGA1UdEwQFMAMBAf8w
DQYJKoZIhvcNAQEFBQADggEBAG2erXhwRAa7+ZOBs0B6X57Hwyd1R4kfmXcs0rta
lbPpvgULSiB+TCbf3EbhJnHGyvdCY1tvlffLjdA7HJ0PCOn+YYLBA0pTU/dyvrN6
Su8NuS5yubnt9mb13nDGYo1rnt0YRfxN+8DM3fXIVr038A30UlPX2Ou1ExFJT0MZ
uFKY6ZvLdI6/1cbgmguMlAhM+DhKyV6Sr5699LM3zqeI816pZmlREETYkGr91q7k
BpXJu/dtHaGxg1ZGu6w/PCsYGUcECWENYD4VQPd8N32JjOfu6vEgoEAwfPP+3oGp
Z4m3ewACcWOAenqflb+cQYC4PsF7qbXDmRaWrbKntOlZ3n0=
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
MIIGMTCCBBmgAwIBAgICEAAwDQYJKoZIhvcNAQELBQAwajELMAkGA1UEBhMCVVMx
CzAJBgNVBAgMAkNBMQswCQYDVQQHDAJDQTESMBAGA1UECgwJUmVkaXNMYWJzMS0w
KwYDVQQDDCRSZWRpc0xhYnMgUm9vdCBDZXJ0aWZpY2F0ZSBBdXRob3JpdHkwHhcN
MTgwMjI1MTUzNzM3WhcNMjgwMjIzMTUzNzM3WjBfMQswCQYDVQQGEwJVUzELMAkG
A1UECAwCQ0ExEjAQBgNVBAoMCVJlZGlzTGFiczEvMC0GA1UEAwwmUkNQIEludGVy
bWVkaWF0ZSBDZXJ0aWZpY2F0ZSBBdXRob3JpdHkwggIiMA0GCSqGSIb3DQEBAQUA
A4ICDwAwggIKAoICAQDf9dqbxc8Bq7Ctq9rWcxrGNKKHivqLAFpPq02yLPx6fsOv
Tq7GsDChAYBBc4v7Y2Ap9RD5Vs3dIhEANcnolf27QwrG9RMnnvzk8pCvp1o6zSU4
VuOE1W66/O1/7e2rVxyrnTcP7UgK43zNIXu7+tiAqWsO92uSnuMoGPGpeaUm1jym
hjWKtkAwDFSqvHY+XL5qDVBEjeUe+WHkYUg40cAXjusAqgm2hZt29c2wnVrxW25W
P0meNlzHGFdA2AC5z54iRiqj57dTfBTkHoBczQxcyw6hhzxZQ4e5I5zOKjXXEhZN
r0tA3YC14CTabKRus/JmZieyZzRgEy2oti64tmLYTqSlAD78pRL40VNoaSYetXLw
hhNsXCHgWaY6d5bLOc/aIQMAV5oLvZQKvuXAF1IDmhPA+bZbpWipp0zagf1P1H3s
UzsMdn2KM0ejzgotbtNlj5TcrVwpmvE3ktvUAuA+hi3FkVx1US+2Gsp5x4YOzJ7u
P1WPk6ShF0JgnJH2ILdj6kttTWwFzH17keSFICWDfH/+kM+k7Y1v3EXMQXE7y0T9
MjvJskz6d/nv+sQhY04xt64xFMGTnZjlJMzfQNi7zWFLTZnDD0lPowq7l3YiPoTT
t5Xky83lu0KZsZBo0WlWaDG00gLVdtRgVbcuSWxpi5BdLb1kRab66JptWjxwXQID
AQABo4HrMIHoMDoGA1UdHwQzMDEwL6AtoCuGKWh0dHBzOi8vcmwtY2Etc2VydmVy
LnJlZGlzbGFicy5jb20vdjEvY3JsMEYGCCsGAQUFBwEBBDowODA2BggrBgEFBQcw
AYYqaHR0cHM6Ly9ybC1jYS1zZXJ2ZXIucmVkaXNsYWJzLmNvbS92MS9vY3NwMB0G
A1UdDgQWBBQHar5OKvQUpP2qWt6mckzToeCOHDAfBgNVHSMEGDAWgBQi42wH6hM4
L2sujEvLM0/u8lRXTzASBgNVHRMBAf8ECDAGAQH/AgEAMA4GA1UdDwEB/wQEAwIB
hjANBgkqhkiG9w0BAQsFAAOCAgEAirEn/iTsAKyhd+pu2W3Z5NjCko4NPU0EYUbr
AP7+POK2rzjIrJO3nFYQ/LLuC7KCXG+2qwan2SAOGmqWst13Y+WHp44Kae0kaChW
vcYLXXSoGQGC8QuFSNUdaeg3RbMDYFT04dOkqufeWVccoHVxyTSg9eD8LZuHn5jw
7QDLiEECBmIJHk5Eeo2TAZrx4Yx6ufSUX5HeVjlAzqwtAqdt99uCJ/EL8bgpWbe+
XoSpvUv0SEC1I1dCAhCKAvRlIOA6VBcmzg5Am12KzkqTul12/VEFIgzqu0Zy2Jbc
AUPrYVu/+tOGXQaijy7YgwH8P8n3s7ZeUa1VABJHcxrxYduDDJBLZi+MjheUDaZ1
jQRHYevI2tlqeSBqdPKG4zBY5lS0GiAlmuze5oENt0P3XboHoZPHiqcK3VECgTVh
/BkJcuudETSJcZDmQ8YfoKfBzRQNg2sv/hwvUv73Ss51Sco8GEt2lD8uEdib1Q6z
zDT5lXJowSzOD5ZA9OGDjnSRL+2riNtKWKEqvtEG3VBJoBzu9GoxbAc7wIZLxmli
iF5a/Zf5X+UXD3s4TMmy6C4QZJpAA2egsSQCnraWO2ULhh7iXMysSkF/nzVfZn43
iqpaB8++9a37hWq14ZmOv0TJIDz//b2+KC4VFXWQ5W5QC6whsjT+OlG4p5ZYG0jo
616pxqo=
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
MIIFujCCA6KgAwIBAgIJAJ1aTT1lu2ScMA0GCSqGSIb3DQEBCwUAMGoxCzAJBgNV
BAYTAlVTMQswCQYDVQQIDAJDQTELMAkGA1UEBwwCQ0ExEjAQBgNVBAoMCVJlZGlz
TGFiczEtMCsGA1UEAwwkUmVkaXNMYWJzIFJvb3QgQ2VydGlmaWNhdGUgQXV0aG9y
aXR5MB4XDTE4MDIyNTE1MjA0MloXDTM4MDIyMDE1MjA0MlowajELMAkGA1UEBhMC
VVMxCzAJBgNVBAgMAkNBMQswCQYDVQQHDAJDQTESMBAGA1UECgwJUmVkaXNMYWJz
MS0wKwYDVQQDDCRSZWRpc0xhYnMgUm9vdCBDZXJ0aWZpY2F0ZSBBdXRob3JpdHkw
ggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoICAQDLEjXy7YrbN5Waau5cd6g1
G5C2tMmeTpZ0duFAPxNU4oE3RHS5gGiok346fUXuUxbZ6QkuzeN2/2Z+RmRcJhQY
Dm0ZgdG4x59An1TJfnzKKoWj8ISmoHS/TGNBdFzXV7FYNLBuqZouqePI6ReC6Qhl
pp45huV32Q3a6IDrrvx7Wo5ZczEQeFNbCeCOQYNDdTmCyEkHqc2AGo8eoIlSTutT
ULOC7R5gzJVTS0e1hesQ7jmqHjbO+VQS1NAL4/5K6cuTEqUl+XhVhPdLWBXJQ5ag
54qhX4v+ojLzeU1R/Vc6NjMvVtptWY6JihpgplprN0Yh2556ewcXMeturcKgXfGJ
xeYzsjzXerEjrVocX5V8BNrg64NlifzTMKNOOv4fVZszq1SIHR8F9ROrqiOdh8iC
JpUbLpXH9hWCSEO6VRMB2xJoKu3cgl63kF30s77x7wLFMEHiwsQRKxooE1UhgS9K
2sO4TlQ1eWUvFvHSTVDQDlGQ6zu4qjbOpb3Q8bQwoK+ai2alkXVR4Ltxe9QlgYK3
StsnPhruzZGA0wbXdpw0bnM+YdlEm5ffSTpNIfgHeaa7Dtb801FtA71ZlH7A6TaI
SIQuUST9EKmv7xrJyx0W1pGoPOLw5T029aTjnICSLdtV9bLwysrLhIYG5bnPq78B
cS+jZHFGzD7PUVGQD01nOQIDAQABo2MwYTAdBgNVHQ4EFgQUIuNsB+oTOC9rLoxL
yzNP7vJUV08wHwYDVR0jBBgwFoAUIuNsB+oTOC9rLoxLyzNP7vJUV08wDwYDVR0T
AQH/BAUwAwEB/zAOBgNVHQ8BAf8EBAMCAYYwDQYJKoZIhvcNAQELBQADggIBAHfg
z5pMNUAKdMzK1aS1EDdK9yKz4qicILz5czSLj1mC7HKDRy8cVADUxEICis++CsCu
rYOvyCVergHQLREcxPq4rc5Nq1uj6J6649NEeh4WazOOjL4ZfQ1jVznMbGy+fJm3
3Hoelv6jWRG9iqeJZja7/1s6YC6bWymI/OY1e4wUKeNHAo+Vger7MlHV+RuabaX+
hSJ8bJAM59NCM7AgMTQpJCncrcdLeceYniGy5Q/qt2b5mJkQVkIdy4TPGGB+AXDJ
D0q3I/JDRkDUFNFdeW0js7fHdsvCR7O3tJy5zIgEV/o/BCkmJVtuwPYOrw/yOlKj
TY/U7ATAx9VFF6/vYEOMYSmrZlFX+98L6nJtwDqfLB5VTltqZ4H/KBxGE3IRSt9l
FXy40U+LnXzhhW+7VBAvyYX8GEXhHkKU8Gqk1xitrqfBXY74xKgyUSTolFSfFVgj
mcM/X4K45bka+qpkj7Kfv/8D4j6aZekwhN2ly6hhC1SmQ8qjMjpG/mrWOSSHZFmf
ybu9iD2AYHeIOkshIl6xYIa++Q/00/vs46IzAbQyriOi0XxlSMMVtPx0Q3isp+ji
n8Mq9eOuxYOEQ4of8twUkUDd528iwGtEdwf0Q01UyT84S62N8AySl1ZBKXJz6W4F
UhWfa/HQYOAPDdEjNgnVwLI23b8t0TozyCWw7q8h
-----END CERTIFICATE-----

-----BEGIN CERTIFICATE-----
MIIEjzCCA3egAwIBAgIQe55B/ALCKJDZtdNT8kD6hTANBgkqhkiG9w0BAQsFADBM
MSAwHgYDVQQLExdHbG9iYWxTaWduIFJvb3QgQ0EgLSBSMzETMBEGA1UEChMKR2xv
YmFsU2lnbjETMBEGA1UEAxMKR2xvYmFsU2lnbjAeFw0yMjAxMjYxMjAwMDBaFw0y
NTAxMjYwMDAwMDBaMFgxCzAJBgNVBAYTAkJFMRkwFwYDVQQKExBHbG9iYWxTaWdu
IG52LXNhMS4wLAYDVQQDEyVHbG9iYWxTaWduIEF0bGFzIFIzIE9WIFRMUyBDQSAy
MDIyIFEyMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmGmg1LW9b7Lf
8zDD83yBDTEkt+FOxKJZqF4veWc5KZsQj9HfnUS2e5nj/E+JImlGPsQuoiosLuXD
BVBNAMcUFa11buFMGMeEMwiTmCXoXRrXQmH0qjpOfKgYc5gHG3BsRGaRrf7VR4eg
ofNMG9wUBw4/g/TT7+bQJdA4NfE7Y4d5gEryZiBGB/swaX6Jp/8MF4TgUmOWmalK
dZCKyb4sPGQFRTtElk67F7vU+wdGcrcOx1tDcIB0ncjLPMnaFicagl+daWGsKqTh
counQb6QJtYHa91KvCfKWocMxQ7OIbB5UARLPmC4CJ1/f8YFm35ebfzAeULYdGXu
jE9CLor0OwIDAQABo4IBXzCCAVswDgYDVR0PAQH/BAQDAgGGMB0GA1UdJQQWMBQG
CCsGAQUFBwMBBggrBgEFBQcDAjASBgNVHRMBAf8ECDAGAQH/AgEAMB0GA1UdDgQW
BBSH5Zq7a7B/t95GfJWkDBpA8HHqdjAfBgNVHSMEGDAWgBSP8Et/qC5FJK5NUPpj
move4t0bvDB7BggrBgEFBQcBAQRvMG0wLgYIKwYBBQUHMAGGImh0dHA6Ly9vY3Nw
Mi5nbG9iYWxzaWduLmNvbS9yb290cjMwOwYIKwYBBQUHMAKGL2h0dHA6Ly9zZWN1
cmUuZ2xvYmFsc2lnbi5jb20vY2FjZXJ0L3Jvb3QtcjMuY3J0MDYGA1UdHwQvMC0w
K6ApoCeGJWh0dHA6Ly9jcmwuZ2xvYmFsc2lnbi5jb20vcm9vdC1yMy5jcmwwIQYD
VR0gBBowGDAIBgZngQwBAgIwDAYKKwYBBAGgMgoBAjANBgkqhkiG9w0BAQsFAAOC
AQEAKRic9/f+nmhQU/wz04APZLjgG5OgsuUOyUEZjKVhNGDwxGTvKhyXGGAMW2B/
3bRi+aElpXwoxu3pL6fkElbX3B0BeS5LoDtxkyiVEBMZ8m+sXbocwlPyxrPbX6mY
0rVIvnuUeBH8X0L5IwfpNVvKnBIilTbcebfHyXkPezGwz7E1yhUULjJFm2bt0SdX
y+4X/WeiiYIv+fTVgZZgl+/2MKIsu/qdBJc3f3TvJ8nz+Eax1zgZmww+RSQWeOj3
15Iw6Z5FX+NwzY/Ab+9PosR5UosSeq+9HhtaxZttXG1nVh+avYPGYddWmiMT90J5
ZgKnO/Fx2hBgTxhOTMYaD312kg==
-----END CERTIFICATE-----

-----BEGIN CERTIFICATE-----
MIIDXzCCAkegAwIBAgILBAAAAAABIVhTCKIwDQYJKoZIhvcNAQELBQAwTDEgMB4G
A1UECxMXR2xvYmFsU2lnbiBSb290IENBIC0gUjMxEzARBgNVBAoTCkdsb2JhbFNp
Z24xEzARBgNVBAMTCkdsb2JhbFNpZ24wHhcNMDkwMzE4MTAwMDAwWhcNMjkwMzE4
MTAwMDAwWjBMMSAwHgYDVQQLExdHbG9iYWxTaWduIFJvb3QgQ0EgLSBSMzETMBEG
A1UEChMKR2xvYmFsU2lnbjETMBEGA1UEAxMKR2xvYmFsU2lnbjCCASIwDQYJKoZI
hvcNAQEBBQADggEPADCCAQoCggEBAMwldpB5BngiFvXAg7aEyiie/QV2EcWtiHL8
RgJDx7KKnQRfJMsuS+FggkbhUqsMgUdwbN1k0ev1LKMPgj0MK66X17YUhhB5uzsT
gHeMCOFJ0mpiLx9e+pZo34knlTifBtc+ycsmWQ1z3rDI6SYOgxXG71uL0gRgykmm
KPZpO/bLyCiR5Z2KYVc3rHQU3HTgOu5yLy6c+9C7v/U9AOEGM+iCK65TpjoWc4zd
QQ4gOsC0p6Hpsk+QLjJg6VfLuQSSaGjlOCZgdbKfd/+RFO+uIEn8rUAVSNECMWEZ
XriX7613t2Saer9fwRPvm2L7DWzgVGkWqQPabumDk3F2xmmFghcCAwEAAaNCMEAw
DgYDVR0PAQH/BAQDAgEGMA8GA1UdEwEB/wQFMAMBAf8wHQYDVR0OBBYEFI/wS3+o
LkUkrk1Q+mOai97i3Ru8MA0GCSqGSIb3DQEBCwUAA4IBAQBLQNvAUKr+yAzv95ZU
RUm7lgAJQayzE4aGKAczymvmdLm6AC2upArT9fHxD4q/c2dKg8dEe3jgr25sbwMp
jjM5RcOO5LlXbKr8EpbsU8Yt5CRsuZRj+9xTaGdWPoO4zzUhw8lo/s7awlOqzJCK
6fBdRoyV3XpYKBovHd7NADdBj+1EbddTKJd+82cEHhXXipa0095MJ6RMG3NzdvQX
mcIfeg7jLQitChws/zyrVQ4PkX4268NXSb7hLi18YIvDQVETI53O9zJrlAGomecs
Mx86OyXShkDOOyyGeMlhLxS67ttVb9+E7gUJTb0o2HLO02JQZR7rkpeDMdmztcpH
WD9f
-----END CERTIFICATE-----`;b.default={RedisCloudFixed:{ca:c},RedisCloudFlexible:{ca:c}}},70977:(a,b,c)=>{"use strict";var d=c(15955),e=c(23597);function f(a,b){this._options=b,this._utc=b.utc||!1,this._tz=this._utc?"UTC":b.tz,this._currentDate=new d(b.currentDate,this._tz),this._startDate=b.startDate?new d(b.startDate,this._tz):null,this._endDate=b.endDate?new d(b.endDate,this._tz):null,this._isIterator=b.iterator||!1,this._hasIterated=!1,this._nthDayOfWeek=b.nthDayOfWeek||0,this.fields=f._freezeFields(a)}f.map=["second","minute","hour","dayOfMonth","month","dayOfWeek"],f.predefined={"@yearly":"0 0 1 1 *","@monthly":"0 0 1 * *","@weekly":"0 0 * * 0","@daily":"0 0 * * *","@hourly":"0 * * * *"},f.constraints=[{min:0,max:59,chars:[]},{min:0,max:59,chars:[]},{min:0,max:23,chars:[]},{min:1,max:31,chars:["L"]},{min:1,max:12,chars:[]},{min:0,max:7,chars:["L"]}],f.daysInMonth=[31,29,31,30,31,30,31,31,30,31,30,31],f.aliases={month:{jan:1,feb:2,mar:3,apr:4,may:5,jun:6,jul:7,aug:8,sep:9,oct:10,nov:11,dec:12},dayOfWeek:{sun:0,mon:1,tue:2,wed:3,thu:4,fri:5,sat:6}},f.parseDefaults=["0","*","*","*","*","*"],f.standardValidCharacters=/^[,*\d/-]+$/,f.dayOfWeekValidCharacters=/^[?,*\dL#/-]+$/,f.dayOfMonthValidCharacters=/^[?,*\dL/-]+$/,f.validCharacters={second:f.standardValidCharacters,minute:f.standardValidCharacters,hour:f.standardValidCharacters,dayOfMonth:f.dayOfMonthValidCharacters,month:f.standardValidCharacters,dayOfWeek:f.dayOfWeekValidCharacters},f._isValidConstraintChar=function(a,b){return"string"==typeof b&&a.chars.some(function(a){return b.indexOf(a)>-1})},f._parseField=function(a,b,c){switch(a){case"month":case"dayOfWeek":var d=f.aliases[a];b=b.replace(/[a-z]{3}/gi,function(a){if(void 0!==d[a=a.toLowerCase()])return d[a];throw Error('Validation error, cannot resolve alias "'+a+'"')})}if(!f.validCharacters[a].test(b))throw Error("Invalid characters, got value: "+b);function e(a){var b=a.split("/");if(b.length>2)throw Error("Invalid repeat: "+a);return b.length>1?(b[0]==+b[0]&&(b=[b[0]+"-"+c.max,b[1]]),g(b[0],b[b.length-1])):g(a,1)}function g(b,d){var e=[],f=b.split("-");if(f.length>1){if(f.length<2)return+b;if(!f[0].length){if(!f[1].length)throw Error("Invalid range: "+b);return+b}var g=+f[0],h=+f[1];if(Number.isNaN(g)||Number.isNaN(h)||g<c.min||h>c.max)throw Error("Constraint error, got range "+g+"-"+h+" expected range "+c.min+"-"+c.max);if(g>h)throw Error("Invalid range: "+b);var i=+d;if(Number.isNaN(i)||i<=0)throw Error("Constraint error, cannot repeat at every "+i+" time.");"dayOfWeek"===a&&h%7==0&&e.push(0);for(var j=g;j<=h;j++)-1===e.indexOf(j)&&i>0&&i%d==0?(i=1,e.push(j)):i++;return e}return Number.isNaN(+b)?b:+b}return -1!==b.indexOf("*")?b=b.replace(/\*/g,c.min+"-"+c.max):-1!==b.indexOf("?")&&(b=b.replace(/\?/g,c.min+"-"+c.max)),function(b){var d=[];function g(b){if(b instanceof Array)for(var e=0,g=b.length;e<g;e++){var h=b[e];if(f._isValidConstraintChar(c,h)){d.push(h);continue}if("number"!=typeof h||Number.isNaN(h)||h<c.min||h>c.max)throw Error("Constraint error, got value "+h+" expected range "+c.min+"-"+c.max);d.push(h)}else{if(f._isValidConstraintChar(c,b))return void d.push(b);var i=+b;if(Number.isNaN(i)||i<c.min||i>c.max)throw Error("Constraint error, got value "+b+" expected range "+c.min+"-"+c.max);"dayOfWeek"===a&&(i%=7),d.push(i)}}var h=b.split(",");if(!h.every(function(a){return a.length>0}))throw Error("Invalid list value format");if(h.length>1)for(var i=0,j=h.length;i<j;i++)g(e(h[i]));else g(e(b));return d.sort(f._sortCompareFn),d}(b)},f._sortCompareFn=function(a,b){var c="number"==typeof a,d="number"==typeof b;return c&&d?a-b:!c&&d?1:c&&!d?-1:a.localeCompare(b)},f._handleMaxDaysInMonth=function(a){if(1===a.month.length){var b=f.daysInMonth[a.month[0]-1];if(a.dayOfMonth[0]>b)throw Error("Invalid explicit day of month definition");return a.dayOfMonth.filter(function(a){return"L"===a||a<=b}).sort(f._sortCompareFn)}},f._freezeFields=function(a){for(var b=0,c=f.map.length;b<c;++b){var d=f.map[b],e=a[d];a[d]=Object.freeze(e)}return Object.freeze(a)},f.prototype._applyTimezoneShift=function(a,b,c){if("Month"===c||"Day"===c){var d=a.getTime();a[b+c](),d===a.getTime()&&(0===a.getMinutes()&&0===a.getSeconds()?a.addHour():59===a.getMinutes()&&59===a.getSeconds()&&a.subtractHour())}else{var e=a.getHours();a[b+c]();var f=a.getHours(),g=f-e;2===g?24!==this.fields.hour.length&&(this._dstStart=f):0===g&&0===a.getMinutes()&&0===a.getSeconds()&&24!==this.fields.hour.length&&(this._dstEnd=f)}},f.prototype._findSchedule=function(a){function b(a,b){for(var c=0,d=b.length;c<d;c++)if(b[c]>=a)return b[c]===a;return b[0]===a}function c(a){return a.length>0&&a.some(function(a){return"string"==typeof a&&a.indexOf("L")>=0})}for(var e=(a=a||!1)?"subtract":"add",g=new d(this._currentDate,this._tz),h=this._startDate,i=this._endDate,j=g.getTime(),k=0;k<1e4;){if(k++,a){if(h&&g.getTime()-h.getTime()<0)throw Error("Out of the timespan range")}else if(i&&i.getTime()-g.getTime()<0)throw Error("Out of the timespan range");var l=b(g.getDate(),this.fields.dayOfMonth);c(this.fields.dayOfMonth)&&(l=l||g.isLastDayOfMonth());var m=b(g.getDay(),this.fields.dayOfWeek);c(this.fields.dayOfWeek)&&(m=m||this.fields.dayOfWeek.some(function(a){if(!c([a]))return!1;var b=Number.parseInt(a[0])%7;if(Number.isNaN(b))throw Error("Invalid last weekday of the month expression: "+a);return g.getDay()===b&&g.isLastWeekdayOfMonth()}));var n=this.fields.dayOfMonth.length>=f.daysInMonth[g.getMonth()],o=this.fields.dayOfWeek.length===f.constraints[5].max-f.constraints[5].min+1,p=g.getHours();if(!l&&(!m||o)||!n&&o&&!l||n&&!o&&!m||this._nthDayOfWeek>0&&!function(a,b){if(b<6){if(8>a.getDate()&&1===b)return!0;var c=a.getDate()%7?1:0;return Math.floor((a.getDate()-a.getDate()%7)/7)+c===b}return!1}(g,this._nthDayOfWeek)){this._applyTimezoneShift(g,e,"Day");continue}if(!b(g.getMonth()+1,this.fields.month)){this._applyTimezoneShift(g,e,"Month");continue}if(b(p,this.fields.hour)){if(this._dstEnd===p&&!a){this._dstEnd=null,this._applyTimezoneShift(g,"add","Hour");continue}}else if(this._dstStart!==p){this._dstStart=null,this._applyTimezoneShift(g,e,"Hour");continue}else if(!b(p-1,this.fields.hour)){g[e+"Hour"]();continue}if(!b(g.getMinutes(),this.fields.minute)){this._applyTimezoneShift(g,e,"Minute");continue}if(!b(g.getSeconds(),this.fields.second)){this._applyTimezoneShift(g,e,"Second");continue}if(j===g.getTime()){"add"===e||0===g.getMilliseconds()?this._applyTimezoneShift(g,e,"Second"):g.setMilliseconds(0);continue}break}if(k>=1e4)throw Error("Invalid expression, loop limit exceeded");return this._currentDate=new d(g,this._tz),this._hasIterated=!0,g},f.prototype.next=function(){var a=this._findSchedule();return this._isIterator?{value:a,done:!this.hasNext()}:a},f.prototype.prev=function(){var a=this._findSchedule(!0);return this._isIterator?{value:a,done:!this.hasPrev()}:a},f.prototype.hasNext=function(){var a=this._currentDate,b=this._hasIterated;try{return this._findSchedule(),!0}catch(a){return!1}finally{this._currentDate=a,this._hasIterated=b}},f.prototype.hasPrev=function(){var a=this._currentDate,b=this._hasIterated;try{return this._findSchedule(!0),!0}catch(a){return!1}finally{this._currentDate=a,this._hasIterated=b}},f.prototype.iterate=function(a,b){var c=[];if(a>=0)for(var d=0,e=a;d<e;d++)try{var f=this.next();c.push(f),b&&b(f,d)}catch(a){break}else for(var d=0,e=a;d>e;d--)try{var f=this.prev();c.push(f),b&&b(f,d)}catch(a){break}return c},f.prototype.reset=function(a){this._currentDate=new d(a||this._options.currentDate)},f.prototype.stringify=function(a){for(var b=[],c=+!a,d=f.map.length;c<d;++c){var g=f.map[c],h=this.fields[g],i=f.constraints[c];"dayOfMonth"===g&&1===this.fields.month.length?i={min:1,max:f.daysInMonth[this.fields.month[0]-1]}:"dayOfWeek"===g&&(i={min:0,max:6},h=7===h[h.length-1]?h.slice(0,-1):h),b.push(e(h,i.min,i.max))}return b.join(" ")},f.parse=function(a,b){var c=this;return"function"==typeof b&&(b={}),function(a,b){b||(b={}),void 0===b.currentDate&&(b.currentDate=new d(void 0,c._tz)),f.predefined[a]&&(a=f.predefined[a]);var e=[],g=(a+"").trim().split(/\s+/);if(g.length>6)throw Error("Invalid cron expression");for(var h=f.map.length-g.length,i=0,j=f.map.length;i<j;++i){var k=f.map[i],l=g[g.length>j?i:i-h];if(i<h||!l)e.push(f._parseField(k,f.parseDefaults[i],f.constraints[i]));else{var m="dayOfWeek"===k?function(a){var c=a.split("#");if(c.length>1){var d=+c[c.length-1];if(/,/.test(a))throw Error("Constraint error, invalid dayOfWeek `#` and `,` special characters are incompatible");if(/\//.test(a))throw Error("Constraint error, invalid dayOfWeek `#` and `/` special characters are incompatible");if(/-/.test(a))throw Error("Constraint error, invalid dayOfWeek `#` and `-` special characters are incompatible");if(c.length>2||Number.isNaN(d)||d<1||d>5)throw Error("Constraint error, invalid dayOfWeek occurrence number (#)");return b.nthDayOfWeek=d,c[0]}return a}(l):l;e.push(f._parseField(k,m,f.constraints[i]))}}for(var n={},i=0,j=f.map.length;i<j;i++)n[f.map[i]]=e[i];var o=f._handleMaxDaysInMonth(n);return n.dayOfMonth=o||n.dayOfMonth,new f(n,b)}(a,b)},f.fieldsToExpression=function(a,b){for(var c={},d=0,e=f.map.length;d<e;++d){var g=f.map[d],h=a[g];!function(a,b,c){if(!b)throw Error("Validation error, Field "+a+" is missing");if(0===b.length)throw Error("Validation error, Field "+a+" contains no values");for(var d=0,e=b.length;d<e;d++){var g=b[d];if(!f._isValidConstraintChar(c,g)&&("number"!=typeof g||Number.isNaN(g)||g<c.min||g>c.max))throw Error("Constraint error, got value "+g+" expected range "+c.min+"-"+c.max)}}(g,h,f.constraints[d]);for(var i=[],j=-1;++j<h.length;)i[j]=h[j];if((h=i.sort(f._sortCompareFn).filter(function(a,b,c){return!b||a!==c[b-1]})).length!==i.length)throw Error("Validation error, Field "+g+" contains duplicate values");c[g]=h}var k=f._handleMaxDaysInMonth(c);return c.dayOfMonth=k||c.dayOfMonth,new f(c,b||{})},a.exports=f},71940:(a,b,c)=>{let d=c(83997),e=c(28354);b.init=function(a){a.inspectOpts={};let c=Object.keys(b.inspectOpts);for(let d=0;d<c.length;d++)a.inspectOpts[c[d]]=b.inspectOpts[c[d]]},b.log=function(...a){return process.stderr.write(e.formatWithOptions(b.inspectOpts,...a)+"\n")},b.formatArgs=function(c){let{namespace:d,useColors:e}=this;if(e){let b=this.color,e="\x1b[3"+(b<8?b:"8;5;"+b),f=`  ${e};1m${d} \u001B[0m`;c[0]=f+c[0].split("\n").join("\n"+f),c.push(e+"m+"+a.exports.humanize(this.diff)+"\x1b[0m")}else c[0]=(b.inspectOpts.hideDate?"":new Date().toISOString()+" ")+d+" "+c[0]},b.save=function(a){a?process.env.DEBUG=a:delete process.env.DEBUG},b.load=function(){return process.env.DEBUG},b.useColors=function(){return"colors"in b.inspectOpts?!!b.inspectOpts.colors:d.isatty(process.stderr.fd)},b.destroy=e.deprecate(()=>{},"Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."),b.colors=[6,2,3,4,5,1];try{let a=c(26274);a&&(a.stderr||a).level>=2&&(b.colors=[20,21,26,27,32,33,38,39,40,41,42,43,44,45,56,57,62,63,68,69,74,75,76,77,78,79,80,81,92,93,98,99,112,113,128,129,134,135,148,149,160,161,162,163,164,165,166,167,168,169,170,171,172,173,178,179,184,185,196,197,198,199,200,201,202,203,204,205,206,207,208,209,214,215,220,221])}catch(a){}b.inspectOpts=Object.keys(process.env).filter(a=>/^debug_/i.test(a)).reduce((a,b)=>{let c=b.substring(6).toLowerCase().replace(/_([a-z])/g,(a,b)=>b.toUpperCase()),d=process.env[b];return d=!!/^(yes|on|true|enabled)$/i.test(d)||!/^(no|off|false|disabled)$/i.test(d)&&("null"===d?null:Number(d)),a[c]=d,a},{}),a.exports=c(92289)(b);let{formatters:f}=a.exports;f.o=function(a){return this.inspectOpts.colors=this.useColors,e.inspect(a,this.inspectOpts).split("\n").map(a=>a.trim()).join(" ")},f.O=function(a){return this.inspectOpts.colors=this.useColors,e.inspect(a,this.inspectOpts)}},72328:(a,b,c)=>{"use strict";Object.defineProperty(b,"__esModule",{value:!0});let d=c(22013),e=c(95422),f=c(59435),g=c(73743),h=(0,e.Debug)("dataHandler");class i{constructor(a,b){this.redis=a;let c=new f({stringNumbers:b.stringNumbers,returnBuffers:!0,returnError:a=>{this.returnError(a)},returnFatalError:a=>{this.returnFatalError(a)},returnReply:a=>{this.returnReply(a)}});a.stream.prependListener("data",a=>{c.execute(a)}),a.stream.resume()}returnFatalError(a){a.message+=". Please report this.",this.redis.recoverFromFatalError(a,a,{offlineQueue:!1})}returnError(a){let b=this.shiftCommand(a);if(b){if(a.command={name:b.command.name,args:b.command.args},"ssubscribe"==b.command.name&&a.message.includes("MOVED"))return void this.redis.emit("moved");this.redis.handleReconnection(a,b)}}returnReply(a){if(this.handleMonitorReply(a)||this.handleSubscriberReply(a))return;let b=this.shiftCommand(a);b&&(d.default.checkFlag("ENTER_SUBSCRIBER_MODE",b.command.name)?(this.redis.condition.subscriber=new g.default,this.redis.condition.subscriber.add(b.command.name,a[1].toString()),k(b.command,a[2])||this.redis.commandQueue.unshift(b)):d.default.checkFlag("EXIT_SUBSCRIBER_MODE",b.command.name)?l(b.command,a[2])||this.redis.commandQueue.unshift(b):b.command.resolve(a))}handleSubscriberReply(a){if(!this.redis.condition.subscriber)return!1;let b=Array.isArray(a)?a[0].toString():null;switch(h('receive reply "%s" in subscriber mode',b),b){case"message":this.redis.listeners("message").length>0&&this.redis.emit("message",a[1].toString(),a[2]?a[2].toString():""),this.redis.emit("messageBuffer",a[1],a[2]);break;case"pmessage":{let b=a[1].toString();this.redis.listeners("pmessage").length>0&&this.redis.emit("pmessage",b,a[2].toString(),a[3].toString()),this.redis.emit("pmessageBuffer",b,a[2],a[3]);break}case"smessage":this.redis.listeners("smessage").length>0&&this.redis.emit("smessage",a[1].toString(),a[2]?a[2].toString():""),this.redis.emit("smessageBuffer",a[1],a[2]);break;case"ssubscribe":case"subscribe":case"psubscribe":{let c=a[1].toString();this.redis.condition.subscriber.add(b,c);let d=this.shiftCommand(a);if(!d)return;k(d.command,a[2])||this.redis.commandQueue.unshift(d);break}case"sunsubscribe":case"unsubscribe":case"punsubscribe":{let c=a[1]?a[1].toString():null;c&&this.redis.condition.subscriber.del(b,c);let d=a[2];0===Number(d)&&(this.redis.condition.subscriber=!1);let e=this.shiftCommand(a);if(!e)return;l(e.command,d)||this.redis.commandQueue.unshift(e);break}default:{let b=this.shiftCommand(a);if(!b)return;b.command.resolve(a)}}return!0}handleMonitorReply(a){if("monitoring"!==this.redis.status)return!1;let b=a.toString();if("OK"===b)return!1;let c=b.indexOf(" "),d=b.slice(0,c),e=b.indexOf('"'),f=b.slice(e+1,-1).split('" "').map(a=>a.replace(/\\"/g,'"')),g=b.slice(c+2,e-2).split(" ");return this.redis.emit("monitor",d,f,g[1],g[0]),!0}shiftCommand(a){let b=this.redis.commandQueue.shift();if(!b){let b=Error("Command queue state error. If you can reproduce this, please report it."+(a instanceof Error?` Last error: ${a.message}`:` Last reply: ${a.toString()}`));return this.redis.emit("error",b),null}return b}}b.default=i;let j=new WeakMap;function k(a,b){let c=j.has(a)?j.get(a):a.args.length;return(c-=1)<=0?(a.resolve(b),j.delete(a),!0):(j.set(a,c),!1)}function l(a,b){let c=j.has(a)?j.get(a):a.args.length;return 0===c?0===Number(b)&&(j.delete(a),a.resolve(b),!0):(c-=1)<=0?(a.resolve(b),!0):(j.set(a,c),!1)}},72988:(a,b,c)=>{"use strict";let d=/\s+/g;class e{constructor(a,b){if(b=g(b),a instanceof e)if(!!b.loose===a.loose&&!!b.includePrerelease===a.includePrerelease)return a;else return new e(a.raw,b);if(a instanceof h)return this.raw=a.value,this.set=[[a]],this.formatted=void 0,this;if(this.options=b,this.loose=!!b.loose,this.includePrerelease=!!b.includePrerelease,this.raw=a.trim().replace(d," "),this.set=this.raw.split("||").map(a=>this.parseRange(a.trim())).filter(a=>a.length),!this.set.length)throw TypeError(`Invalid SemVer Range: ${this.raw}`);if(this.set.length>1){let a=this.set[0];if(this.set=this.set.filter(a=>!r(a[0])),0===this.set.length)this.set=[a];else if(this.set.length>1){for(let a of this.set)if(1===a.length&&s(a[0])){this.set=[a];break}}}this.formatted=void 0}get range(){if(void 0===this.formatted){this.formatted="";for(let a=0;a<this.set.length;a++){a>0&&(this.formatted+="||");let b=this.set[a];for(let a=0;a<b.length;a++)a>0&&(this.formatted+=" "),this.formatted+=b[a].toString().trim()}}return this.formatted}format(){return this.range}toString(){return this.range}parseRange(a){let b=((this.options.includePrerelease&&p)|(this.options.loose&&q))+":"+a,c=f.get(b);if(c)return c;let d=this.options.loose,e=d?k[l.HYPHENRANGELOOSE]:k[l.HYPHENRANGE];i("hyphen replace",a=a.replace(e,E(this.options.includePrerelease))),i("comparator trim",a=a.replace(k[l.COMPARATORTRIM],m)),i("tilde trim",a=a.replace(k[l.TILDETRIM],n)),i("caret trim",a=a.replace(k[l.CARETTRIM],o));let g=a.split(" ").map(a=>u(a,this.options)).join(" ").split(/\s+/).map(a=>D(a,this.options));d&&(g=g.filter(a=>(i("loose invalid filter",a,this.options),!!a.match(k[l.COMPARATORLOOSE])))),i("range list",g);let j=new Map;for(let a of g.map(a=>new h(a,this.options))){if(r(a))return[a];j.set(a.value,a)}j.size>1&&j.has("")&&j.delete("");let s=[...j.values()];return f.set(b,s),s}intersects(a,b){if(!(a instanceof e))throw TypeError("a Range is required");return this.set.some(c=>t(c,b)&&a.set.some(a=>t(a,b)&&c.every(c=>a.every(a=>c.intersects(a,b)))))}test(a){if(!a)return!1;if("string"==typeof a)try{a=new j(a,this.options)}catch(a){return!1}for(let b=0;b<this.set.length;b++)if(F(this.set[b],a,this.options))return!0;return!1}}a.exports=e;let f=new(c(87777)),g=c(13714),h=c(36317),i=c(55193),j=c(70405),{safeRe:k,t:l,comparatorTrimReplace:m,tildeTrimReplace:n,caretTrimReplace:o}=c(35137),{FLAG_INCLUDE_PRERELEASE:p,FLAG_LOOSE:q}=c(57147),r=a=>"<0.0.0-0"===a.value,s=a=>""===a.value,t=(a,b)=>{let c=!0,d=a.slice(),e=d.pop();for(;c&&d.length;)c=d.every(a=>e.intersects(a,b)),e=d.pop();return c},u=(a,b)=>(i("comp",a=a.replace(k[l.BUILD],""),b),i("caret",a=y(a,b)),i("tildes",a=w(a,b)),i("xrange",a=A(a,b)),i("stars",a=C(a,b)),a),v=a=>!a||"x"===a.toLowerCase()||"*"===a,w=(a,b)=>a.trim().split(/\s+/).map(a=>x(a,b)).join(" "),x=(a,b)=>{let c=b.loose?k[l.TILDELOOSE]:k[l.TILDE];return a.replace(c,(b,c,d,e,f)=>{let g;return i("tilde",a,b,c,d,e,f),v(c)?g="":v(d)?g=`>=${c}.0.0 <${+c+1}.0.0-0`:v(e)?g=`>=${c}.${d}.0 <${c}.${+d+1}.0-0`:f?(i("replaceTilde pr",f),g=`>=${c}.${d}.${e}-${f} <${c}.${+d+1}.0-0`):g=`>=${c}.${d}.${e} <${c}.${+d+1}.0-0`,i("tilde return",g),g})},y=(a,b)=>a.trim().split(/\s+/).map(a=>z(a,b)).join(" "),z=(a,b)=>{i("caret",a,b);let c=b.loose?k[l.CARETLOOSE]:k[l.CARET],d=b.includePrerelease?"-0":"";return a.replace(c,(b,c,e,f,g)=>{let h;return i("caret",a,b,c,e,f,g),v(c)?h="":v(e)?h=`>=${c}.0.0${d} <${+c+1}.0.0-0`:v(f)?h="0"===c?`>=${c}.${e}.0${d} <${c}.${+e+1}.0-0`:`>=${c}.${e}.0${d} <${+c+1}.0.0-0`:g?(i("replaceCaret pr",g),h="0"===c?"0"===e?`>=${c}.${e}.${f}-${g} <${c}.${e}.${+f+1}-0`:`>=${c}.${e}.${f}-${g} <${c}.${+e+1}.0-0`:`>=${c}.${e}.${f}-${g} <${+c+1}.0.0-0`):(i("no pr"),h="0"===c?"0"===e?`>=${c}.${e}.${f}${d} <${c}.${e}.${+f+1}-0`:`>=${c}.${e}.${f}${d} <${c}.${+e+1}.0-0`:`>=${c}.${e}.${f} <${+c+1}.0.0-0`),i("caret return",h),h})},A=(a,b)=>(i("replaceXRanges",a,b),a.split(/\s+/).map(a=>B(a,b)).join(" ")),B=(a,b)=>{a=a.trim();let c=b.loose?k[l.XRANGELOOSE]:k[l.XRANGE];return a.replace(c,(c,d,e,f,g,h)=>{i("xRange",a,c,d,e,f,g,h);let j=v(e),k=j||v(f),l=k||v(g);return"="===d&&l&&(d=""),h=b.includePrerelease?"-0":"",j?c=">"===d||"<"===d?"<0.0.0-0":"*":d&&l?(k&&(f=0),g=0,">"===d?(d=">=",k?(e=+e+1,f=0):f=+f+1,g=0):"<="===d&&(d="<",k?e=+e+1:f=+f+1),"<"===d&&(h="-0"),c=`${d+e}.${f}.${g}${h}`):k?c=`>=${e}.0.0${h} <${+e+1}.0.0-0`:l&&(c=`>=${e}.${f}.0${h} <${e}.${+f+1}.0-0`),i("xRange return",c),c})},C=(a,b)=>(i("replaceStars",a,b),a.trim().replace(k[l.STAR],"")),D=(a,b)=>(i("replaceGTE0",a,b),a.trim().replace(k[b.includePrerelease?l.GTE0PRE:l.GTE0],"")),E=a=>(b,c,d,e,f,g,h,i,j,k,l,m)=>(c=v(d)?"":v(e)?`>=${d}.0.0${a?"-0":""}`:v(f)?`>=${d}.${e}.0${a?"-0":""}`:g?`>=${c}`:`>=${c}${a?"-0":""}`,i=v(j)?"":v(k)?`<${+j+1}.0.0-0`:v(l)?`<${j}.${+k+1}.0-0`:m?`<=${j}.${k}.${l}-${m}`:a?`<${j}.${k}.${+l+1}-0`:`<=${i}`,`${c} ${i}`.trim()),F=(a,b,c)=>{for(let c=0;c<a.length;c++)if(!a[c].test(b))return!1;if(b.prerelease.length&&!c.includePrerelease){for(let c=0;c<a.length;c++)if(i(a[c].semver),a[c].semver!==h.ANY&&a[c].semver.prerelease.length>0){let d=a[c].semver;if(d.major===b.major&&d.minor===b.minor&&d.patch===b.patch)return!0}return!1}return!0}},73192:(a,b,c)=>{"use strict";Object.defineProperty(b,"__esModule",{value:!0}),b.print=b.ReplyError=b.SentinelIterator=b.SentinelConnector=b.AbstractConnector=b.Pipeline=b.ScanStream=b.Command=b.Cluster=b.Redis=b.default=void 0,b=a.exports=c(62007).default;var d=c(62007);Object.defineProperty(b,"default",{enumerable:!0,get:function(){return d.default}});var e=c(62007);Object.defineProperty(b,"Redis",{enumerable:!0,get:function(){return e.default}});var f=c(25757);Object.defineProperty(b,"Cluster",{enumerable:!0,get:function(){return f.default}});var g=c(22013);Object.defineProperty(b,"Command",{enumerable:!0,get:function(){return g.default}});var h=c(80755);Object.defineProperty(b,"ScanStream",{enumerable:!0,get:function(){return h.default}});var i=c(59408);Object.defineProperty(b,"Pipeline",{enumerable:!0,get:function(){return i.default}});var j=c(3192);Object.defineProperty(b,"AbstractConnector",{enumerable:!0,get:function(){return j.default}});var k=c(23337);Object.defineProperty(b,"SentinelConnector",{enumerable:!0,get:function(){return k.default}}),Object.defineProperty(b,"SentinelIterator",{enumerable:!0,get:function(){return k.SentinelIterator}}),b.ReplyError=c(17507).ReplyError,Object.defineProperty(b,"Promise",{get:()=>(console.warn("ioredis v5 does not support plugging third-party Promise library anymore. Native Promise will be used."),Promise),set(a){console.warn("ioredis v5 does not support plugging third-party Promise library anymore. Native Promise will be used.")}}),b.print=function(a,b){a?console.log("Error: "+a):console.log("Reply: "+b)}},73743:(a,b)=>{"use strict";Object.defineProperty(b,"__esModule",{value:!0});class c{constructor(){this.set={subscribe:{},psubscribe:{},ssubscribe:{}}}add(a,b){this.set[d(a)][b]=!0}del(a,b){delete this.set[d(a)][b]}channels(a){return Object.keys(this.set[d(a)])}isEmpty(){return 0===this.channels("subscribe").length&&0===this.channels("psubscribe").length&&0===this.channels("ssubscribe").length}}function d(a){return"unsubscribe"===a?"subscribe":"punsubscribe"===a?"psubscribe":"sunsubscribe"===a?"ssubscribe":a}b.default=c},74899:(a,b,c)=>{"use strict";Object.defineProperty(b,"__esModule",{value:!0});let d=c(94735),e=c(95422),f=c(28749),g=c(62007),h=(0,e.Debug)("cluster:connectionPool");class i extends d.EventEmitter{constructor(a){super(),this.redisOptions=a,this.nodes={all:{},master:{},slave:{}},this.specifiedOptions={}}getNodes(a="all"){let b=this.nodes[a];return Object.keys(b).map(a=>b[a])}getInstanceByKey(a){return this.nodes.all[a]}getSampleInstance(a){let b=Object.keys(this.nodes[a]),c=(0,e.sample)(b);return this.nodes[a][c]}addMasterNode(a){let b=(0,f.getNodeKey)(a.options),c=this.createRedisFromOptions(a,a.options.readOnly);return!a.options.readOnly&&(this.nodes.all[b]=c,this.nodes.master[b]=c,!0)}createRedisFromOptions(a,b){return new g.default((0,e.defaults)({retryStrategy:null,enableOfflineQueue:!0,readOnly:b},a,this.redisOptions,{lazyConnect:!0}))}findOrCreate(a,b=!1){let c,d=(0,f.getNodeKey)(a);return b=!!b,this.specifiedOptions[d]?Object.assign(a,this.specifiedOptions[d]):this.specifiedOptions[d]=a,this.nodes.all[d]?(c=this.nodes.all[d]).options.readOnly!==b&&(c.options.readOnly=b,h("Change role of %s to %s",d,b?"slave":"master"),c[b?"readonly":"readwrite"]().catch(e.noop),b?(delete this.nodes.master[d],this.nodes.slave[d]=c):(delete this.nodes.slave[d],this.nodes.master[d]=c)):(h("Connecting to %s as %s",d,b?"slave":"master"),c=this.createRedisFromOptions(a,b),this.nodes.all[d]=c,this.nodes[b?"slave":"master"][d]=c,c.once("end",()=>{this.removeNode(d),this.emit("-node",c,d),Object.keys(this.nodes.all).length||this.emit("drain")}),this.emit("+node",c,d),c.on("error",function(a){this.emit("nodeError",a,d)})),c}reset(a){h("Reset with %O",a);let b={};a.forEach(a=>{let c=(0,f.getNodeKey)(a);a.readOnly&&b[c]||(b[c]=a)}),Object.keys(this.nodes.all).forEach(a=>{b[a]||(h("Disconnect %s because the node does not hold any slot",a),this.nodes.all[a].disconnect(),this.removeNode(a))}),Object.keys(b).forEach(a=>{let c=b[a];this.findOrCreate(c,c.readOnly)})}removeNode(a){let{nodes:b}=this;b.all[a]&&(h("Remove %s from the pool",a),delete b.all[a]),delete b.master[a],delete b.slave[a]}}b.default=i},75142:(a,b,c)=>{"use strict";c.d(b,{R:()=>j});var d=c(79646),e=c(91645),f=c(73566),g=c(29196),h=c(94735);let i={1:"Uncaught Fatal Exception",2:"Unused",3:"Internal JavaScript Parse Error",4:"Internal JavaScript Evaluation Failure",5:"Fatal Error",6:"Non-function Internal Exception Handler",7:"Internal Exception Handler Run-Time Failure",8:"Unused",9:"Invalid Argument",10:"Internal JavaScript Run-Time Failure",12:"Invalid Debug Argument",13:"Unfinished Top-Level Await"};class j extends h.EventEmitter{constructor(a,b,c={useWorkerThreads:!1}){super(),this.mainFile=a,this.processFile=b,this.opts=c,this._exitCode=null,this._signalCode=null,this._killed=!1}get pid(){if(this.childProcess)return this.childProcess.pid;if(this.worker)return Math.abs(this.worker.threadId);throw Error("No child process or worker thread")}get exitCode(){return this._exitCode}get signalCode(){return this._signalCode}get killed(){return this.childProcess?this.childProcess.killed:this._killed}async init(){let a,b=await l(process.execArgv);this.opts.useWorkerThreads?this.worker=a=new f.Worker(this.mainFile,Object.assign({execArgv:b,stdin:!0,stdout:!0,stderr:!0},this.opts.workerThreadsOptions?this.opts.workerThreadsOptions:{})):this.childProcess=a=(0,d.fork)(this.mainFile,[],Object.assign({execArgv:b,stdio:"pipe"},this.opts.workerForkOptions?this.opts.workerForkOptions:{})),a.on("exit",(b,c)=>{this._exitCode=b,c=void 0===c?null:c,this._signalCode=c,this._killed=!0,this.emit("exit",b,c),a.removeAllListeners(),this.removeAllListeners()}),a.on("error",(...a)=>this.emit("error",...a)),a.on("message",(...a)=>this.emit("message",...a)),a.on("close",(...a)=>this.emit("close",...a)),a.stdout.pipe(process.stdout),a.stderr.pipe(process.stderr),await this.initChild()}async send(a){return new Promise((b,c)=>{this.childProcess?this.childProcess.send(a,a=>{a?c(a):b()}):this.worker?b(this.worker.postMessage(a)):b()})}killProcess(a="SIGKILL"){this.childProcess?this.childProcess.kill(a):this.worker&&this.worker.terminate()}async kill(a="SIGKILL",b){var c;if(this.hasProcessExited())return;let d=(c=this.childProcess||this.worker,new Promise(a=>{c.once("exit",()=>a())}));if(this.killProcess(a),void 0!==b&&(0===b||isFinite(b))){let a=setTimeout(()=>{this.hasProcessExited()||this.killProcess("SIGKILL")},b);await d,clearTimeout(a)}await d}async initChild(){let a=new Promise((a,b)=>{let c=e=>{if(Object.values(g.sc).includes(e.cmd)){if(e.cmd===g.sc.InitCompleted)a();else if(e.cmd===g.sc.InitFailed){let a=Error();a.stack=e.err.stack,a.message=e.err.message,b(a)}this.off("message",c),this.off("close",d)}},d=(a,e)=>{a>128&&(a-=128);let f=i[a]||`Unknown exit code ${a}`;b(Error(`Error initializing child: ${f} and signal ${e}`)),this.off("message",c),this.off("close",d)};this.on("message",c),this.on("close",d)});await this.send({cmd:g.M0.Init,value:this.processFile}),await a}hasProcessExited(){return!!(null!==this.exitCode||this.signalCode)}}let k=async()=>new Promise(a=>{let b=(0,e.createServer)();b.listen(0,()=>{let{port:c}=b.address();b.close(()=>a(c))})}),l=async a=>{let b=[],c=[];for(let d=0;d<a.length;d++){let e=a[d];if(-1===e.indexOf("--inspect"))b.push(e);else{let a=e.split("=")[0],b=await k();c.push(`${a}=${b}`)}}return b.concat(c)}},75154:(a,b,c)=>{"use strict";Object.defineProperty(b,"__esModule",{value:!0});let d=c(28749),e=c(95422),f=c(62007),g=(0,e.Debug)("cluster:subscriberGroup:shardedSubscriber");class h{constructor(a,b){for(let c of(this.emitter=a,this.started=!1,this.instance=null,this.messageListeners=new Map,this.onEnd=()=>{this.started=!1,this.emitter.emit("-node",this.instance,this.nodeKey)},this.onError=a=>{this.emitter.emit("nodeError",a,this.nodeKey)},this.onMoved=()=>{this.emitter.emit("moved")},this.instance=new f.default({port:b.port,host:b.host,username:b.username,password:b.password,enableReadyCheck:!1,offlineQueue:!0,connectionName:(0,d.getConnectionName)("ssubscriber",b.connectionName),lazyConnect:!0,tls:b.tls,retryStrategy:null}),this.nodeKey=(0,d.getNodeKey)(b),this.instance.once("end",this.onEnd),this.instance.on("error",this.onError),this.instance.on("moved",this.onMoved),["smessage","smessageBuffer"])){let a=(...a)=>{this.emitter.emit(c,...a)};this.messageListeners.set(c,a),this.instance.on(c,a)}}async start(){if(this.started)return void g("already started %s",this.nodeKey);try{await this.instance.connect(),g("started %s",this.nodeKey),this.started=!0}catch(a){throw g("failed to start %s: %s",this.nodeKey,a),this.started=!1,a}}stop(){this.started=!1,this.instance&&(this.instance.disconnect(),this.instance.removeAllListeners(),this.messageListeners.clear(),this.instance=null),g("stopped %s",this.nodeKey)}isStarted(){return this.started}getInstance(){return this.instance}getNodeKey(){return this.nodeKey}}b.default=h},75761:function(a,b,c){"use strict";var d=this&&this.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(b,"__esModule",{value:!0}),b.getKeyIndexes=b.hasFlag=b.exists=b.list=void 0;let e=d(c(1660));b.list=Object.keys(e.default);let f={};function g(a){"string"!=typeof a&&(a=String(a));let b=a.indexOf("->");return -1===b?a.length:b}b.list.forEach(a=>{f[a]=e.default[a].flags.reduce(function(a,b){return a[b]=!0,a},{})}),b.exists=function(a,b){return a=(null==b?void 0:b.caseInsensitive)?String(a).toLowerCase():a,!!e.default[a]},b.hasFlag=function(a,b,c){if(!f[a=(null==c?void 0:c.nameCaseInsensitive)?String(a).toLowerCase():a])throw Error("Unknown command "+a);return!!f[a][b]},b.getKeyIndexes=function(a,b,c){a=(null==c?void 0:c.nameCaseInsensitive)?String(a).toLowerCase():a;let d=e.default[a];if(!d)throw Error("Unknown command "+a);if(!Array.isArray(b))throw Error("Expect args to be an array");let f=[],h=!!(c&&c.parseExternalKey),i=(a,b)=>{let c=[],d=Number(a[b]);for(let a=0;a<d;a++)c.push(a+b+1);return c},j=(a,b,c)=>{for(let d=b;d<a.length-1;d+=1)if(String(a[d]).toLowerCase()===c.toLowerCase())return d+1;return null};switch(a){case"zunionstore":case"zinterstore":case"zdiffstore":f.push(0,...i(b,1));break;case"eval":case"evalsha":case"eval_ro":case"evalsha_ro":case"fcall":case"fcall_ro":case"blmpop":case"bzmpop":f.push(...i(b,1));break;case"sintercard":case"lmpop":case"zunion":case"zinter":case"zmpop":case"zintercard":case"zdiff":f.push(...i(b,0));break;case"georadius":{f.push(0);let a=j(b,5,"STORE");a&&f.push(a);let c=j(b,5,"STOREDIST");c&&f.push(c);break}case"georadiusbymember":{f.push(0);let a=j(b,4,"STORE");a&&f.push(a);let c=j(b,4,"STOREDIST");c&&f.push(c);break}case"sort":case"sort_ro":f.push(0);for(let a=1;a<b.length-1;a++){let c=b[a];if("string"!=typeof c)continue;let d=c.toUpperCase();"GET"===d?(a+=1,"#"!==(c=b[a])&&(h?f.push([a,g(c)]):f.push(a))):"BY"===d?(a+=1,h?f.push([a,g(b[a])]):f.push(a)):"STORE"===d&&(a+=1,f.push(a))}break;case"migrate":if(""===b[2])for(let a=5;a<b.length-1;a++){let c=b[a];if("string"==typeof c&&"KEYS"===c.toUpperCase()){for(let c=a+1;c<b.length;c++)f.push(c);break}}else f.push(2);break;case"xreadgroup":case"xread":for(let c=3*("xread"!==a);c<b.length-1;c++)if("STREAMS"===String(b[c]).toUpperCase()){for(let a=c+1;a<=c+(b.length-1-c)/2;a++)f.push(a);break}break;default:if(d.step>0){let a=d.keyStart-1,c=d.keyStop>0?d.keyStop:b.length+d.keyStop+1;for(let b=a;b<c;b+=d.step)f.push(b)}}return f}},76336:(a,b,c)=>{"use strict";let d=c(12412);class e extends Error{get name(){return this.constructor.name}}class f extends e{constructor(a,b,c){d(b),d.strictEqual(typeof c,"number");let e=Error.stackTraceLimit;Error.stackTraceLimit=2,super(a),Error.stackTraceLimit=e,this.offset=c,this.buffer=b}get name(){return this.constructor.name}}class g extends e{constructor(a){let b=Error.stackTraceLimit;Error.stackTraceLimit=2,super(a),Error.stackTraceLimit=b}get name(){return this.constructor.name}}class h extends e{get name(){return this.constructor.name}}class i extends h{get name(){return this.constructor.name}}a.exports={RedisError:e,ParserError:f,ReplyError:g,AbortError:h,InterruptError:i}},76504:a=>{var b=Object.prototype,c=b.hasOwnProperty,d=b.toString,e=b.propertyIsEnumerable;a.exports=function(a){var b,f,g,h,i,j,k,l;return!!(g=b=a)&&"object"==typeof g&&null!=(f=b)&&"number"==typeof(h=f.length)&&h>-1&&h%1==0&&h<=0x1fffffffffffff&&"[object Function]"!=(k=typeof(j=i=f),l=j&&("object"==k||"function"==k)?d.call(i):"")&&"[object GeneratorFunction]"!=l&&c.call(a,"callee")&&(!e.call(a,"callee")||"[object Arguments]"==d.call(a))}},76921:(a,b,c)=>{"use strict";Object.defineProperty(b,"__esModule",{value:!0});let d=c(28749),e=c(95422),f=c(62007),g=(0,e.Debug)("cluster:subscriber");class h{constructor(a,b,c=!1){this.connectionPool=a,this.emitter=b,this.isSharded=c,this.started=!1,this.subscriber=null,this.slotRange=[],this.onSubscriberEnd=()=>{if(!this.started)return void g("subscriber has disconnected, but ClusterSubscriber is not started, so not reconnecting.");g("subscriber has disconnected, selecting a new one..."),this.selectSubscriber()},this.connectionPool.on("-node",(a,b)=>{this.started&&this.subscriber&&(0,d.getNodeKey)(this.subscriber.options)===b&&(g("subscriber has left, selecting a new one..."),this.selectSubscriber())}),this.connectionPool.on("+node",()=>{this.started&&!this.subscriber&&(g("a new node is discovered and there is no subscriber, selecting a new one..."),this.selectSubscriber())})}getInstance(){return this.subscriber}associateSlotRange(a){return this.isSharded&&(this.slotRange=a),this.slotRange}start(){this.started=!0,this.selectSubscriber(),g("started")}stop(){this.started=!1,this.subscriber&&(this.subscriber.disconnect(),this.subscriber=null)}isStarted(){return this.started}selectSubscriber(){let a=this.lastActiveSubscriber;a&&(a.off("end",this.onSubscriberEnd),a.disconnect()),this.subscriber&&(this.subscriber.off("end",this.onSubscriberEnd),this.subscriber.disconnect());let b=(0,e.sample)(this.connectionPool.getNodes());if(!b){g("selecting subscriber failed since there is no node discovered in the cluster yet"),this.subscriber=null;return}let{options:c}=b;g("selected a subscriber %s:%s",c.host,c.port);let h="subscriber";this.isSharded&&(h="ssubscriber"),this.subscriber=new f.default({port:c.port,host:c.host,username:c.username,password:c.password,enableReadyCheck:!0,connectionName:(0,d.getConnectionName)(h,c.connectionName),lazyConnect:!0,tls:c.tls,retryStrategy:null}),this.subscriber.on("error",e.noop),this.subscriber.on("moved",()=>{this.emitter.emit("forceRefresh")}),this.subscriber.once("end",this.onSubscriberEnd);let i={subscribe:[],psubscribe:[],ssubscribe:[]};if(a){let b=a.condition||a.prevCondition;b&&b.subscriber&&(i.subscribe=b.subscriber.channels("subscribe"),i.psubscribe=b.subscriber.channels("psubscribe"),i.ssubscribe=b.subscriber.channels("ssubscribe"))}if(i.subscribe.length||i.psubscribe.length||i.ssubscribe.length){let a=0;for(let b of["subscribe","psubscribe","ssubscribe"]){let c=i[b];if(0!=c.length)if(g("%s %d channels",b,c.length),"ssubscribe"===b)for(let d of c)a+=1,this.subscriber[b](d).then(()=>{--a||(this.lastActiveSubscriber=this.subscriber)}).catch(()=>{g("failed to ssubscribe to channel: %s",d)});else a+=1,this.subscriber[b](c).then(()=>{--a||(this.lastActiveSubscriber=this.subscriber)}).catch(()=>{g("failed to %s %d channels",b,c.length)})}}else this.lastActiveSubscriber=this.subscriber;for(let a of["message","messageBuffer"])this.subscriber.on(a,(b,c)=>{this.emitter.emit(a,b,c)});for(let a of["pmessage","pmessageBuffer"])this.subscriber.on(a,(b,c,d)=>{this.emitter.emit(a,b,c,d)});if(!0==this.isSharded)for(let a of["smessage","smessageBuffer"])this.subscriber.on(a,(b,c)=>{this.emitter.emit(a,b,c)})}}b.default=h},77425:(a,b,c)=>{"use strict";c.d(b,{f:()=>j});var d=c(94735),e=c(50685),f=c(11024),g=c(46293),h=c(37099),i=c(6752);class j extends d.EventEmitter{constructor(a,b={connection:{}},c=g.Q,d=!1){if(super(),this.name=a,this.opts=b,this.closed=!1,this.hasBlockingConnection=!1,this.hasBlockingConnection=d,this.opts=Object.assign({prefix:"bull"},b),!a)throw Error("Queue name must be provided");if(a.includes(":"))throw Error("Queue name cannot contain :");this.connection=new c(b.connection,{shared:(0,e.rI)(b.connection),blocking:d,skipVersionCheck:b.skipVersionCheck,skipWaitingForReady:b.skipWaitingForReady}),this.connection.on("error",a=>this.emit("error",a)),this.connection.on("close",()=>{this.closing||this.emit("ioredis:close")});let f=new i.E(b.prefix);this.qualifiedName=f.getQueueQualifiedName(a),this.keys=f.getKeys(a),this.toKey=b=>f.toKey(a,b),this.createScripts()}get client(){return this.connection.client}createScripts(){this.scripts=(0,f.N)(this)}get redisVersion(){return this.connection.redisVersion}get databaseType(){return this.connection.databaseType}get Job(){return h._}emit(a,...b){try{return super.emit(a,...b)}catch(a){try{return super.emit("error",a)}catch(a){return console.error(a),!1}}}waitUntilReady(){return this.client}base64Name(){return Buffer.from(this.name).toString("base64")}clientName(a=""){let b=this.base64Name();return`${this.opts.prefix}:${b}${a}`}async close(){this.closing||(this.closing=this.connection.close()),await this.closing,this.closed=!0}disconnect(){return this.connection.disconnect()}async checkConnectionError(a,b=e.ag){try{return await a()}catch(a){if((0,e.sr)(a)&&this.emit("error",a),this.closing||!b)return;await (0,e.cb)(b)}}trace(a,b,c,d,f){return(0,e.uP)(this.opts.telemetry,a,this.name,b,c,d,f)}}},78808:a=>{"use strict";function b(a){return{start:a,count:1}}function c(a,b){a.end=b,a.step=b-a.start,a.count=2}function d(a,c,d){c&&(2===c.count?(a.push(b(c.start)),a.push(b(c.end))):a.push(c)),d&&a.push(d)}a.exports=function(a){for(var e=[],f=void 0,g=0;g<a.length;g++){var h=a[g];"number"!=typeof h?(d(e,f,b(h)),f=void 0):f?1===f.count?c(f,h):f.step===h-f.end?(f.count++,f.end=h):2===f.count?(e.push(b(f.start)),c(f=b(f.end),h)):(d(e,f),f=b(h)):f=b(h)}return d(e,f),e}},80308:(a,b,c)=>{"use strict";let d,e,f,g,h,i,j,k,l,m,n,o;c.d(b,{T:()=>a1});try{p=new TextDecoder}catch(a){}var p,q,r,s,t,u,v,w,x,y,z,A=0;let B=[];var C=B,D=0,E={},F=0,G=0,H=[],I={useRecords:!1,mapsAsObjects:!0};class J{}let K=new J;K.name="MessagePack 0xC1";var L=!1,M=2;try{Function("")}catch(a){M=1/0}class N{constructor(a){a&&(!1===a.useRecords&&void 0===a.mapsAsObjects&&(a.mapsAsObjects=!0),a.sequential&&!1!==a.trusted&&(a.trusted=!0,!a.structures&&!1!=a.useRecords&&(a.structures=[],a.maxSharedStructures||(a.maxSharedStructures=0))),a.structures?a.structures.sharedLength=a.structures.length:a.getStructures&&((a.structures=[]).uninitialized=!0,a.structures.sharedLength=0),a.int64AsNumber&&(a.int64AsType="number")),Object.assign(this,a)}unpack(a,b){if(q)return ao(()=>(ap(),this?this.unpack(a,b):N.prototype.unpack.call(I,a,b)));a.buffer||a.constructor!==ArrayBuffer||(a="undefined"!=typeof Buffer?Buffer.from(a):new Uint8Array(a)),"object"==typeof b?(r=b.end||a.length,A=b.start||0):(A=0,r=b>-1?b:a.length),D=0,G=0,t=null,C=B,u=null,q=a;try{w=a.dataView||(a.dataView=new DataView(a.buffer,a.byteOffset,a.byteLength))}catch(b){if(q=null,a instanceof Uint8Array)throw b;throw Error("Source must be a Uint8Array or Buffer but was a "+(a&&"object"==typeof a?a.constructor.name:typeof a))}return this instanceof N?(E=this,this.structures?s=this.structures:(!s||s.length>0)&&(s=[])):(E=I,(!s||s.length>0)&&(s=[])),O(b)}unpackMultiple(a,b){let c,d=0;try{L=!0;let e=a.length,f=this?this.unpack(a,e):ar.unpack(a,e);if(b){if(!1===b(f,d,A))return;for(;A<e;)if(d=A,!1===b(O(),d,A))return}else{for(c=[f];A<e;)d=A,c.push(O());return c}}catch(a){throw a.lastPosition=d,a.values=c,a}finally{L=!1,ap()}}_mergeStructures(a,b){y&&(a=y.call(this,a)),Object.isFrozen(a=a||[])&&(a=a.map(a=>a.slice(0)));for(let b=0,c=a.length;b<c;b++){let c=a[b];c&&(c.isShared=!0,b>=32&&(c.highByte=b-32>>5))}for(let c in a.sharedLength=a.length,b||[])if(c>=0){let d=a[c],e=b[c];e&&(d&&((a.restoreStructures||(a.restoreStructures=[]))[c]=d),a[c]=e)}return this.structures=a}decode(a,b){return this.unpack(a,b)}}function O(a){try{let b;if(!E.trusted&&!L){let a=s.sharedLength||0;a<s.length&&(s.length=a)}if(E.randomAccessStructure&&q[A]<64&&q[A]>=32&&x?(b=x(q,A,r,E),q=null,!(a&&a.lazy)&&b&&(b=b.toJSON()),A=r):b=Q(),u&&(A=u.postBundlePosition,u=null),L&&(s.restoreStructures=null),A==r)s&&s.restoreStructures&&P(),s=null,q=null,v&&(v=null);else if(A>r)throw Error("Unexpected end of MessagePack data");else if(!L){let a;try{a=JSON.stringify(b,(a,b)=>"bigint"==typeof b?`${b}n`:b).slice(0,100)}catch(b){a="(JSON view not available "+b+")"}throw Error("Data read, but end of buffer not reached "+a)}return b}catch(a){throw s&&s.restoreStructures&&P(),ap(),(a instanceof RangeError||a.message.startsWith("Unexpected end of buffer")||A>r)&&(a.incomplete=!0),a}}function P(){for(let a in s.restoreStructures)s[a]=s.restoreStructures[a];s.restoreStructures=null}function Q(){let a=q[A++];if(a<160)if(a<128)if(a<64)return a;else{let b=s[63&a]||E.getStructures&&U()[63&a];return b?(b.read||(b.read=S(b,63&a)),b.read()):a}else if(a<144){if(a-=128,E.mapsAsObjects){let b={};for(let c=0;c<a;c++){let a=ah();"__proto__"===a&&(a="__proto_"),b[a]=Q()}return b}{let b=new Map;for(let c=0;c<a;c++)b.set(Q(),Q());return b}}else{let b=Array(a-=144);for(let c=0;c<a;c++)b[c]=Q();return E.freezeData?Object.freeze(b):b}if(a<192){let b=a-160;if(G>=A)return t.slice(A-F,(A+=b)-F);if(0==G&&r<140){let a=b<16?ac(b):ab(b);if(null!=a)return a}return V(b)}{let b;switch(a){case 192:return null;case 193:if(u){if((b=Q())>0)return u[1].slice(u.position1,u.position1+=b);return u[0].slice(u.position0,u.position0-=b)}return K;case 194:return!1;case 195:return!0;case 196:if(void 0===(b=q[A++]))throw Error("Unexpected end of buffer");return ae(b);case 197:return b=w.getUint16(A),A+=2,ae(b);case 198:return b=w.getUint32(A),A+=4,ae(b);case 199:return af(q[A++]);case 200:return b=w.getUint16(A),A+=2,af(b);case 201:return b=w.getUint32(A),A+=4,af(b);case 202:if(b=w.getFloat32(A),E.useFloat32>2){let a=aq[(127&q[A])<<1|q[A+1]>>7];return A+=4,(a*b+(b>0?.5:-.5)|0)/a}return A+=4,b;case 203:return b=w.getFloat64(A),A+=8,b;case 204:return q[A++];case 205:return b=w.getUint16(A),A+=2,b;case 206:return b=w.getUint32(A),A+=4,b;case 207:return"number"===E.int64AsType?b=0x100000000*w.getUint32(A)+w.getUint32(A+4):"string"===E.int64AsType?b=w.getBigUint64(A).toString():"auto"===E.int64AsType?(b=w.getBigUint64(A))<=BigInt(2)<<BigInt(52)&&(b=Number(b)):b=w.getBigUint64(A),A+=8,b;case 208:return w.getInt8(A++);case 209:return b=w.getInt16(A),A+=2,b;case 210:return b=w.getInt32(A),A+=4,b;case 211:return"number"===E.int64AsType?b=0x100000000*w.getInt32(A)+w.getUint32(A+4):"string"===E.int64AsType?b=w.getBigInt64(A).toString():"auto"===E.int64AsType?(b=w.getBigInt64(A))>=BigInt(-2)<<BigInt(52)&&b<=BigInt(2)<<BigInt(52)&&(b=Number(b)):b=w.getBigInt64(A),A+=8,b;case 212:if(114==(b=q[A++]))return aj(63&q[A++]);{let a=H[b];if(a)if(a.read)return A++,a.read(Q());else if(a.noBuffer)return A++,a();else return a(q.subarray(A,++A));throw Error("Unknown extension "+b)}case 213:if(114==(b=q[A]))return A++,aj(63&q[A++],q[A++]);return af(2);case 214:return af(4);case 215:return af(8);case 216:return af(16);case 217:if(b=q[A++],G>=A)return t.slice(A-F,(A+=b)-F);return W(b);case 218:if(b=w.getUint16(A),A+=2,G>=A)return t.slice(A-F,(A+=b)-F);return X(b);case 219:if(b=w.getUint32(A),A+=4,G>=A)return t.slice(A-F,(A+=b)-F);return Y(b);case 220:return b=w.getUint16(A),A+=2,$(b);case 221:return b=w.getUint32(A),A+=4,$(b);case 222:return b=w.getUint16(A),A+=2,_(b);case 223:return b=w.getUint32(A),A+=4,_(b);default:if(a>=224)return a-256;if(void 0===a){let a=Error("Unexpected end of MessagePack data");throw a.incomplete=!0,a}throw Error("Unknown MessagePack token "+a)}}}let R=/^[a-zA-Z_$][a-zA-Z\d_$]*$/;function S(a,b){function c(){if(c.count++>M){let c=a.read=Function("r","return function(){return "+(E.freezeData?"Object.freeze":"")+"({"+a.map(a=>"__proto__"===a?"__proto_:r()":R.test(a)?a+":r()":"["+JSON.stringify(a)+"]:r()").join(",")+"})}")(Q);return 0===a.highByte&&(a.read=T(b,a.read)),c()}let d={};for(let b=0,c=a.length;b<c;b++){let c=a[b];"__proto__"===c&&(c="__proto_"),d[c]=Q()}return E.freezeData?Object.freeze(d):d}return(c.count=0,0===a.highByte)?T(b,c):c}let T=(a,b)=>function(){let c=q[A++];if(0===c)return b();let d=a<32?-(a+(c<<5)):a+(c<<5),e=s[d]||U()[d];if(!e)throw Error("Record id is not defined for "+d);return e.read||(e.read=S(e,a)),e.read()};function U(){let a=ao(()=>(q=null,E.getStructures()));return s=E._mergeStructures(a,s)}var V=Z,W=Z,X=Z,Y=Z;function Z(a){let b;if(a<16&&(b=ac(a)))return b;if(a>64&&p)return p.decode(q.subarray(A,A+=a));let c=A+a,d=[];for(b="";A<c;){let a=q[A++];if((128&a)==0)d.push(a);else if((224&a)==192){let b=63&q[A++];d.push((31&a)<<6|b)}else if((240&a)==224){let b=63&q[A++],c=63&q[A++];d.push((31&a)<<12|b<<6|c)}else if((248&a)==240){let b=63&q[A++],c=(7&a)<<18|b<<12|(63&q[A++])<<6|63&q[A++];c>65535&&(c-=65536,d.push(c>>>10&1023|55296),c=56320|1023&c),d.push(c)}else d.push(a);d.length>=4096&&(b+=aa.apply(String,d),d.length=0)}return d.length>0&&(b+=aa.apply(String,d)),b}function $(a){let b=Array(a);for(let c=0;c<a;c++)b[c]=Q();return E.freezeData?Object.freeze(b):b}function _(a){if(E.mapsAsObjects){let b={};for(let c=0;c<a;c++){let a=ah();"__proto__"===a&&(a="__proto_"),b[a]=Q()}return b}{let b=new Map;for(let c=0;c<a;c++)b.set(Q(),Q());return b}}var aa=String.fromCharCode;function ab(a){let b=A,c=Array(a);for(let d=0;d<a;d++){let a=q[A++];if((128&a)>0){A=b;return}c[d]=a}return aa.apply(String,c)}function ac(a){if(a<4)if(a<2)if(0===a)return"";else{let a=q[A++];if((128&a)>1){A-=1;return}return aa(a)}else{let b=q[A++],c=q[A++];if((128&b)>0||(128&c)>0){A-=2;return}if(a<3)return aa(b,c);let d=q[A++];if((128&d)>0){A-=3;return}return aa(b,c,d)}{let b=q[A++],c=q[A++],d=q[A++],e=q[A++];if((128&b)>0||(128&c)>0||(128&d)>0||(128&e)>0){A-=4;return}if(a<6)if(4===a)return aa(b,c,d,e);else{let a=q[A++];if((128&a)>0){A-=5;return}return aa(b,c,d,e,a)}if(a<8){let f=q[A++],g=q[A++];if((128&f)>0||(128&g)>0){A-=6;return}if(a<7)return aa(b,c,d,e,f,g);let h=q[A++];if((128&h)>0){A-=7;return}return aa(b,c,d,e,f,g,h)}{let f=q[A++],g=q[A++],h=q[A++],i=q[A++];if((128&f)>0||(128&g)>0||(128&h)>0||(128&i)>0){A-=8;return}if(a<10)if(8===a)return aa(b,c,d,e,f,g,h,i);else{let a=q[A++];if((128&a)>0){A-=9;return}return aa(b,c,d,e,f,g,h,i,a)}if(a<12){let j=q[A++],k=q[A++];if((128&j)>0||(128&k)>0){A-=10;return}if(a<11)return aa(b,c,d,e,f,g,h,i,j,k);let l=q[A++];if((128&l)>0){A-=11;return}return aa(b,c,d,e,f,g,h,i,j,k,l)}{let j=q[A++],k=q[A++],l=q[A++],m=q[A++];if((128&j)>0||(128&k)>0||(128&l)>0||(128&m)>0){A-=12;return}if(a<14)if(12===a)return aa(b,c,d,e,f,g,h,i,j,k,l,m);else{let a=q[A++];if((128&a)>0){A-=13;return}return aa(b,c,d,e,f,g,h,i,j,k,l,m,a)}{let n=q[A++],o=q[A++];if((128&n)>0||(128&o)>0){A-=14;return}if(a<15)return aa(b,c,d,e,f,g,h,i,j,k,l,m,n,o);let p=q[A++];if((128&p)>0){A-=15;return}return aa(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p)}}}}}function ad(){let a,b=q[A++];if(b<192)a=b-160;else switch(b){case 217:a=q[A++];break;case 218:a=w.getUint16(A),A+=2;break;case 219:a=w.getUint32(A),A+=4;break;default:throw Error("Expected string")}return Z(a)}function ae(a){return E.copyBuffers?Uint8Array.prototype.slice.call(q,A,A+=a):q.subarray(A,A+=a)}function af(a){let b=q[A++];if(H[b]){let c;return H[b](q.subarray(A,c=A+=a),a=>{A=a;try{return Q()}finally{A=c}})}throw Error("Unknown extension type "+b)}var ag=Array(4096);function ah(){let a,b=q[A++];if(!(b>=160)||!(b<192))return A--,ai(Q());if(b-=160,G>=A)return t.slice(A-F,(A+=b)-F);if(!(0==G&&r<180))return V(b);let c=(b<<5^(b>1?w.getUint16(A):b>0?q[A]:0))&4095,d=ag[c],e=A,f=A+b-3,g=0;if(d&&d.bytes==b){for(;e<f;){if((a=w.getUint32(e))!=d[g++]){e=0x70000000;break}e+=4}for(f+=3;e<f;)if((a=q[e++])!=d[g++]){e=0x70000000;break}if(e===f)return A=e,d.string;f-=3,e=A}for(d=[],ag[c]=d,d.bytes=b;e<f;)a=w.getUint32(e),d.push(a),e+=4;for(f+=3;e<f;)a=q[e++],d.push(a);let h=b<16?ac(b):ab(b);return null!=h?d.string=h:d.string=V(b)}function ai(a){if("string"==typeof a)return a;if("number"==typeof a||"boolean"==typeof a||"bigint"==typeof a)return a.toString();if(null==a)return a+"";if(E.allowArraysInMapKeys&&Array.isArray(a)&&a.flat().every(a=>["string","number","boolean","bigint"].includes(typeof a)))return a.flat().toString();throw Error(`Invalid property type for record: ${typeof a}`)}let aj=(a,b)=>{let c=Q().map(ai),d=a;void 0!==b&&(a=a<32?-((b<<5)+a):(b<<5)+a,c.highByte=b);let e=s[a];return e&&(e.isShared||L)&&((s.restoreStructures||(s.restoreStructures=[]))[a]=e),s[a]=c,c.read=S(c,d),c.read()};H[0]=()=>{},H[0].noBuffer=!0,H[66]=a=>{let b=a.byteLength%8||8,c=BigInt(128&a[0]?a[0]-256:a[0]);for(let d=1;d<b;d++)c<<=BigInt(8),c+=BigInt(a[d]);if(a.byteLength!==b){let d=new DataView(a.buffer,a.byteOffset,a.byteLength),e=(a,b)=>{let c=b-a;if(c<=40){let c=d.getBigUint64(a);for(let e=a+8;e<b;e+=8)c<<=BigInt(64n),c|=d.getBigUint64(e);return c}let f=a+(c>>4<<3),g=e(a,f),h=e(f,b);return g<<BigInt((b-f)*8)|h};c=c<<BigInt((d.byteLength-b)*8)|e(b,d.byteLength)}return c};let ak={Error,EvalError,RangeError,ReferenceError,SyntaxError,TypeError,URIError,AggregateError:"function"==typeof AggregateError?AggregateError:null};H[101]=()=>{let a=Q();if(!ak[a[0]]){let b=Error(a[1],{cause:a[2]});return b.name=a[0],b}return ak[a[0]](a[1],{cause:a[2]})},H[105]=a=>{let b;if(!1===E.structuredClone)throw Error("Structured clone extension is disabled");let c=w.getUint32(A-4);v||(v=new Map);let d=q[A],e={target:b=d>=144&&d<160||220==d||221==d?[]:d>=128&&d<144||222==d||223==d?new Map:(d>=199&&d<=201||d>=212&&d<=216)&&115===q[A+1]?new Set:{}};v.set(c,e);let f=Q();if(!e.used)return e.target=f;if(Object.assign(b,f),b instanceof Map)for(let[a,c]of f.entries())b.set(a,c);if(b instanceof Set)for(let a of Array.from(f))b.add(a);return b},H[112]=a=>{if(!1===E.structuredClone)throw Error("Structured clone extension is disabled");let b=w.getUint32(A-4),c=v.get(b);return c.used=!0,c.target},H[115]=()=>new Set(Q());let al=["Int8","Uint8","Uint8Clamped","Int16","Uint16","Int32","Uint32","Float32","Float64","BigInt64","BigUint64"].map(a=>a+"Array"),am="object"==typeof globalThis?globalThis:window;H[116]=a=>{let b=a[0],c=Uint8Array.prototype.slice.call(a,1).buffer,d=al[b];if(!d){if(16===b)return c;if(17===b)return new DataView(c);throw Error("Could not find typed array for code "+b)}return new am[d](c)},H[120]=()=>{let a=Q();return new RegExp(a[0],a[1])};let an=[];function ao(a){z&&z();let b=r,c=A,d=D,e=F,f=G,g=t,h=C,i=v,j=u,k=new Uint8Array(q.slice(0,r)),l=s,m=s.slice(0,s.length),n=E,o=L,p=a();return r=b,A=c,D=d,F=e,G=f,t=g,C=h,v=i,u=j,q=k,L=o,(s=l).splice(0,s.length,...m),E=n,w=new DataView(q.buffer,q.byteOffset,q.byteLength),p}function ap(){q=null,v=null,s=null}H[98]=a=>{let b=(a[0]<<24)+(a[1]<<16)+(a[2]<<8)+a[3],c=A;return A+=b-a.length,u=an,(u=[ad(),ad()]).position0=0,u.position1=0,u.postBundlePosition=A,A=c,Q()},H[255]=a=>4==a.length?new Date((0x1000000*a[0]+(a[1]<<16)+(a[2]<<8)+a[3])*1e3):8==a.length?new Date(((a[0]<<22)+(a[1]<<14)+(a[2]<<6)+(a[3]>>2))/1e6+((3&a[3])*0x100000000+0x1000000*a[4]+(a[5]<<16)+(a[6]<<8)+a[7])*1e3):12==a.length?new Date(((a[0]<<24)+(a[1]<<16)+(a[2]<<8)+a[3])/1e6+((128&a[4]?-0x1000000000000:0)+0x10000000000*a[6]+0x100000000*a[7]+0x1000000*a[8]+(a[9]<<16)+(a[10]<<8)+a[11])*1e3):new Date("invalid");let aq=Array(147);for(let a=0;a<256;a++)aq[a]=+("1e"+Math.floor(45.15-.30103*a));var ar=new N({useRecords:!1});ar.unpack,ar.unpackMultiple,ar.unpack,new Uint8Array(new Float32Array(1).buffer,0,4);try{d=new TextEncoder}catch(a){}let as="undefined"!=typeof Buffer,at=as?function(a){return Buffer.allocUnsafeSlow(a)}:Uint8Array,au=as?Buffer:Uint8Array,av=as?0x100000000:0x7fd00000,aw=0,ax=null,ay=/[\u0080-\uFFFF]/,az=Symbol("record-id");class aA extends N{constructor(a){let b,c,l,m;super(a),this.offset=0;let n=au.prototype.utf8Write?function(a,b){return g.utf8Write(a,b,g.byteLength-b)}:!!d&&!!d.encodeInto&&function(a,b){return d.encodeInto(a,g.subarray(b)).written},o=this;a||(a={});let p=a&&a.sequential,q=a.structures||a.saveStructures,r=a.maxSharedStructures;if(null==r&&(r=32*!!q),r>8160)throw Error("Maximum maxSharedStructure is 8160");a.structuredClone&&void 0==a.moreTypes&&(this.moreTypes=!0);let s=a.maxOwnStructures;null==s&&(s=q?32:64),this.structures||!1==a.useRecords||(this.structures=[]);let t=r>32||s+r>64,u=r+64,v=r+s+64;if(v>8256)throw Error("Maximum maxSharedStructure + maxOwnStructure is 8192");let w=[],x=0,y=0;this.pack=this.encode=function(a,d){let e;if(g||(i=(g=new at(8192)).dataView||(g.dataView=new DataView(g.buffer,0,8192)),aw=0),(j=g.length-10)-aw<2048?(i=(g=new at(g.length)).dataView||(g.dataView=new DataView(g.buffer,0,g.length)),j=g.length-10,aw=0):aw=aw+7&0x7ffffff8,b=aw,d&aN&&(aw+=255&d),m=o.structuredClone?new Map:null,o.bundleStrings&&"string"!=typeof a?(ax=[]).size=1/0:ax=null,l=o.structures){l.uninitialized&&(l=o._mergeStructures(o.getStructures()));let a=l.sharedLength||0;if(a>r)throw Error("Shared structures is larger than maximum shared structures, try increasing maxSharedStructures to "+l.sharedLength);if(!l.transitions){l.transitions=Object.create(null);for(let b=0;b<a;b++){let a=l[b];if(!a)continue;let c,d=l.transitions;for(let b=0,e=a.length;b<e;b++){let e=a[b];(c=d[e])||(c=d[e]=Object.create(null)),d=c}d[az]=b+64}this.lastNamedStructuresLength=a}p||(l.nextId=a+64)}c&&(c=!1);try{o.randomAccessStructure&&a&&a.constructor&&a.constructor===Object?J(a):B(a);let c=ax;if(ax&&aE(b,B,0),m&&m.idsToInsert){let a=m.idsToInsert.sort((a,b)=>a.offset>b.offset?1:-1),d=a.length,e=-1;for(;c&&d>0;){let f=a[--d].offset+b;f<c.stringsPosition+b&&-1===e&&(e=0),f>c.position+b?e>=0&&(e+=6):(e>=0&&(i.setUint32(c.position+b,i.getUint32(c.position+b)+e),e=-1),c=c.previous,d++)}e>=0&&c&&i.setUint32(c.position+b,i.getUint32(c.position+b)+e),(aw+=6*a.length)>j&&G(aw),o.offset=aw;let f=function(a,b){let c,d=6*b.length,e=a.length-d;for(;c=b.pop();){let b=c.offset,f=c.id;a.copyWithin(b+d,b,e);let g=b+(d-=6);a[g++]=214,a[g++]=105,a[g++]=f>>24,a[g++]=f>>16&255,a[g++]=f>>8&255,a[g++]=255&f,e=b}return a}(g.subarray(b,aw),a);return m=null,f}if(o.offset=aw,d&aL)return g.start=b,g.end=aw,g;return g.subarray(b,aw)}catch(a){throw e=a,a}finally{if(l&&(z(),c&&o.saveStructures)){let c=l.sharedLength||0,f=g.subarray(b,aw),h=aF(l,o);if(!e){if(!1===o.saveStructures(h,h.isCompatible))return o.pack(a,d);return o.lastNamedStructuresLength=c,g.length>0x40000000&&(g=null),f}}g.length>0x40000000&&(g=null),d&aM&&(aw=b)}};let z=()=>{y<10&&y++;let a=l.sharedLength||0;if(l.length>a&&!p&&(l.length=a),x>1e4)l.transitions=null,y=0,x=0,w.length>0&&(w=[]);else if(w.length>0&&!p){for(let a=0,b=w.length;a<b;a++)w[a][az]=0;w=[]}},A=a=>{var b=a.length;b<16?g[aw++]=144|b:b<65536?(g[aw++]=220,g[aw++]=b>>8,g[aw++]=255&b):(g[aw++]=221,i.setUint32(aw,b),aw+=4);for(let c=0;c<b;c++)B(a[c])},B=a=>{aw>j&&(g=G(aw));var c,d=typeof a;if("string"===d){let d,e=a.length;if(ax&&e>=4&&e<4096){if((ax.size+=e)>21760){let a,c,d=(ax[0]?3*ax[0].length+ax[1].length:0)+10;aw+d>j&&(g=G(aw+d)),ax.position?(c=ax,g[aw]=200,aw+=3,g[aw++]=98,a=aw-b,aw+=4,aE(b,B,0),i.setUint16(a+b-3,aw-b-a)):(g[aw++]=214,g[aw++]=98,a=aw-b,aw+=4),(ax=["",""]).previous=c,ax.size=0,ax.position=a}let c=ay.test(a);ax[+!c]+=a,g[aw++]=193,B(c?-e:e);return}d=e<32?1:e<256?2:e<65536?3:5;let f=3*e;if(aw+f>j&&(g=G(aw+f)),e<64||!n){let b,f,h,i=aw+d;for(b=0;b<e;b++)(f=a.charCodeAt(b))<128?g[i++]=f:(f<2048?g[i++]=f>>6|192:((64512&f)==55296&&(64512&(h=a.charCodeAt(b+1)))==56320?(f=65536+((1023&f)<<10)+(1023&h),b++,g[i++]=f>>18|240,g[i++]=f>>12&63|128):g[i++]=f>>12|224,g[i++]=f>>6&63|128),g[i++]=63&f|128);c=i-aw-d}else c=n(a,aw+d);c<32?g[aw++]=160|c:c<256?(d<2&&g.copyWithin(aw+2,aw+1,aw+1+c),g[aw++]=217,g[aw++]=c):c<65536?(d<3&&g.copyWithin(aw+3,aw+2,aw+2+c),g[aw++]=218,g[aw++]=c>>8,g[aw++]=255&c):(d<5&&g.copyWithin(aw+5,aw+3,aw+3+c),g[aw++]=219,i.setUint32(aw,c),aw+=4),aw+=c}else if("number"===d)if(a>>>0===a)a<32||a<128&&!1===this.useRecords||a<64&&!this.randomAccessStructure?g[aw++]=a:a<256?(g[aw++]=204,g[aw++]=a):a<65536?(g[aw++]=205,g[aw++]=a>>8,g[aw++]=255&a):(g[aw++]=206,i.setUint32(aw,a),aw+=4);else if((0|a)===a)a>=-32?g[aw++]=256+a:a>=-128?(g[aw++]=208,g[aw++]=a+256):a>=-32768?(g[aw++]=209,i.setInt16(aw,a),aw+=2):(g[aw++]=210,i.setInt32(aw,a),aw+=4);else{let b;if((b=this.useFloat32)>0&&a<0x100000000&&a>=-0x80000000){let c;if(g[aw++]=202,i.setFloat32(aw,a),b<4||(0|(c=a*aq[(127&g[aw])<<1|g[aw+1]>>7]))===c){aw+=4;return}aw--}g[aw++]=203,i.setFloat64(aw,a),aw+=8}else if("object"===d||"function"===d)if(a){if(m){let c=m.get(a);if(c){c.id||(c.id=(m.idsToInsert||(m.idsToInsert=[])).push(c)),g[aw++]=214,g[aw++]=112,i.setUint32(aw,c.id),aw+=4;return}m.set(a,{offset:aw-b})}let h=a.constructor;if(h===Object)F(a);else if(h===Array)A(a);else if(h===Map)if(this.mapAsEmptyObject)g[aw++]=128;else for(let[b,d]of((c=a.size)<16?g[aw++]=128|c:c<65536?(g[aw++]=222,g[aw++]=c>>8,g[aw++]=255&c):(g[aw++]=223,i.setUint32(aw,c),aw+=4),a))B(b),B(d);else{for(let b=0,c=e.length;b<c;b++)if(a instanceof f[b]){let c,d=e[b];if(d.write){d.type&&(g[aw++]=212,g[aw++]=d.type,g[aw++]=0);let b=d.write.call(this,a);b===a?Array.isArray(a)?A(a):F(a):B(b);return}let f=g,h=i,k=aw;g=null;try{c=d.pack.call(this,a,a=>(g=f,f=null,(aw+=a)>j&&G(aw),{target:g,targetView:i,position:aw-a}),B)}finally{f&&(g=f,i=h,aw=k,j=g.length-10)}c&&(c.length+aw>j&&G(c.length+aw),aw=aD(c,g,aw,d.type));return}if(Array.isArray(a))A(a);else{if(a.toJSON){let b=a.toJSON();if(b!==a)return B(b)}if("function"===d)return B(this.writeFunction&&this.writeFunction(a));F(a)}}}else g[aw++]=192;else if("boolean"===d)g[aw++]=a?195:194;else if("bigint"===d){if(a<0x8000000000000000&&a>=-0x8000000000000000)g[aw++]=211,i.setBigInt64(aw,a);else if(a<0xffffffffffffffff&&a>0)g[aw++]=207,i.setBigUint64(aw,a);else if(this.largeBigIntToFloat)g[aw++]=203,i.setFloat64(aw,Number(a));else if(this.largeBigIntToString)return B(a.toString());else if(this.useBigIntExtension||this.moreTypes){let b,c=a<0?BigInt(-1):BigInt(0);if(a>>BigInt(65536)===c){let d=BigInt(0xffffffffffffffff)-BigInt(1),e=[];for(;e.push(a&d),a>>BigInt(63)!==c;)a>>=BigInt(64);(b=new Uint8Array(new BigUint64Array(e).buffer)).reverse()}else{let c=a<0,d=(c?~a:a).toString(16);if(d.length%2?d="0"+d:parseInt(d.charAt(0),16)>=8&&(d="00"+d),as)b=Buffer.from(d,"hex");else{b=new Uint8Array(d.length/2);for(let a=0;a<b.length;a++)b[a]=parseInt(d.slice(2*a,2*a+2),16)}if(c)for(let a=0;a<b.length;a++)b[a]=~b[a]}b.length+aw>j&&G(b.length+aw),aw=aD(b,g,aw,66);return}else throw RangeError(a+" was too large to fit in MessagePack 64-bit integer format, use useBigIntExtension, or set largeBigIntToFloat to convert to float-64, or set largeBigIntToString to convert to string");aw+=8}else if("undefined"===d)this.encodeUndefinedAsNil?g[aw++]=192:(g[aw++]=212,g[aw++]=0,g[aw++]=0);else throw Error("Unknown type: "+d)},C=this.variableMapSize||this.coercibleKeyAsNumber||this.skipValues?a=>{let b,c;if(this.skipValues)for(let c in b=[],a)("function"!=typeof a.hasOwnProperty||a.hasOwnProperty(c))&&!this.skipValues.includes(a[c])&&b.push(c);else b=Object.keys(a);let d=b.length;if(d<16?g[aw++]=128|d:d<65536?(g[aw++]=222,g[aw++]=d>>8,g[aw++]=255&d):(g[aw++]=223,i.setUint32(aw,d),aw+=4),this.coercibleKeyAsNumber)for(let e=0;e<d;e++){let d=Number(c=b[e]);B(isNaN(d)?c:d),B(a[c])}else for(let e=0;e<d;e++)B(c=b[e]),B(a[c])}:a=>{g[aw++]=222;let c=aw-b;aw+=2;let d=0;for(let b in a)("function"!=typeof a.hasOwnProperty||a.hasOwnProperty(b))&&(B(b),B(a[b]),d++);if(d>65535)throw Error('Object is too large to serialize with fast 16-bit map size, use the "variableMapSize" option to serialize this object');g[c+++b]=d>>8,g[c+b]=255&d},D=!1===this.useRecords?C:a.progressiveRecords&&!t?a=>{let c,d,e=l.transitions||(l.transitions=Object.create(null)),f=aw++-b;for(let g in a)if("function"!=typeof a.hasOwnProperty||a.hasOwnProperty(g)){if(d=e[g])e=d;else{let h=Object.keys(a),i=e;e=l.transitions;let j=0;for(let a=0,b=h.length;a<b;a++){let b=h[a];!(d=e[b])&&(d=e[b]=Object.create(null),j++),e=d}f+b+1==aw?(aw--,H(e,h,j)):I(e,h,f,j),c=!0,e=i[g]}B(a[g])}if(!c){let c=e[az];c?g[f+b]=c:I(e,Object.keys(a),f,0)}}:a=>{let b,c=l.transitions||(l.transitions=Object.create(null)),d=0;for(let e in a)("function"!=typeof a.hasOwnProperty||a.hasOwnProperty(e))&&(!(b=c[e])&&(b=c[e]=Object.create(null),d++),c=b);let e=c[az];for(let b in e?e>=96&&t?(g[aw++]=(31&(e-=96))+96,g[aw++]=e>>5):g[aw++]=e:H(c,c.__keys__||Object.keys(a),d),a)("function"!=typeof a.hasOwnProperty||a.hasOwnProperty(b))&&B(a[b])},E="function"==typeof this.useRecords&&this.useRecords,F=E?a=>{E(a)?D(a):C(a)}:D,G=a=>{let c;if(a>0x1000000){if(a-b>av)throw Error("Packed buffer would be larger than maximum buffer size");c=Math.min(av,4096*Math.round(Math.max((a-b)*(a>0x4000000?1.25:2),4194304)/4096))}else c=(Math.max(a-b<<2,g.length-1)>>12)+1<<12;let d=new at(c);return i=d.dataView||(d.dataView=new DataView(d.buffer,0,c)),a=Math.min(a,g.length),g.copy?g.copy(d,0,b,a):d.set(g.slice(b,a)),aw-=b,b=0,j=d.length-10,g=d},H=(a,b,d)=>{let e=l.nextId;e||(e=64),e<u&&this.shouldShareStructure&&!this.shouldShareStructure(b)?((e=l.nextOwnId)<v||(e=u),l.nextOwnId=e+1):(e>=v&&(e=u),l.nextId=e+1);let f=b.highByte=e>=96&&t?e-96>>5:-1;a[az]=e,a.__keys__=b,l[e-64]=b,e<u?(b.isShared=!0,l.sharedLength=e-63,c=!0,f>=0?(g[aw++]=(31&e)+96,g[aw++]=f):g[aw++]=e):(f>=0?(g[aw++]=213,g[aw++]=114,g[aw++]=(31&e)+96,g[aw++]=f):(g[aw++]=212,g[aw++]=114,g[aw++]=e),d&&(x+=y*d),w.length>=s&&(w.shift()[az]=0),w.push(a),B(b))},I=(a,c,d,e)=>{let f=g,i=aw,k=j,l=b;aw=0,b=0,(g=h)||(h=g=new at(8192)),j=g.length-10,H(a,c,e),h=g;let m=aw;if(g=f,aw=i,j=k,b=l,m>1){let a=aw+m-1;a>j&&G(a);let c=d+b;g.copyWithin(c+m,c+1,aw),g.set(h.slice(0,m),c),aw=a}else g[d+b]=h[0]},J=a=>{let d=k(a,g,b,aw,l,G,(a,b,d)=>{if(d)return c=!0;aw=b;let e=g;return(B(a),z(),e!==g)?{position:aw,targetView:i,target:g}:aw},this);if(0===d)return F(a);aw=d}}useBuffer(a){(g=a).dataView||(g.dataView=new DataView(g.buffer,g.byteOffset,g.byteLength)),i=g.dataView,aw=0}set position(a){aw=a}get position(){return aw}clearSharedData(){this.structures&&(this.structures=[]),this.typedStructs&&(this.typedStructs=[])}}function aB(a,b,c,d){let e=a.byteLength;if(e+1<256){var{target:f,position:g}=c(4+e);f[g++]=199,f[g++]=e+1}else if(e+1<65536){var{target:f,position:g}=c(5+e);f[g++]=200,f[g++]=e+1>>8,f[g++]=e+1&255}else{var{target:f,position:g,targetView:h}=c(7+e);f[g++]=201,h.setUint32(g,e+1),g+=4}f[g++]=116,f[g++]=b,a.buffer||(a=new Uint8Array(a)),f.set(new Uint8Array(a.buffer,a.byteOffset,a.byteLength),g)}function aC(a,b){let c=a.byteLength;if(c<256){var d,e,{target:d,position:e}=b(c+2);d[e++]=196,d[e++]=c}else if(c<65536){var{target:d,position:e}=b(c+3);d[e++]=197,d[e++]=c>>8,d[e++]=255&c}else{var{target:d,position:e,targetView:f}=b(c+5);d[e++]=198,f.setUint32(e,c),e+=4}d.set(a,e)}function aD(a,b,c,d){let e=a.length;switch(e){case 1:b[c++]=212;break;case 2:b[c++]=213;break;case 4:b[c++]=214;break;case 8:b[c++]=215;break;case 16:b[c++]=216;break;default:e<256?(b[c++]=199,b[c++]=e):(e<65536?(b[c++]=200,b[c++]=e>>8):(b[c++]=201,b[c++]=e>>24,b[c++]=e>>16&255,b[c++]=e>>8&255),b[c++]=255&e)}return b[c++]=d,b.set(a,c),c+=e}function aE(a,b,c){if(ax.length>0){i.setUint32(ax.position+a,aw+c-ax.position-a),ax.stringsPosition=aw-a;let d=ax;ax=null,b(d[0]),b(d[1])}}function aF(a,b){return a.isCompatible=a=>{let c=!a||(b.lastNamedStructuresLength||0)===a.length;return c||b._mergeStructures(a),c},a}f=[Date,Set,Error,RegExp,ArrayBuffer,Object.getPrototypeOf(Uint8Array.prototype).constructor,DataView,J],e=[{pack(a,b,c){let d=a.getTime()/1e3;if((this.useTimestamp32||0===a.getMilliseconds())&&d>=0&&d<0x100000000){let{target:a,targetView:c,position:e}=b(6);a[e++]=214,a[e++]=255,c.setUint32(e,d)}else if(d>0&&d<0x100000000){let{target:c,targetView:e,position:f}=b(10);c[f++]=215,c[f++]=255,e.setUint32(f,4e6*a.getMilliseconds()+(d/1e3/0x100000000|0)),e.setUint32(f+4,d)}else if(isNaN(d)){if(this.onInvalidDate)return b(0),c(this.onInvalidDate());let{target:a,targetView:d,position:e}=b(3);a[e++]=212,a[e++]=255,a[e++]=255}else{let{target:c,targetView:e,position:f}=b(15);c[f++]=199,c[f++]=12,c[f++]=255,e.setUint32(f,1e6*a.getMilliseconds()),e.setBigInt64(f+4,BigInt(Math.floor(d)))}}},{pack(a,b,c){if(this.setAsEmptyObject)return b(0),c({});let d=Array.from(a),{target:e,position:f}=b(3*!!this.moreTypes);this.moreTypes&&(e[f++]=212,e[f++]=115,e[f++]=0),c(d)}},{pack(a,b,c){let{target:d,position:e}=b(3*!!this.moreTypes);this.moreTypes&&(d[e++]=212,d[e++]=101,d[e++]=0),c([a.name,a.message,a.cause])}},{pack(a,b,c){let{target:d,position:e}=b(3*!!this.moreTypes);this.moreTypes&&(d[e++]=212,d[e++]=120,d[e++]=0),c([a.source,a.flags])}},{pack(a,b){this.moreTypes?aB(a,16,b):aC(as?Buffer.from(a):new Uint8Array(a),b)}},{pack(a,b){let c=a.constructor;c!==au&&this.moreTypes?aB(a,al.indexOf(c.name),b):aC(a,b)}},{pack(a,b){this.moreTypes?aB(a,17,b):aC(as?Buffer.from(a):new Uint8Array(a),b)}},{pack(a,b){let{target:c,position:d}=b(1);c[d]=193}}];let aG=new aA({useRecords:!1});aG.pack,aG.pack;let{NEVER:aH,ALWAYS:aI,DECIMAL_ROUND:aJ,DECIMAL_FIT:aK}={NEVER:0,ALWAYS:1,DECIMAL_ROUND:3,DECIMAL_FIT:4},aL=512,aM=1024,aN=2048,aO=["num","object","string","ascii"];aO[16]="date";let aP=[!1,!0,!0,!1,!1,!0,!0,!1];try{Function(""),l=!0}catch(a){}let aQ="undefined"!=typeof Buffer;try{n=new TextEncoder}catch(a){}let aR=aQ?function(a,b,c){return a.utf8Write(b,c,a.byteLength-c)}:!!n&&!!n.encodeInto&&function(a,b,c){return n.encodeInto(b,a.subarray(c)).written};function aS(a,b,c,d){let e;return(e=a.ascii8||a.num8)?(c.setInt8(b,d,!0),m=b+1,e):(e=a.string16||a.object16)?(c.setInt16(b,d,!0),m=b+2,e):(e=a.num32)?(c.setUint32(b,0xe0000100+d,!0),m=b+4,e):(e=a.num64)?(c.setFloat64(b,NaN,!0),c.setInt8(b,d),m=b+8,e):void(m=b)}function aT(a,b,c){let d=aO[b]+(c<<3),e=a[d]||(a[d]=Object.create(null));return e.__type=b,e.__size=c,e.__parent=a,e}Symbol("type"),Symbol("parent"),k=function a(b,c,d,e,f,g,h,i){let j,k=i.typedStructs||(i.typedStructs=[]),l=c.dataView,n=(k.lastStringStart||100)+e,o=c.length-10,p=e;e>o&&(l=(c=g(e)).dataView,e-=d,p-=d,n-=d,d=0,o=c.length-10);let q,r=n,s=k.transitions||(k.transitions=Object.create(null)),t=k.nextId||k.length,u=t<15?1:t<240?2:t<61440?3:4*(t<0xf00000);if(0===u)return 0;e+=u;let v=[],w=0;for(let a in b){let f=b[a],i=s[a];switch(!i&&(s[a]=i={key:a,parent:s,enumerationOffset:0,ascii0:null,ascii8:null,num8:null,string16:null,object16:null,num32:null,float64:null,date64:null}),e>o&&(l=(c=g(e)).dataView,e-=d,p-=d,n-=d,r-=d,d=0,o=c.length-10),typeof f){case"number":if(t<200||!i.num64){if((0|f)===f&&f<0x20000000&&f>-0x1f000000){f<246&&f>=0&&(i.num8&&!(t>200&&i.num32)||f<32&&!i.num32)?(s=i.num8||aT(i,0,1),c[e++]=f):(s=i.num32||aT(i,0,4),l.setUint32(e,f,!0),e+=4);break}else if(f<0x100000000&&f>=-0x80000000&&(l.setFloat32(e,f,!0),aP[c[e+3]>>>5])){let a;if((0|(a=f*aq[(127&c[e+3])<<1|c[e+2]>>7]))===a){s=i.num32||aT(i,0,4),e+=4;break}}}s=i.num64||aT(i,0,8),l.setFloat64(e,f,!0),e+=8;break;case"string":let u,x=f.length;if(q=r-n,(x<<2)+r>o&&(l=(c=g((x<<2)+r)).dataView,e-=d,p-=d,n-=d,r-=d,d=0,o=c.length-10),x>65280+q>>2){v.push(a,f,e-p);break}let y=r;if(x<64){let a,b,d;for(a=0;a<x;a++)(b=f.charCodeAt(a))<128?c[r++]=b:(b<2048?(u=!0,c[r++]=b>>6|192):((64512&b)==55296&&(64512&(d=f.charCodeAt(a+1)))==56320?(u=!0,b=65536+((1023&b)<<10)+(1023&d),a++,c[r++]=b>>18|240,c[r++]=b>>12&63|128):(u=!0,c[r++]=b>>12|224),c[r++]=b>>6&63|128),c[r++]=63&b|128)}else r+=aR(c,f,r),u=r-y>x;if(q<160||q<246&&(i.ascii8||i.string8)){if(u)(s=i.string8)||(k.length>10&&(s=i.ascii8)?(s.__type=2,i.ascii8=null,i.string8=s,h(null,0,!0)):s=aT(i,2,1));else if(0!==q||j)(s=i.ascii8)||k.length>10&&(s=i.string8)||(s=aT(i,3,1));else{j=!0,s=i.ascii0||aT(i,3,0);break}c[e++]=q}else s=i.string16||aT(i,2,2),l.setUint16(e,q,!0),e+=2;break;case"object":f?f.constructor===Date?(s=i.date64||aT(i,16,8),l.setFloat64(e,f.getTime(),!0),e+=8):v.push(a,f,w):(i=aS(i,e,l,-10))?(s=i,e=m):v.push(a,f,w);break;case"boolean":s=i.num8||i.ascii8||aT(i,0,1),c[e++]=f?249:248;break;case"undefined":(i=aS(i,e,l,-9))?(s=i,e=m):v.push(a,f,w);break;default:v.push(a,f,w)}w++}for(let a=0,b=v.length;a<b;){let b,f=v[a++],g=v[a++],i=v[a++],j=s[f];if(j||(s[f]=j={key:f,parent:s,enumerationOffset:i-w,ascii0:null,ascii8:null,num8:null,string16:null,object16:null,num32:null,float64:null}),g){let a;(q=r-n)<65280?(s=j.object16)?a=2:(s=j.object32)?a=4:(s=aT(j,1,2),a=2):(s=j.object32||aT(j,1,4),a=4),"object"==typeof(b=h(g,r))?(r=b.position,l=b.targetView,c=b.target,n-=d,e-=d,p-=d,d=0):r=b,2===a?(l.setUint16(e,q,!0),e+=2):(l.setUint32(e,q,!0),e+=4)}else s=j.object16||aT(j,1,2),l.setInt16(e,null===g?-10:-9,!0),e+=2;w++}let x=s[az];if(null==x){let a;x=i.typedStructs.length;let b=[],c=s;for(;void 0!==(a=c.__type);){let d=[a,c.__size,(c=c.__parent).key];c.enumerationOffset&&d.push(c.enumerationOffset),b.push(d),c=c.parent}b.reverse(),s[az]=x,i.typedStructs[x]=b,h(null,0,!0)}switch(u){case 1:if(x>=16)return 0;c[p]=x+32;break;case 2:if(x>=256)return 0;c[p]=56,c[p+1]=x;break;case 3:if(x>=65536)return 0;c[p]=57,l.setUint16(p+1,x,!0);break;case 4:if(x>=0x1000000)return 0;l.setUint32(p,(x<<8)+58,!0)}if(e<n){if(n===r)return e;c.copyWithin(e,n,r),r+=e-n,k.lastStringStart=e-p}else if(e>n)return n===r?e:(k.lastStringStart=e-p,a(b,c,d,p,f,g,h,i));return r},aF=function(a,b){if(b.typedStructs){let c=new Map;c.set("named",a),c.set("typed",b.typedStructs),a=c}let c=b.lastTypedStructuresLength||0;return a.isCompatible=a=>{let d=!0;return a instanceof Map?((a.get("named")||[]).length!==(b.lastNamedStructuresLength||0)&&(d=!1),(a.get("typed")||[]).length!==c&&(d=!1)):(a instanceof Array||Array.isArray(a))&&a.length!==(b.lastNamedStructuresLength||0)&&(d=!1),d||b._mergeStructures(a),d},b.lastTypedStructuresLength=b.typedStructs&&b.typedStructs.length,a};var aU=Symbol.for("source");function aV(a){switch(a){case 246:return null;case 247:return;case 248:return!1;case 249:return!0}throw Error("Unknown constant")}x=function(a,b,c,d){let e=a[b++]-32;if(e>=24)switch(e){case 24:e=a[b++];break;case 25:e=a[b++]+(a[b++]<<8);break;case 26:e=a[b++]+(a[b++]<<8)+(a[b++]<<16);break;case 27:e=a[b++]+(a[b++]<<8)+(a[b++]<<16)+(a[b++]<<24)}let f=d.typedStructs&&d.typedStructs[e];if(!f){if(a=Uint8Array.prototype.slice.call(a,b,c),c-=b,b=0,!d.getStructures)throw Error(`Reference to shared structure ${e} without getStructures method`);if(d._mergeStructures(d.getStructures()),!d.typedStructs)throw Error("Could not find any shared typed structures");if(d.lastTypedStructuresLength=d.typedStructs.length,!(f=d.typedStructs[e]))throw Error("Could not find typed structure "+e)}var g=f.construct,h=f.fullConstruct;if(!g){let a;g=f.construct=function(){},(h=f.fullConstruct=function(){}).prototype=d.structPrototype||{};var i=g.prototype=d.structPrototype?Object.create(d.structPrototype):{};let b=[],c=0;for(let e=0,g=f.length;e<g;e++){let g,h,[i,j,k,l]=f[e];"__proto__"===k&&(k="__proto_");let m={key:k,offset:c};switch(l?b.splice(e+l,0,m):b.push(m),j){case 0:g=()=>0;break;case 1:g=(a,b)=>{let c=a.bytes[b+m.offset];return c>=246?aV(c):c};break;case 2:g=(a,b)=>{let c=a.bytes,d=(c.dataView||(c.dataView=new DataView(c.buffer,c.byteOffset,c.byteLength))).getUint16(b+m.offset,!0);return d>=65280?aV(255&d):d};break;case 4:g=(a,b)=>{let c=a.bytes,d=(c.dataView||(c.dataView=new DataView(c.buffer,c.byteOffset,c.byteLength))).getUint32(b+m.offset,!0);return d>=0xffffff00?aV(255&d):d}}switch(m.getRef=g,c+=j,i){case 3:a&&!a.next&&(a.next=m),a=m,m.multiGetCount=0,h=function(a){let b=a.bytes,d=a.position,e=c+d,f=g(a,d);if("number"!=typeof f)return f;let h,i=m.next;for(;i&&"number"!=typeof(h=i.getRef(a,d));)h=null,i=i.next;return(null==h&&(h=a.bytesEnd-e),a.srcString)?a.srcString.slice(f,h):function(a,b,c){let d=q;q=a,A=b;try{return Z(c)}finally{q=d}}(b,f+e,h-f)};break;case 2:case 1:a&&!a.next&&(a.next=m),a=m,h=function(a){let b=a.position,e=c+b,f=g(a,b);if("number"!=typeof f)return f;let h=a.bytes,j,k=m.next;for(;k&&"number"!=typeof(j=k.getRef(a,b));)j=null,k=k.next;if(null==j&&(j=a.bytesEnd-e),2===i)return h.toString("utf8",f+e,j+e);o=a;try{return d.unpack(h,{start:f+e,end:j+e})}finally{o=null}};break;case 0:switch(j){case 4:h=function(a){let b=a.bytes,c=b.dataView||(b.dataView=new DataView(b.buffer,b.byteOffset,b.byteLength)),d=a.position+m.offset,e=c.getInt32(d,!0);if(e<0x20000000){if(e>-0x1f000000)return e;if(e>-0x20000000)return aV(255&e)}let f=c.getFloat32(d,!0),g=aq[(127&b[d+3])<<1|b[d+2]>>7];return(g*f+(f>0?.5:-.5)|0)/g};break;case 8:h=function(a){let b=a.bytes,c=(b.dataView||(b.dataView=new DataView(b.buffer,b.byteOffset,b.byteLength))).getFloat64(a.position+m.offset,!0);if(isNaN(c)){let c=b[a.position+m.offset];if(c>=246)return aV(c)}return c};break;case 1:h=function(a){let b=a.bytes[a.position+m.offset];return b<246?b:aV(b)}}break;case 16:h=function(a){let b=a.bytes;return new Date((b.dataView||(b.dataView=new DataView(b.buffer,b.byteOffset,b.byteLength))).getFloat64(a.position+m.offset,!0))}}m.get=h}if(l){let a,c=[],e=[],f=0;for(let g of b){if(d.alwaysLazyProperty&&d.alwaysLazyProperty(g.key)){a=!0;continue}Object.defineProperty(i,g.key,{get:function(a){return function(){return a(this[aU])}}(g.get),enumerable:!0});let b="v"+f++;e.push(b),c.push("o["+JSON.stringify(g.key)+"]="+b+"(s)")}a&&c.push("__proto__:this");let g=Function(...e,"var c=this;return function(s){var o=new c();"+c.join(";")+";return o;}").apply(h,b.map(a=>a.get));Object.defineProperty(i,"toJSON",{value(a){return g.call(this,this[aU])}})}else Object.defineProperty(i,"toJSON",{value(a){let c={};for(let a=0,d=b.length;a<d;a++){let d=b[a].key;c[d]=this[d]}return c}})}var j=new g;return j[aU]={bytes:a,position:b,srcString:"",bytesEnd:c},j},y=function(a){if(!(a instanceof Map))return a;let b=a.get("typed")||[];Object.isFrozen(b)&&(b=b.map(a=>a.slice(0)));let c=a.get("named"),d=Object.create(null);for(let a=0,c=b.length;a<c;a++){let c=b[a],e=d;for(let[a,b,d]of c){let c=e[d];c||(e[d]=c={key:d,parent:e,enumerationOffset:0,ascii0:null,ascii8:null,num8:null,string16:null,object16:null,num32:null,float64:null,date64:null}),e=aT(c,a,b)}e[az]=a}return b.transitions=d,this.typedStructs=b,this.lastTypedStructuresLength=b.length,c},z=function(){o&&(o.bytes=Uint8Array.prototype.slice.call(o.bytes,o.position,o.bytesEnd),o.position=0,o.bytesEnd=o.bytes.length)};var aW=c(27910);aW.Transform,aW.Transform;var aX=c(8086);if(void 0===process.env.MSGPACKR_NATIVE_ACCELERATION_DISABLED||"true"!==process.env.MSGPACKR_NATIVE_ACCELERATION_DISABLED.toLowerCase()){let a;try{(a="function"==typeof require?require("msgpackr-extract"):(0,aX.createRequire)("file:///C:/Users/karim/Github/yaad/node_modules/.pnpm/msgpackr@1.11.5/node_modules/msgpackr/node-index.js")("msgpackr-extract"))&&function(a){function b(b){return function(c){let d=C[D++];if(null==d){if(u)return Z(c);let e=q.byteOffset,f=a(A-b+e,r+e,q.buffer);if("string"==typeof f)d=f,C=B;else if(D=1,G=1,void 0===(d=(C=f)[0]))throw Error("Unexpected end of buffer")}let e=d.length;return e<=c?(A+=c,d):(t=d,F=A,G=A+e,A+=c,d.slice(0,c))}}V=b(1),W=b(2),X=b(3),Y=b(5)}(a.extractStrings)}catch(a){}}var aY=c(29196),aZ=c(50685),a$=c(70359),a_=c(98783);let a0=new aA({useRecords:!1,encodeUndefinedAsNil:!0}).pack;class a1{constructor(a){this.queue=a,this.version=a$.r;let b=this.queue.keys;this.moveToFinishedKeys=[b.wait,b.active,b.prioritized,b.events,b.stalled,b.limiter,b.delayed,b.paused,b.meta,b.pc,void 0,void 0,void 0,void 0]}execCommand(a,b,c){return a[`${b}:${this.version}`](c)}async isJobInList(a,b){let c=await this.queue.client;return Number.isInteger((0,aZ.dP)(this.queue.redisVersion,"6.0.6",this.queue.databaseType)?await this.execCommand(c,"isJobInList",[a,b]):await c.lpos(a,b))}addDelayedJobArgs(a,b,c){let d=this.queue.keys,e=[d.marker,d.meta,d.id,d.delayed,d.completed,d.events];return e.push(a0(c),a.data,b),e}addDelayedJob(a,b,c,d){let e=this.addDelayedJobArgs(b,c,d);return this.execCommand(a,"addDelayedJob",e)}addPrioritizedJobArgs(a,b,c){let d=this.queue.keys,e=[d.marker,d.meta,d.id,d.prioritized,d.delayed,d.completed,d.active,d.events,d.pc];return e.push(a0(c),a.data,b),e}addPrioritizedJob(a,b,c,d){let e=this.addPrioritizedJobArgs(b,c,d);return this.execCommand(a,"addPrioritizedJob",e)}addParentJobArgs(a,b,c){let d=this.queue.keys,e=[d.meta,d.id,d.delayed,d["waiting-children"],d.completed,d.events];return e.push(a0(c),a.data,b),e}addParentJob(a,b,c,d){let e=this.addParentJobArgs(b,c,d);return this.execCommand(a,"addParentJob",e)}addStandardJobArgs(a,b,c){let d=this.queue.keys,e=[d.wait,d.paused,d.meta,d.id,d.completed,d.delayed,d.active,d.events,d.marker];return e.push(a0(c),a.data,b),e}addStandardJob(a,b,c,d){let e=this.addStandardJobArgs(b,c,d);return this.execCommand(a,"addStandardJob",e)}async addJob(a,b,c,d,e={}){let f,g,h=this.queue.keys,i=b.parent,j=[h[""],void 0!==d?d:"",b.name,b.timestamp,b.parentKey||null,e.parentDependenciesKey||null,i,b.repeatJobKey,b.deduplicationId?`${h.de}:${b.deduplicationId}`:null];if(c.repeat){let a=Object.assign({},c.repeat);a.startDate&&(a.startDate=+new Date(a.startDate)),a.endDate&&(a.endDate=+new Date(a.endDate)),f=a0(Object.assign(Object.assign({},c),{repeat:a}))}else f=a0(c);if((g=e.addToWaitingChildren?await this.addParentJob(a,b,f,j):"number"==typeof c.delay&&c.delay>0?await this.addDelayedJob(a,b,f,j):c.priority?await this.addPrioritizedJob(a,b,f,j):await this.addStandardJob(a,b,f,j))<0)throw this.finishedErrors({code:g,parentKey:e.parentKey,command:"addJob"});return g}pauseArgs(a){let b="wait",c="paused";a||(b="paused",c="wait");let d=[b,c,"meta","prioritized"].map(a=>this.queue.toKey(a));return d.push(this.queue.keys.events,this.queue.keys.delayed,this.queue.keys.marker),d.concat([a?"paused":"resumed"])}async pause(a){let b=await this.queue.client,c=this.pauseArgs(a);return this.execCommand(b,"pause",c)}addRepeatableJobArgs(a,b,c,d){let e=this.queue.keys;return[e.repeat,e.delayed].concat([b,a0(c),d,a,e[""]])}async addRepeatableJob(a,b,c,d){let e=await this.queue.client,f=this.addRepeatableJobArgs(a,b,c,d);return this.execCommand(e,"addRepeatableJob",f)}async removeDeduplicationKey(a,b){let c=await this.queue.client,d=this.queue.keys,e=[`${d.de}:${a}`];return this.execCommand(c,"removeDeduplicationKey",e.concat([b]))}async addJobScheduler(a,b,c,d,e,f,g){let h=await this.queue.client,i=this.queue.keys,j=[i.repeat,i.delayed,i.wait,i.paused,i.meta,i.prioritized,i.marker,i.id,i.events,i.pc,i.active],k=[b,a0(e),a,c,a0(d),a0(f),Date.now(),i[""],g?this.queue.toKey(g):""],l=await this.execCommand(h,"addJobScheduler",j.concat(k));if("number"==typeof l&&l<0)throw this.finishedErrors({code:l,command:"addJobScheduler"});return l}async updateRepeatableJobMillis(a,b,c,d){let e=[this.queue.keys.repeat,c,b,d];return this.execCommand(a,"updateRepeatableJobMillis",e)}async updateJobSchedulerNextMillis(a,b,c,d,e){let f=await this.queue.client,g=this.queue.keys,h=[g.repeat,g.delayed,g.wait,g.paused,g.meta,g.prioritized,g.marker,g.id,g.events,g.pc,e?this.queue.toKey(e):"",g.active],i=[b,a,c,a0(d),Date.now(),g[""],e];return this.execCommand(f,"updateJobScheduler",h.concat(i))}removeRepeatableArgs(a,b,c){let d=this.queue.keys;return[d.repeat,d.delayed,d.events].concat([a,this.getRepeatConcatOptions(b,c),c,d[""]])}getRepeatConcatOptions(a,b){return b&&b.split(":").length>2?b:a}async removeRepeatable(a,b,c){let d=await this.queue.client,e=this.removeRepeatableArgs(a,b,c);return this.execCommand(d,"removeRepeatable",e)}async removeJobScheduler(a){let b=await this.queue.client,c=this.queue.keys,d=[c.repeat,c.delayed,c.events],e=[a,c[""]];return this.execCommand(b,"removeJobScheduler",d.concat(e))}removeArgs(a,b){let c=[a,"repeat"].map(a=>this.queue.toKey(a)),d=[a,+!!b,this.queue.toKey("")];return c.concat(d)}async remove(a,b){let c=await this.queue.client,d=this.removeArgs(a,b),e=await this.execCommand(c,"removeJob",d);if(e<0)throw this.finishedErrors({code:e,jobId:a,command:"removeJob"});return e}async removeUnprocessedChildren(a){let b=await this.queue.client,c=[this.queue.toKey(a),this.queue.keys.meta,this.queue.toKey(""),a];await this.execCommand(b,"removeUnprocessedChildren",c)}async extendLock(a,b,c,d){d=d||await this.queue.client;let e=[this.queue.toKey(a)+":lock",this.queue.keys.stalled,b,c,a];return this.execCommand(d,"extendLock",e)}async extendLocks(a,b,c){let d=await this.queue.client,e=[this.queue.keys.stalled,this.queue.toKey(""),a0(b),a0(a),c];return this.execCommand(d,"extendLocks",e)}async updateData(a,b){let c=await this.queue.client,d=[this.queue.toKey(a.id)],e=JSON.stringify(b),f=await this.execCommand(c,"updateData",d.concat([e]));if(f<0)throw this.finishedErrors({code:f,jobId:a.id,command:"updateData"})}async updateProgress(a,b){let c=await this.queue.client,d=[this.queue.toKey(a),this.queue.keys.events,this.queue.keys.meta],e=JSON.stringify(b),f=await this.execCommand(c,"updateProgress",d.concat([a,e]));if(f<0)throw this.finishedErrors({code:f,jobId:a,command:"updateProgress"})}async addLog(a,b,c){let d=await this.queue.client,e=[this.queue.toKey(a),this.queue.toKey(a)+":logs"],f=await this.execCommand(d,"addLog",e.concat([a,b,c||""]));if(f<0)throw this.finishedErrors({code:f,jobId:a,command:"addLog"});return f}moveToFinishedArgs(a,b,c,d,e,f,g,h=!0,i){var j,k,l,m,n,o,p;let q=this.queue.keys,r=this.queue.opts,s="completed"===e?r.removeOnComplete:r.removeOnFail,t=this.queue.toKey(`metrics:${e}`),u=this.moveToFinishedKeys;u[10]=q[e],u[11]=this.queue.toKey(null!=(j=a.id)?j:""),u[12]=t,u[13]=this.queue.keys.marker;let v=this.getKeepJobs(d,s),w=[a.id,g,c,void 0===b?"null":b,e,!h||this.queue.closing?0:1,q[""],a0({token:f,name:r.name,keepJobs:v,limiter:r.limiter,lockDuration:r.lockDuration,attempts:a.opts.attempts,maxMetricsSize:(null==(k=r.metrics)?void 0:k.maxDataPoints)?null==(l=r.metrics)?void 0:l.maxDataPoints:"",fpof:!!(null==(m=a.opts)?void 0:m.failParentOnFailure),cpof:!!(null==(n=a.opts)?void 0:n.continueParentOnFailure),idof:!!(null==(o=a.opts)?void 0:o.ignoreDependencyOnFailure),rdof:!!(null==(p=a.opts)?void 0:p.removeDependencyOnFailure)}),i?a0((0,aZ.HD)(i)):void 0];return u.concat(w)}getKeepJobs(a,b){return void 0===a?b||{count:a?0:-1}:"object"==typeof a?a:"number"==typeof a?{count:a}:{count:a?0:-1}}async moveToFinished(a,b){let c=await this.queue.client,d=await this.execCommand(c,"moveToFinished",b);if(d<0)throw this.finishedErrors({code:d,jobId:a,command:"moveToFinished",state:"active"});if(void 0!==d)return a2(d)}drainArgs(a){let b=this.queue.keys;return[b.wait,b.paused,b.delayed,b.prioritized,b.repeat].concat([b[""],a?"1":"0"])}async drain(a){let b=await this.queue.client,c=this.drainArgs(a);return this.execCommand(b,"drain",c)}removeChildDependencyArgs(a,b){return[this.queue.keys[""]].concat([this.queue.toKey(a),b])}async removeChildDependency(a,b){let c=await this.queue.client,d=this.removeChildDependencyArgs(a,b),e=await this.execCommand(c,"removeChildDependency",d);switch(e){case 0:return!0;case 1:return!1;default:throw this.finishedErrors({code:e,jobId:a,parentKey:b,command:"removeChildDependency"})}}getRangesArgs(a,b,c,d){let e=this.queue.keys,f=a.map(a=>"waiting"===a?"wait":a);return[e[""]].concat([b,c,d?"1":"0",...f])}async getRanges(a,b=0,c=1,d=!1){let e=await this.queue.client,f=this.getRangesArgs(a,b,c,d);return await this.execCommand(e,"getRanges",f)}getCountsArgs(a){let b=this.queue.keys,c=a.map(a=>"waiting"===a?"wait":a);return[b[""]].concat([...c])}async getCounts(a){let b=await this.queue.client,c=this.getCountsArgs(a);return await this.execCommand(b,"getCounts",c)}getCountsPerPriorityArgs(a){return[this.queue.keys.wait,this.queue.keys.paused,this.queue.keys.meta,this.queue.keys.prioritized].concat(a)}async getCountsPerPriority(a){let b=await this.queue.client,c=this.getCountsPerPriorityArgs(a);return await this.execCommand(b,"getCountsPerPriority",c)}getDependencyCountsArgs(a,b){return[`${a}:processed`,`${a}:dependencies`,`${a}:failed`,`${a}:unsuccessful`].map(a=>this.queue.toKey(a)).concat(b)}async getDependencyCounts(a,b){let c=await this.queue.client,d=this.getDependencyCountsArgs(a,b);return await this.execCommand(c,"getDependencyCounts",d)}moveToCompletedArgs(a,b,c,d,e=!1){let f=Date.now();return this.moveToFinishedArgs(a,b,"returnvalue",c,"completed",d,f,e)}moveToFailedArgs(a,b,c,d,e=!1,f){let g=Date.now();return this.moveToFinishedArgs(a,b,"failedReason",c,"failed",d,g,e,f)}async isFinished(a,b=!1){let c=await this.queue.client,d=["completed","failed",a].map(a=>this.queue.toKey(a));return this.execCommand(c,"isFinished",d.concat([a,b?"1":""]))}async getState(a){let b=await this.queue.client,c=["completed","failed","delayed","active","wait","paused","waiting-children","prioritized"].map(a=>this.queue.toKey(a));return(0,aZ.dP)(this.queue.redisVersion,"6.0.6",this.queue.databaseType)?this.execCommand(b,"getState",c.concat([a])):this.execCommand(b,"getStateV2",c.concat([a]))}async changeDelay(a,b){let c=await this.queue.client,d=this.changeDelayArgs(a,b),e=await this.execCommand(c,"changeDelay",d);if(e<0)throw this.finishedErrors({code:e,jobId:a,command:"changeDelay",state:"delayed"})}changeDelayArgs(a,b){let c=Date.now();return[this.queue.keys.delayed,this.queue.keys.meta,this.queue.keys.marker,this.queue.keys.events].concat([b,JSON.stringify(c),a,this.queue.toKey(a)])}async changePriority(a,b=0,c=!1){let d=await this.queue.client,e=this.changePriorityArgs(a,b,c),f=await this.execCommand(d,"changePriority",e);if(f<0)throw this.finishedErrors({code:f,jobId:a,command:"changePriority"})}changePriorityArgs(a,b=0,c=!1){return[this.queue.keys.wait,this.queue.keys.paused,this.queue.keys.meta,this.queue.keys.prioritized,this.queue.keys.active,this.queue.keys.pc,this.queue.keys.marker].concat([b,this.queue.toKey(""),a,+!!c])}moveToDelayedArgs(a,b,c,d,e={}){let f=this.queue.keys;return[f.marker,f.active,f.prioritized,f.delayed,this.queue.toKey(a),f.events,f.meta,f.stalled].concat([this.queue.keys[""],b,a,c,d,e.skipAttempt?"1":"0",e.fieldsToUpdate?a0((0,aZ.HD)(e.fieldsToUpdate)):void 0])}moveToWaitingChildrenArgs(a,b,c){let d=Date.now(),e=(0,aZ.Ie)(c.child);return["active","waiting-children",a,`${a}:dependencies`,`${a}:unsuccessful`,"stalled","events"].map(a=>this.queue.toKey(a)).concat([b,null!=e?e:"",JSON.stringify(d),a,this.queue.toKey("")])}isMaxedArgs(){let a=this.queue.keys;return[a.meta,a.active]}async isMaxed(){let a=await this.queue.client,b=this.isMaxedArgs();return!!await this.execCommand(a,"isMaxed",b)}async moveToDelayed(a,b,c,d="0",e={}){let f=await this.queue.client,g=this.moveToDelayedArgs(a,b,d,c,e),h=await this.execCommand(f,"moveToDelayed",g);if(h<0)throw this.finishedErrors({code:h,jobId:a,command:"moveToDelayed",state:"active"})}async moveToWaitingChildren(a,b,c={}){let d=await this.queue.client,e=this.moveToWaitingChildrenArgs(a,b,c),f=await this.execCommand(d,"moveToWaitingChildren",e);switch(f){case 0:return!0;case 1:return!1;default:throw this.finishedErrors({code:f,jobId:a,command:"moveToWaitingChildren",state:"active"})}}getRateLimitTtlArgs(a){return[this.queue.keys.limiter,this.queue.keys.meta].concat([null!=a?a:"0"])}async getRateLimitTtl(a){let b=await this.queue.client,c=this.getRateLimitTtlArgs(a);return this.execCommand(b,"getRateLimitTtl",c)}async cleanJobsInSet(a,b,c=0){let d=await this.queue.client;return this.execCommand(d,"cleanJobsInSet",[this.queue.toKey(a),this.queue.toKey("events"),this.queue.toKey("repeat"),this.queue.toKey(""),b,c,a])}getJobSchedulerArgs(a){return[this.queue.keys.repeat].concat([a])}async getJobScheduler(a){let b=await this.queue.client,c=this.getJobSchedulerArgs(a);return this.execCommand(b,"getJobScheduler",c)}retryJobArgs(a,b,c,d={}){return[this.queue.keys.active,this.queue.keys.wait,this.queue.keys.paused,this.queue.toKey(a),this.queue.keys.meta,this.queue.keys.events,this.queue.keys.delayed,this.queue.keys.prioritized,this.queue.keys.pc,this.queue.keys.marker,this.queue.keys.stalled].concat([this.queue.toKey(""),Date.now(),(b?"R":"L")+"PUSH",a,c,d.fieldsToUpdate?a0((0,aZ.HD)(d.fieldsToUpdate)):void 0])}async retryJob(a,b,c="0",d={}){let e=await this.queue.client,f=this.retryJobArgs(a,b,c,d),g=await this.execCommand(e,"retryJob",f);if(g<0)throw this.finishedErrors({code:g,jobId:a,command:"retryJob",state:"active"})}moveJobsToWaitArgs(a,b,c){return[this.queue.toKey(""),this.queue.keys.events,this.queue.toKey(a),this.queue.toKey("wait"),this.queue.toKey("paused"),this.queue.keys.meta,this.queue.keys.active,this.queue.keys.marker].concat([b,c,a])}async retryJobs(a="failed",b=1e3,c=new Date().getTime()){let d=await this.queue.client,e=this.moveJobsToWaitArgs(a,b,c);return this.execCommand(d,"moveJobsToWait",e)}async promoteJobs(a=1e3){let b=await this.queue.client,c=this.moveJobsToWaitArgs("delayed",a,Number.MAX_VALUE);return this.execCommand(b,"moveJobsToWait",c)}async reprocessJob(a,b,c={}){let d=await this.queue.client,e=[this.queue.toKey(a.id),this.queue.keys.events,this.queue.toKey(b),this.queue.keys.wait,this.queue.keys.meta,this.queue.keys.paused,this.queue.keys.active,this.queue.keys.marker],f=[a.id,(a.opts.lifo?"R":"L")+"PUSH","failed"===b?"failedReason":"returnvalue",b,c.resetAttemptsMade?"1":"0",c.resetAttemptsStarted?"1":"0"],g=await this.execCommand(d,"reprocessJob",e.concat(f));if(1!==g)throw this.finishedErrors({code:g,jobId:a.id,command:"reprocessJob",state:b})}async getMetrics(a,b=0,c=-1){let d=await this.queue.client,e=[this.queue.toKey(`metrics:${a}`),this.queue.toKey(`metrics:${a}:data`)];return await this.execCommand(d,"getMetrics",e.concat([b,c]))}async moveToActive(a,b,c){let d=this.queue.opts,e=this.queue.keys,f=[e.wait,e.active,e.prioritized,e.events,e.stalled,e.limiter,e.delayed,e.paused,e.meta,e.pc,e.marker],g=[e[""],Date.now(),a0({token:b,lockDuration:d.lockDuration,limiter:d.limiter,name:c})];return a2(await this.execCommand(a,"moveToActive",f.concat(g)))}async promote(a){let b=await this.queue.client,c=[this.queue.keys.delayed,this.queue.keys.wait,this.queue.keys.paused,this.queue.keys.meta,this.queue.keys.prioritized,this.queue.keys.active,this.queue.keys.pc,this.queue.keys.events,this.queue.keys.marker],d=[this.queue.toKey(""),a],e=await this.execCommand(b,"promote",c.concat(d));if(e<0)throw this.finishedErrors({code:e,jobId:a,command:"promote",state:"delayed"})}moveStalledJobsToWaitArgs(){let a=this.queue.opts;return[this.queue.keys.stalled,this.queue.keys.wait,this.queue.keys.active,this.queue.keys["stalled-check"],this.queue.keys.meta,this.queue.keys.paused,this.queue.keys.marker,this.queue.keys.events].concat([a.maxStalledCount,this.queue.toKey(""),Date.now(),a.stalledInterval])}async moveStalledJobsToWait(){let a=await this.queue.client,b=this.moveStalledJobsToWaitArgs();return this.execCommand(a,"moveStalledJobsToWait",b)}async moveJobFromActiveToWait(a,b="0"){let c=await this.queue.client,d=[this.queue.keys.active,this.queue.keys.wait,this.queue.keys.stalled,this.queue.keys.paused,this.queue.keys.meta,this.queue.keys.limiter,this.queue.keys.prioritized,this.queue.keys.marker,this.queue.keys.events],e=[a,b,this.queue.toKey(a)],f=await this.execCommand(c,"moveJobFromActiveToWait",d.concat(e));if(f<0)throw this.finishedErrors({code:f,jobId:a,command:"moveJobFromActiveToWait",state:"active"});return f}async obliterate(a){let b=await this.queue.client,c=[this.queue.keys.meta,this.queue.toKey("")],d=[a.count,a.force?"force":null],e=await this.execCommand(b,"obliterate",c.concat(d));if(e<0)switch(e){case -1:throw Error("Cannot obliterate non-paused queue");case -2:throw Error("Cannot obliterate queue with active jobs")}return e}async paginate(a,b){let c=await this.queue.client,d=[a],e=b.end>=0?b.end-b.start+1:1/0,f="0",g=0,h,i,j,k=[],l=[];do{let a=[b.start+k.length,b.end,f,g,5];b.fetchJobs&&a.push(1),[f,g,h,i,j]=await this.execCommand(c,"paginate",d.concat(a)),k=k.concat(h),j&&j.length&&(l=l.concat(j.map(aZ.BC)))}while("0"!=f&&k.length<e);if(!(k.length&&Array.isArray(k[0])))return{cursor:f,items:k.map(a=>({id:a})),total:i,jobs:l};{let a=[];for(let b=0;b<k.length;b++){let[c,d]=k[b];try{a.push({id:c,v:JSON.parse(d)})}catch(b){a.push({id:c,err:b.message})}}return{cursor:f,items:a,total:i,jobs:l}}}finishedErrors({code:a,jobId:b,parentKey:c,command:d,state:e}){let f;switch(a){case aY.O4.JobNotExist:f=Error(`Missing key for job ${b}. ${d}`);break;case aY.O4.JobLockNotExist:f=Error(`Missing lock for job ${b}. ${d}`);break;case aY.O4.JobNotInState:f=Error(`Job ${b} is not in the ${e} state. ${d}`);break;case aY.O4.JobPendingChildren:f=Error(`Job ${b} has pending dependencies. ${d}`);break;case aY.O4.ParentJobNotExist:f=Error(`Missing key for parent job ${c}. ${d}`);break;case aY.O4.JobLockMismatch:f=Error(`Lock mismatch for job ${b}. Cmd ${d} from ${e}`);break;case aY.O4.ParentJobCannotBeReplaced:f=Error(`The parent job ${c} cannot be replaced. ${d}`);break;case aY.O4.JobBelongsToJobScheduler:f=Error(`Job ${b} belongs to a job scheduler and cannot be removed directly. ${d}`);break;case aY.O4.JobHasFailedChildren:f=new a_.uC(`Cannot complete job ${b} because it has at least one failed child. ${d}`);break;case aY.O4.SchedulerJobIdCollision:f=Error(`Cannot create job scheduler iteration - job ID already exists. ${d}`);break;case aY.O4.SchedulerJobSlotsBusy:f=Error(`Cannot create job scheduler iteration - current and next time slots already have jobs. ${d}`);break;default:f=Error(`Unknown code ${a} error for ${b}. ${d}`)}return f.code=a,f}async removeOrphanedJobs(a,b,c){let d=await this.queue.client,e=[this.queue.toKey(""),b.length,...b,c.length,...c,...a];return this.execCommand(d,"removeOrphanedJobs",e)}}function a2(a){if(a){let b=[null,a[1],a[2],a[3]];return a[0]&&(b[0]=(0,aZ.BC)(a[0])),b}return[]}},80755:(a,b,c)=>{"use strict";Object.defineProperty(b,"__esModule",{value:!0});let d=c(27910);class e extends d.Readable{constructor(a){super(a),this.opt=a,this._redisCursor="0",this._redisDrained=!1}_read(){if(this._redisDrained)return void this.push(null);let a=[this._redisCursor];this.opt.key&&a.unshift(this.opt.key),this.opt.match&&a.push("MATCH",this.opt.match),this.opt.type&&a.push("TYPE",this.opt.type),this.opt.count&&a.push("COUNT",String(this.opt.count)),this.opt.noValues&&a.push("NOVALUES"),this.opt.redis[this.opt.command](a,(a,b)=>{if(a)return void this.emit("error",a);this._redisCursor=b[0]instanceof Buffer?b[0].toString():b[0],"0"===this._redisCursor&&(this._redisDrained=!0),this.push(b[1])})}close(){this._redisDrained=!0}}b.default=e},81200:(a,b,c)=>{"use strict";let d=c(35463);a.exports=(a,b,c)=>0===d(a,b,c)},83503:(a,b)=>{"use strict";Object.defineProperty(b,"__esModule",{value:!0});class c{constructor(a){this.cursor=0,this.sentinels=a.slice(0)}next(){let a=this.cursor>=this.sentinels.length;return{done:a,value:a?void 0:this.sentinels[this.cursor++]}}reset(a){a&&this.sentinels.length>1&&1!==this.cursor&&this.sentinels.unshift(...this.sentinels.splice(this.cursor-1)),this.cursor=0}add(a){for(let c=0;c<this.sentinels.length;c++){var b;if(b=this.sentinels[c],(a.host||"127.0.0.1")===(b.host||"127.0.0.1")&&(a.port||26379)===(b.port||26379))return!1}return this.sentinels.push(a),!0}toString(){return`${JSON.stringify(this.sentinels)} @${this.cursor}`}}b.default=c},84749:(a,b,c)=>{"use strict";c.d(b,{x:()=>f});var d=c(33873),e=c(75142);a=c.hmd(a);class f{constructor({mainFile:b="object"==typeof a.exports?d.join(process.cwd(),"dist/cjs/classes/main.js"):d.join(process.cwd(),"dist/esm/classes/main.js"),useWorkerThreads:c,workerForkOptions:e,workerThreadsOptions:f}){this.retained={},this.free={},this.opts={mainFile:b,useWorkerThreads:c,workerForkOptions:e,workerThreadsOptions:f}}async retain(a){let b=this.getFree(a).pop();if(b)return this.retained[b.pid]=b,b;(b=new e.R(this.opts.mainFile,a,{useWorkerThreads:this.opts.useWorkerThreads,workerForkOptions:this.opts.workerForkOptions,workerThreadsOptions:this.opts.workerThreadsOptions})).on("exit",this.remove.bind(this,b));try{if(await b.init(),null!==b.exitCode||null!==b.signalCode)throw Error("Child exited before it could be retained");return this.retained[b.pid]=b,b}catch(a){throw console.error(a),this.release(b),a}}release(a){delete this.retained[a.pid],this.getFree(a.processFile).push(a)}remove(a){delete this.retained[a.pid];let b=this.getFree(a.processFile),c=b.indexOf(a);c>-1&&b.splice(c,1)}async kill(a,b="SIGKILL"){return this.remove(a),a.kill(b,3e4)}async clean(){let a=Object.values(this.retained).concat(this.getAllFree());this.retained={},this.free={},await Promise.all(a.map(a=>this.kill(a,"SIGTERM")))}getFree(a){return this.free[a]=this.free[a]||[]}getAllFree(){return Object.values(this.free).reduce((a,b)=>a.concat(b),[])}}},84968:a=>{var b=[0,4129,8258,12387,16516,20645,24774,28903,33032,37161,41290,45419,49548,53677,57806,61935,4657,528,12915,8786,21173,17044,29431,25302,37689,33560,45947,41818,54205,50076,62463,58334,9314,13379,1056,5121,25830,29895,17572,21637,42346,46411,34088,38153,58862,62927,50604,54669,13907,9842,5649,1584,30423,26358,22165,18100,46939,42874,38681,34616,63455,59390,55197,51132,18628,22757,26758,30887,2112,6241,10242,14371,51660,55789,59790,63919,35144,39273,43274,47403,23285,19156,31415,27286,6769,2640,14899,10770,56317,52188,64447,60318,39801,35672,47931,43802,27814,31879,19684,23749,11298,15363,3168,7233,60846,64911,52716,56781,44330,48395,36200,40265,32407,28342,24277,20212,15891,11826,7761,3696,65439,61374,57309,53244,48923,44858,40793,36728,37256,33193,45514,41451,53516,49453,61774,57711,4224,161,12482,8419,20484,16421,28742,24679,33721,37784,41979,46042,49981,54044,58239,62302,689,4752,8947,13010,16949,21012,25207,29270,46570,42443,38312,34185,62830,58703,54572,50445,13538,9411,5280,1153,29798,25671,21540,17413,42971,47098,34713,38840,59231,63358,50973,55100,9939,14066,1681,5808,26199,30326,17941,22068,55628,51565,63758,59695,39368,35305,47498,43435,22596,18533,30726,26663,6336,2273,14466,10403,52093,56156,60223,64286,35833,39896,43963,48026,19061,23124,27191,31254,2801,6864,10931,14994,64814,60687,56684,52557,48554,44427,40424,36297,31782,27655,23652,19525,15522,11395,7392,3265,61215,65342,53085,57212,44955,49082,36825,40952,28183,32310,20053,24180,11923,16050,3793,7920],c=function(a){for(var b,c=0,d=0,e=[],f=a.length;c<f;c++)(b=a.charCodeAt(c))<128?e[d++]=b:(b<2048?e[d++]=b>>6|192:((64512&b)==55296&&c+1<a.length&&(64512&a.charCodeAt(c+1))==56320?(b=65536+((1023&b)<<10)+(1023&a.charCodeAt(++c)),e[d++]=b>>18|240,e[d++]=b>>12&63|128):e[d++]=b>>12|224,e[d++]=b>>6&63|128),e[d++]=63&b|128);return e},d=a.exports=function(a){for(var d,e=0,f=-1,g=0,h=0,i="string"==typeof a?c(a):a,j=i.length;e<j;){if(d=i[e++],-1===f)123===d&&(f=e);else if(125!==d)h=b[(d^h>>8)&255]^h<<8;else if(e-1!==f)return 16383&h;g=b[(d^g>>8)&255]^g<<8}return 16383&g};a.exports.generateMulti=function(a){for(var b=1,c=a.length,e=d(a[0]);b<c;)if(d(a[b++])!==e)return -1;return e}},87777:a=>{"use strict";class b{constructor(){this.max=1e3,this.map=new Map}get(a){let b=this.map.get(a);if(void 0!==b)return this.map.delete(a),this.map.set(a,b),b}delete(a){return this.map.delete(a)}set(a,b){if(!this.delete(a)&&void 0!==b){if(this.map.size>=this.max){let a=this.map.keys().next().value;this.delete(a)}this.map.set(a,b)}return this}}a.exports=b},89777:(a,b,c)=>{"use strict";let d=c(70405);a.exports=(a,b)=>new d(a,b).minor},90710:(a,b,c)=>{"use strict";let d=c(35463);a.exports=(a,b,c)=>d(a,b,c)>=0},91524:(a,b,c)=>{"use strict";Object.defineProperty(b,"__esModule",{value:!0});let d=c(17507);class e extends d.AbortError{constructor(a){super(`Reached the max retries per request limit (which is ${a}). Refer to "maxRetriesPerRequest" option for details.`),Error.captureStackTrace(this,this.constructor)}get name(){return this.constructor.name}}b.default=e},92289:(a,b,c)=>{a.exports=function(a){function b(a){let c,e,f,g=null;function h(...a){if(!h.enabled)return;let d=Number(new Date);h.diff=d-(c||d),h.prev=c,h.curr=d,c=d,a[0]=b.coerce(a[0]),"string"!=typeof a[0]&&a.unshift("%O");let e=0;a[0]=a[0].replace(/%([a-zA-Z%])/g,(c,d)=>{if("%%"===c)return"%";e++;let f=b.formatters[d];if("function"==typeof f){let b=a[e];c=f.call(h,b),a.splice(e,1),e--}return c}),b.formatArgs.call(h,a),(h.log||b.log).apply(h,a)}return h.namespace=a,h.useColors=b.useColors(),h.color=b.selectColor(a),h.extend=d,h.destroy=b.destroy,Object.defineProperty(h,"enabled",{enumerable:!0,configurable:!1,get:()=>null!==g?g:(e!==b.namespaces&&(e=b.namespaces,f=b.enabled(a)),f),set:a=>{g=a}}),"function"==typeof b.init&&b.init(h),h}function d(a,c){let d=b(this.namespace+(void 0===c?":":c)+a);return d.log=this.log,d}function e(a,b){let c=0,d=0,e=-1,f=0;for(;c<a.length;)if(d<b.length&&(b[d]===a[c]||"*"===b[d]))"*"===b[d]?(e=d,f=c):c++,d++;else{if(-1===e)return!1;d=e+1,c=++f}for(;d<b.length&&"*"===b[d];)d++;return d===b.length}return b.debug=b,b.default=b,b.coerce=function(a){return a instanceof Error?a.stack||a.message:a},b.disable=function(){let a=[...b.names,...b.skips.map(a=>"-"+a)].join(",");return b.enable(""),a},b.enable=function(a){for(let c of(b.save(a),b.namespaces=a,b.names=[],b.skips=[],("string"==typeof a?a:"").trim().replace(/\s+/g,",").split(",").filter(Boolean)))"-"===c[0]?b.skips.push(c.slice(1)):b.names.push(c)},b.enabled=function(a){for(let c of b.skips)if(e(a,c))return!1;for(let c of b.names)if(e(a,c))return!0;return!1},b.humanize=c(54066),b.destroy=function(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")},Object.keys(a).forEach(c=>{b[c]=a[c]}),b.names=[],b.skips=[],b.formatters={},b.selectColor=function(a){let c=0;for(let b=0;b<a.length;b++)c=(c<<5)-c+a.charCodeAt(b)|0;return b.colors[Math.abs(c)%b.colors.length]},b.enable(b.load()),b}},93126:(a,b,c)=>{"use strict";let d=c(12412),e=c(28354);function f(a){Object.defineProperty(this,"message",{value:a||"",configurable:!0,writable:!0}),Error.captureStackTrace(this,this.constructor)}function g(a,b,c){d(b),d.strictEqual(typeof c,"number"),Object.defineProperty(this,"message",{value:a||"",configurable:!0,writable:!0});let e=Error.stackTraceLimit;Error.stackTraceLimit=2,Error.captureStackTrace(this,this.constructor),Error.stackTraceLimit=e,this.offset=c,this.buffer=b}function h(a){Object.defineProperty(this,"message",{value:a||"",configurable:!0,writable:!0});let b=Error.stackTraceLimit;Error.stackTraceLimit=2,Error.captureStackTrace(this,this.constructor),Error.stackTraceLimit=b}function i(a){Object.defineProperty(this,"message",{value:a||"",configurable:!0,writable:!0}),Error.captureStackTrace(this,this.constructor)}function j(a){Object.defineProperty(this,"message",{value:a||"",configurable:!0,writable:!0}),Error.captureStackTrace(this,this.constructor)}e.inherits(f,Error),Object.defineProperty(f.prototype,"name",{value:"RedisError",configurable:!0,writable:!0}),e.inherits(g,f),Object.defineProperty(g.prototype,"name",{value:"ParserError",configurable:!0,writable:!0}),e.inherits(h,f),Object.defineProperty(h.prototype,"name",{value:"ReplyError",configurable:!0,writable:!0}),e.inherits(i,f),Object.defineProperty(i.prototype,"name",{value:"AbortError",configurable:!0,writable:!0}),e.inherits(j,i),Object.defineProperty(j.prototype,"name",{value:"InterruptError",configurable:!0,writable:!0}),a.exports={RedisError:f,ParserError:g,ReplyError:h,AbortError:i,InterruptError:j}},94195:(a,b,c)=>{"use strict";let d=c(30066);a.exports=(a,b,c)=>d(a,b,"<",c)},94296:(a,b,c)=>{"use strict";var d=c(70977);function e(){}e._parseEntry=function(a){var b=a.split(" ");if(6===b.length)return{interval:d.parse(a)};if(b.length>6)return{interval:d.parse(b.slice(0,6).join(" ")),command:b.slice(6,b.length)};throw Error("Invalid entry: "+a)},e.parseExpression=function(a,b){return d.parse(a,b)},e.fieldsToExpression=function(a,b){return d.fieldsToExpression(a,b)},e.parseString=function(a){for(var b=a.split("\n"),c={variables:{},expressions:[],errors:{}},d=0,f=b.length;d<f;d++){var g=b[d],h=null,i=g.trim();if(i.length>0)if(i.match(/^#/))continue;else if(h=i.match(/^(.*)=(.*)$/))c.variables[h[1]]=h[2];else{var j=null;try{j=e._parseEntry("0 "+i),c.expressions.push(j.interval)}catch(a){c.errors[i]=a}}}return c},e.parseFile=function(a,b){c(29021).readFile(a,function(a,c){return a?void b(a):b(null,e.parseString(c.toString()))})},a.exports=e},94371:(a,b,c)=>{"use strict";c.d(b,{N:()=>f});var d=c(21789),e=c(29196);class f{constructor(a,b){this.worker=a,this.opts=b,this.trackedJobs=new Map,this.closed=!1}start(){!this.closed&&this.opts.lockRenewTime>0&&this.startLockExtenderTimer()}async extendLocks(a){await this.worker.trace(e.v8.INTERNAL,"extendLocks",this.worker.name,async b=>{null==b||b.setAttributes({[e.tC.WorkerId]:this.opts.workerId,[e.tC.WorkerName]:this.opts.workerName,[e.tC.WorkerJobsToExtendLocks]:a});try{let b=a.map(a=>{var b;return(null==(b=this.trackedJobs.get(a))?void 0:b.token)||""}),c=await this.worker.extendJobLocks(a,b,this.opts.lockDuration);if(c.length>0)for(let a of(this.worker.emit("lockRenewalFailed",c),c))this.worker.emit("error",Error(`could not renew lock for job ${a}`));let d=a.filter(a=>!c.includes(a));d.length>0&&this.worker.emit("locksRenewed",{count:d.length,jobIds:d})}catch(a){this.worker.emit("error",a)}})}startLockExtenderTimer(){clearTimeout(this.lockRenewalTimer),this.closed||(this.lockRenewalTimer=setTimeout(async()=>{let a=Date.now(),b=[];for(let c of this.trackedJobs.keys()){let{ts:d,token:e,abortController:f}=this.trackedJobs.get(c);if(!d){this.trackedJobs.set(c,{token:e,ts:a,abortController:f});continue}d+this.opts.lockRenewTime/2<a&&(this.trackedJobs.set(c,{token:e,ts:a,abortController:f}),b.push(c))}b.length&&await this.extendLocks(b),this.startLockExtenderTimer()},this.opts.lockRenewTime/2))}async close(){this.closed||(this.closed=!0,this.lockRenewalTimer&&(clearTimeout(this.lockRenewalTimer),this.lockRenewalTimer=void 0),this.trackedJobs.clear())}trackJob(a,b,c,e=!1){let f=e?new d.AbortController:void 0;return!this.closed&&a&&this.trackedJobs.set(a,{token:b,ts:c,abortController:f}),f}untrackJob(a){this.trackedJobs.delete(a)}getActiveJobCount(){return this.trackedJobs.size}isRunning(){return!this.closed&&void 0!==this.lockRenewalTimer}cancelJob(a,b){let c=this.trackedJobs.get(a);return null!=c&&!!c.abortController&&(c.abortController.abort(b),!0)}cancelAllJobs(a){for(let b of this.trackedJobs.values())b.abortController&&b.abortController.abort(a)}getTrackedJobIds(){return Array.from(this.trackedJobs.keys())}}},94545:(a,b,c)=>{"use strict";let d=c(35567);a.exports=(a,b)=>{let c=d(a.trim().replace(/^[=v]+/,""),b);return c?c.version:null}},95016:(a,b,c)=>{"use strict";c.d(b,{u:()=>d});class d extends Error{constructor(a="bullmq:unrecoverable"){super(a),this.name=this.constructor.name,Object.setPrototypeOf(this,new.target.prototype)}}},95422:(a,b,c)=>{"use strict";Object.defineProperty(b,"__esModule",{value:!0}),b.noop=b.defaults=b.Debug=b.getPackageMeta=b.zipMap=b.CONNECTION_CLOSED_ERROR_MSG=b.shuffle=b.sample=b.resolveTLSProfile=b.parseURL=b.optimizeErrorStack=b.toArg=b.convertMapToArray=b.convertObjectToArray=b.timeout=b.packObject=b.isInt=b.wrapMultiResult=b.convertBufferToString=void 0;let d=c(29021),e=c(33873),f=c(79551),g=c(66721);Object.defineProperty(b,"defaults",{enumerable:!0,get:function(){return g.defaults}}),Object.defineProperty(b,"noop",{enumerable:!0,get:function(){return g.noop}}),b.Debug=c(24669).default;let h=c(70537);function i(a){let b=parseFloat(a);return!isNaN(a)&&(0|b)===b}b.convertBufferToString=function a(b,c){if(b instanceof Buffer)return b.toString(c);if(Array.isArray(b)){let d=b.length,e=Array(d);for(let f=0;f<d;++f)e[f]=b[f]instanceof Buffer&&"utf8"===c?b[f].toString():a(b[f],c);return e}return b},b.wrapMultiResult=function(a){if(!a)return null;let b=[],c=a.length;for(let d=0;d<c;++d){let c=a[d];c instanceof Error?b.push([c]):b.push([null,c])}return b},b.isInt=i,b.packObject=function(a){let b={},c=a.length;for(let d=1;d<c;d+=2)b[a[d-1]]=a[d];return b},b.timeout=function(a,b){let c=null,d=function(){c&&(clearTimeout(c),c=null,a.apply(this,arguments))};return c=setTimeout(d,b,Error("timeout")),d},b.convertObjectToArray=function(a){let b=[],c=Object.keys(a);for(let d=0,e=c.length;d<e;d++)b.push(c[d],a[c[d]]);return b},b.convertMapToArray=function(a){let b=[],c=0;return a.forEach(function(a,d){b[c]=d,b[c+1]=a,c+=2}),b},b.toArg=function(a){return null==a?"":String(a)},b.optimizeErrorStack=function(a,b,c){let d,e=b.split("\n"),f="";for(d=1;d<e.length&&-1!==e[d].indexOf(c);++d);for(let a=d;a<e.length;++a)f+="\n"+e[a];if(a.stack){let b=a.stack.indexOf("\n");a.stack=a.stack.slice(0,b)+f}return a},b.parseURL=function(a){if(i(a))return{port:a};let b=(0,f.parse)(a,!0,!0);b.slashes||"/"===a[0]||(a="//"+a,b=(0,f.parse)(a,!0,!0));let c=b.query||{},d={};if(b.auth){let a=b.auth.indexOf(":");d.username=-1===a?b.auth:b.auth.slice(0,a),d.password=-1===a?"":b.auth.slice(a+1)}if(b.pathname&&("redis:"===b.protocol||"rediss:"===b.protocol?b.pathname.length>1&&(d.db=b.pathname.slice(1)):d.path=b.pathname),b.host&&(d.host=b.hostname),b.port&&(d.port=b.port),"string"==typeof c.family){let a=Number.parseInt(c.family,10);Number.isNaN(a)||(d.family=a)}return(0,g.defaults)(d,c),d},b.resolveTLSProfile=function(a){let b=null==a?void 0:a.tls;"string"==typeof b&&(b={profile:b});let c=h.default[null==b?void 0:b.profile];return c&&(b=Object.assign({},c,b),delete b.profile,a=Object.assign({},a,{tls:b})),a},b.sample=function(a,b=0){let c=a.length;return b>=c?null:a[b+Math.floor(Math.random()*(c-b))]},b.shuffle=function(a){let b=a.length;for(;b>0;){let c=Math.floor(Math.random()*b);b--,[a[b],a[c]]=[a[c],a[b]]}return a},b.CONNECTION_CLOSED_ERROR_MSG="Connection is closed.",b.zipMap=function(a,b){let c=new Map;return a.forEach((a,d)=>{c.set(a,b[d])}),c};let j=null;b.getPackageMeta=async function(){if(j)return j;try{let a=(0,e.resolve)(__dirname,"..","..","package.json"),b=await d.promises.readFile(a,"utf8");return j={version:JSON.parse(b).version}}catch(a){return j={version:"error-fetching-version"}}}},95572:(a,b,c)=>{"use strict";Object.defineProperty(b,"__esModule",{value:!0});let d=c(19941);function e(a){setTimeout(function(){throw a},0)}b.default=function(a,b,c){return"function"==typeof b&&a.then(a=>{let f;(f=void 0!==c&&Object(c).spread&&Array.isArray(a)?d.tryCatch(b).apply(void 0,[null].concat(a)):void 0===a?d.tryCatch(b)(null):d.tryCatch(b)(null,a))===d.errorObj&&e(f.e)},a=>{if(!a){let b=Error(a+"");Object.assign(b,{cause:a}),a=b}let c=d.tryCatch(b)(a);c===d.errorObj&&e(c.e)}),a}},98783:(a,b,c)=>{"use strict";c.d(b,{NO:()=>d,Ag:()=>e,OE:()=>f,uC:()=>g.u,hD:()=>h,aN:()=>i});class d extends Error{constructor(a="bullmq:movedToDelayed"){super(a),this.name=this.constructor.name,Object.setPrototypeOf(this,new.target.prototype)}}let e="bullmq:rateLimitExceeded";class f extends Error{constructor(a=e){super(a),this.name=this.constructor.name,Object.setPrototypeOf(this,new.target.prototype)}}var g=c(95016);class h extends Error{constructor(a="bullmq:movedToWaitingChildren"){super(a),this.name=this.constructor.name,Object.setPrototypeOf(this,new.target.prototype)}}class i extends Error{constructor(a="bullmq:movedToWait"){super(a),this.name=this.constructor.name,Object.setPrototypeOf(this,new.target.prototype)}}},99318:(a,b,c)=>{"use strict";let d=c(35137),e=c(57147),f=c(70405),g=c(50954),h=c(35567),i=c(12190),j=c(94545),k=c(70380),l=c(26581),m=c(62045),n=c(89777),o=c(55494),p=c(44),q=c(35463),r=c(10511),s=c(63100),t=c(20254),u=c(52510),v=c(58438),w=c(10185),x=c(27482),y=c(81200),z=c(62404),A=c(90710),B=c(64011),C=c(3180),D=c(48067),E=c(36317),F=c(72988),G=c(9261),H=c(44452),I=c(66131),J=c(64845),K=c(7824),L=c(47351),M=c(30066),N=c(32990),O=c(94195),P=c(41555);a.exports={parse:h,valid:i,clean:j,inc:k,diff:l,major:m,minor:n,patch:o,prerelease:p,compare:q,rcompare:r,compareLoose:s,compareBuild:t,sort:u,rsort:v,gt:w,lt:x,eq:y,neq:z,gte:A,lte:B,cmp:C,coerce:D,Comparator:E,Range:F,satisfies:G,toComparators:H,maxSatisfying:I,minSatisfying:J,minVersion:K,validRange:L,outside:M,gtr:N,ltr:O,intersects:P,simplifyRange:c(11890),subset:c(843),SemVer:f,re:d.re,src:d.src,tokens:d.t,SEMVER_SPEC_VERSION:e.SEMVER_SPEC_VERSION,RELEASE_TYPES:e.RELEASE_TYPES,compareIdentifiers:g.compareIdentifiers,rcompareIdentifiers:g.rcompareIdentifiers}}};