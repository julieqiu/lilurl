import base64, hashlib, random, string

def id_generator(size=6, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))

def hashFunction(url, SIZEURL=4):
    url = (url + id_generator()).encode()
    shorter = base64.b64encode(hashlib.md5(url).digest()[-SIZEURL:])
    sanitized = shorter.replace('=','').replace('/','_').replace('+','_')
    return sanitized

