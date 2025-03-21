CREATE ROLE anon NOLOGIN NOINHERIT NOCREATEDB NOCREATEROLE NOSUPERUSER;

-- REVOKE ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public FROM PUBLIC;
REVOKE ALL PRIVILEGES ON DATABASE gis FROM PUBLIC;
REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA public FROM PUBLIC;
REVOKE ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public FROM PUBLIC;

-- Allow the user to only use the specified functions.
GRANT CONNECT ON DATABASE gis TO anon;
GRANT SELECT ON TABLE distritos_cr TO anon;
GRANT EXECUTE ON FUNCTION st_contains TO anon;
GRANT EXECUTE ON FUNCTION st_makepoint TO anon;
CREATE FUNCTION encontrar_distrito(lat float, lng float, OUT nom_prov varchar(20), OUT nom_cant varchar(20), OUT nom_dist varchar(20), OUT cod_prov integer, OUT cod_cant integer, OUT cod_dist integer)
AS $$
    SELECT D.nom_prov, D.nom_cant, D.nom_dist, D.cod_prov ::integer, D.cod_cant::integer, D.cod_dist::integer
    FROM distritos_cr D
    WHERE ST_Contains(D.geom, ST_MakePoint(lat, lng)::geography::geometry);
$$ LANGUAGE SQL IMMUTABLE;

GRANT EXECUTE ON FUNCTION encontrar_distrito TO anon;

