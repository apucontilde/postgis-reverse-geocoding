shp2pgsql -s 4326 ./data/distritos_cr/distritos_cr.shp > init.sql
cat ./data/point_within_geom.sql >> init.sql