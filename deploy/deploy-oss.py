import oss2
import os

id = os.getenv('OSS_ACCESS_KEY_ID')
secret = os.getenv('OSS_ACCESS_KEY_SECRET')
endpoint = os.getenv('OSS_ENDPOINT')
bucket = os.getenv('OSS_BUCKET')

auth = oss2.Auth(id, secret)
bucket = oss2.Bucket(auth, endpoint, bucket)


result = bucket.put_object_from_file('js/app.js','../web/build/js/app.js')
print('http status: {0}'.format(result.status))

result = bucket.put_object_from_file('js/common.js','../web/build/js/common.js')
print('http status: {0}'.format(result.status))
