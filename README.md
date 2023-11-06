# encuentra_tu_distrito
base de datos espacial para econtrar un distrito en costa rica a partir de latitud y longitud

```bash
$ curl -X 'GET' \
>   'http://127.0.0.1:3000/rpc/encontrar_distrito?lat=-84.1165&lng=9.9983' \
>   -H 'accept: application/json'
{"nom_prov":"HEREDIA","nom_cant":"HEREDIA","nom_dist":"HEREDIA","cod_prov":4,"cod_cant":1,"cod_dist":1}
```

![image](https://github.com/apucontilde/encuentra_tu_distrito/assets/115139887/f7d2a400-d43d-4574-bc10-c6c5a663ca04)
