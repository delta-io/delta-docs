# README for Delta Lake quickstart with Docker

This folder contains instructions and materials to get new users started with Delta Lake and work through the quickstart materials using a self-contained Docker image.

> Note: The basic prerequisite for following along using Delta Lake Docker image is having Docker installed on your machine. Please follow the steps from the Docker website to install Docker locally. Based on your local machine operating system, please choose the appropriate option listed on the [Get Docker](https://docs.docker.com/get-docker/) page.

Follow the steps below to build an Apache Spark<sup>TM</sup> image with Delta Lake installed, run a container, and follow the quickstart in an interactive notebook or shell with any of the options like Python, PySpark, Scala Spark or even Rust.

1. [Build the image](#Build-the-Image)
2. [Choose an interface](#Choose-an-Interface)

> Note: Python version available in this Docker image is 3.9.2 and is available as `python3`.

## Build the Image

1. Clone this repo
2. Navigate to the cloned folder
3. Navigate to the `quickstart_docker` folder
4. Open a bash shell (if on windows use git bash, WSL, or any shell configured for bash commands)
5. Execute the following from the `static/quickstart_docker` folder

   ```bash
   docker build -t delta_quickstart -f Dockerfile_delta_quickstart .
   ```

Once the image has been built, you can then move on to running the quickstart in a notebook or shell.

## Choose the Delta Package version

In the following instructions, the variable `${DELTA_PACKAGE_VERSION}` refers to the Delta Lake Package version.

The current version is `delta-core_2.12:2.3.0` which corresponds to Apache Spark 3.3.x release line.

## Choose an Interface

- [delta-rs Python](#delta-rs-python)
- [JupyterLab Notebook](#jupyterlab-notebook)
- [PySpark Shell](#pyspark-shell)
- [Scala Shell](#scala-shell)
- [Delta Rust API](#delta-rust-api)
- [ROAPI](#optional-roapi)

### delta-rs Python

1. Open a bash shell (if on windows use git bash, WSL, or any shell configured for bash commands)

2. Run a container from the built image with a bash entrypoint

   ```bash
   docker run --name delta_quickstart --rm -it --entrypoint bash delta_quickstart
   ```

3. Launch a _python_ interactive shell session with `python3`

   ```bash
   python3
   ```

   > Note: The Delta Rust Python bindings are already installed in this docker. To do this manually in your own environment, run the command: `pip3 install deltalake==0.8.1`

4. Run some basic commands in the shell to write to and read from Delta Lake with Pandas

   ```python
   import pandas as pd
   from deltalake.writer import write_deltalake
   from deltalake import DeltaTable

   # Create a Pandas DataFrame
   df = pd.DataFrame({"data": range(5)})

   # Write to the Delta Lake table
   write_deltalake("/tmp/deltars_table", df)

   # Append new data
   df = pd.DataFrame({"data": range(6, 11)})
   write_deltalake("/tmp/deltars_table", df, mode="append")

   # Read the Delta Lake table
   dt = DeltaTable("/tmp/deltars_table")

   # Show the Delta Lake table
   dt.to_pandas()
   ```

<details>
  <summary>Click to view output</summary>

```python
dt.to_pandas()

## Output
    0
0   0
1   1
2   2
... ...
8   9
9  10
```

</details>

<details>
  <summary><b>Click for more examples including files information and time travel</b></summary>

4.1. Review the files

```python
# List files for the Delta Lake table
dt.files()

## Output
['0-d4920663-30e9-4a1a-afde-59bc4ebd24b5-0.parquet', '1-f27a5ea6-a15f-4ca1-91b3-72bcf64fbc09-0.parquet']
```

4.2. Review history

```python
# Review history
dt.history()

## Output
[{'timestamp': 1682475171964, 'delta-rs': '0.8.0'}, {'timestamp': 1682475171985, 'operation': 'WRITE', 'operationParameters': {'partitionBy': '[]', 'mode': 'Append'}, 'clientVersion': 'delta-rs.0.8.0'}]
```

4.3. Time Travel (load older version of table)

```python
# Load initial version of table
dt.load_version(0)

# Show table
dt.to_pandas()

## Output
    0
 0  0
 1  1
 2  2
 3  3
 4  4
```

</details>

5. Follow the delta-rs Python documentation [here](https://delta-io.github.io/delta-rs/python/usage.html#)

6. To verify that you have a Delta Lake table, you can list the contents within the folder of your Delta Lake table. For example, in the previous code, you saved the table in `/tmp/deltars-table`. Once you close your `python3` process, run a list command in your Docker shell and you should get something similar to below.

<details><summary>Click to view output</summary>

```bash
$ ls -lsgA /tmp/deltars_table
total 12
4 drwxr-xr-x 2 NBuser 4096 Apr 26 02:12 _delta_log
4 -rw-r--r-- 1 NBuser 1689 Apr 26 02:12 0-d4920663-30e9-4a1a-afde-59bc4ebd24b5-0.parquet
4 -rw-r--r-- 1 NBuser 1691 Apr 26 02:12 1-f27a5ea6-a15f-4ca1-91b3-72bcf64fbc09-0.parquet
```

</details>

7. [Optional] Skip ahead to try out the [Delta Rust API](#delta-rust-api) and [ROAPI](#optional-roapi)

### JupyterLab Notebook

1. Open a bash shell (if on windows use git bash, WSL, or any shell configured for bash commands)
2. Run a container from the built image with a Juypter Lab entrypoint

   ```bash
   docker run --name delta_quickstart --rm -it -p 8888-8889:8888-8889 delta_quickstart
   ```

3. Running the above command gives a JupyterLab notebook URL, copy that URL and launch a browser to follow along the notebook and run each cell.

**Note that you may also launch the pyspark or scala shells after launching a terminal in JupyterLab**

### PySpark Shell

1. Open a bash shell (if on windows use git bash, WSL, or any shell configured for bash commands)
2. Run a container from the built image with a bash entrypoint

   ```bash
   docker run --name delta_quickstart --rm -it --entrypoint bash delta_quickstart
   ```

3. Launch a pyspark interactive shell session

   ```bash
   $SPARK_HOME/bin/pyspark --packages io.delta:${DELTA_PACKAGE_VERSION} \
   --conf "spark.sql.extensions=io.delta.sql.DeltaSparkSessionExtension" \
   --conf "spark.sql.catalog.spark_catalog=org.apache.spark.sql.delta.catalog.DeltaCatalog"
   ```

4. Run some basic commands in the shell

   ```python
   # Create a Spark DataFrame
   data = spark.range(0, 5)

   # Write to a Delta Lake table
   (data
      .write
      .format("delta")
      .save("/tmp/delta-table")
   )

   # Read from the Delta Lake table
   df = (spark
           .read
           .format("delta")
           .load("/tmp/delta-table")
           .orderBy("id")
         )

   # Show the Delta Lake table
   df.show()
   ```

5. Continue with the quickstart [here](https://docs.delta.io/latest/quick-start.html#create-a-table&language-python)

6. To verify that you have a Delta Lake table, you can list the contents within the folder of your Delta Lake table. For example, in the previous code, you saved the table in `/tmp/delta-table`. Once you close your `pyspark` process, run a list command in your Docker shell and you should get something similar to below.

<details><summary>Click to view output</summary>

```bash
$ ls -lsgA /tmp/delta-table
total 36
4 drwxr-xr-x 2 NBuser 4096 Apr 26 02:30 _delta_log
4 -rw-r--r-- 1 NBuser   12 Apr 26 02:30 .part-00000-bdee316b-8623-4423-b59c-6a809addaea8-c000.snappy.parquet.crc
4 -rw-r--r-- 1 NBuser   12 Apr 26 02:30 .part-00001-6b373d50-5bdd-496a-9e21-ab4164176f11-c000.snappy.parquet.crc
4 -rw-r--r-- 1 NBuser   12 Apr 26 02:30 .part-00002-9721ce9e-e043-4875-bcff-08f7d7c3d3f0-c000.snappy.parquet.crc
4 -rw-r--r-- 1 NBuser   12 Apr 26 02:30 .part-00003-61aaf450-c318-452a-aea5-5a44c909fd74-c000.snappy.parquet.crc
4 -rw-r--r-- 1 NBuser  478 Apr 26 02:30 part-00000-bdee316b-8623-4423-b59c-6a809addaea8-c000.snappy.parquet
4 -rw-r--r-- 1 NBuser  478 Apr 26 02:30 part-00001-6b373d50-5bdd-496a-9e21-ab4164176f11-c000.snappy.parquet
4 -rw-r--r-- 1 NBuser  478 Apr 26 02:30 part-00002-9721ce9e-e043-4875-bcff-08f7d7c3d3f0-c000.snappy.parquet
4 -rw-r--r-- 1 NBuser  486 Apr 26 02:30 part-00003-61aaf450-c318-452a-aea5-5a44c909fd74-c000.snappy.parquet
```

</details>

### Scala Shell

1. Open a bash shell (if on windows use git bash, WSL, or any shell configured for bash commands)
2. Run a container from the built image with a bash entrypoint

   ```bash
   docker run --name delta_quickstart --rm -it --entrypoint bash delta_quickstart
   ```

3. Launch a scala interactive shell session

   ```bash
   $SPARK_HOME/bin/spark-shell --packages io.delta:${DELTA_PACKAGE_VERSION} \
   --conf "spark.sql.extensions=io.delta.sql.DeltaSparkSessionExtension" \
   --conf "spark.sql.catalog.spark_catalog=org.apache.spark.sql.delta.catalog.DeltaCatalog"
   ```

4. Run some basic commands in the shell

   ```scala
   // Create a Spark DataFrame
   val data = spark.range(0, 5)

   // Write to a Delta Lake table
   (data
      .write
      .format("delta")
      .save("/tmp/delta-table")
   )

   // Read from the Delta Lake table
   val df = (spark
               .read
               .format("delta")
               .load("/tmp/delta-table")
               .orderBy("id")
            )

   // Show the Delta Lake table
   df.show()
   ```

5. Follow the quickstart [here](https://docs.delta.io/latest/quick-start.html#create-a-table&language-scala)

6. To verify that you have a Delta Lake table, you can list the contents within the folder of your Delta Lake table. For example, in the previous code, you saved the table in `/tmp/delta-table`. Once you close your Scala Spark process [`spark-shell`], run a list command in your Docker shell and you should get something similar to below.

<details><summary>Click to view output</summary>

```bash
$ ls -lsgA /tmp/delta-table
total 36
4 drwxr-xr-x 2 NBuser 4096 Apr 26 02:31 _delta_log
4 -rw-r--r-- 1 NBuser   12 Apr 26 02:31 .part-00000-e0353d3e-7473-4ff7-9b58-e977d48d008a-c000.snappy.parquet.crc
4 -rw-r--r-- 1 NBuser   12 Apr 26 02:31 .part-00001-0e2c89cf-3f9b-4698-b059-6dd41d4e3aed-c000.snappy.parquet.crc
4 -rw-r--r-- 1 NBuser   12 Apr 26 02:31 .part-00002-06bf68f9-16d8-4c08-ba8e-7b0b00d52b8e-c000.snappy.parquet.crc
4 -rw-r--r-- 1 NBuser   12 Apr 26 02:31 .part-00003-5963f002-d98a-421f-9c2d-22376b7f87e4-c000.snappy.parquet.crc
4 -rw-r--r-- 1 NBuser  478 Apr 26 02:31 part-00000-e0353d3e-7473-4ff7-9b58-e977d48d008a-c000.snappy.parquet
4 -rw-r--r-- 1 NBuser  478 Apr 26 02:31 part-00001-0e2c89cf-3f9b-4698-b059-6dd41d4e3aed-c000.snappy.parquet
4 -rw-r--r-- 1 NBuser  478 Apr 26 02:31 part-00002-06bf68f9-16d8-4c08-ba8e-7b0b00d52b8e-c000.snappy.parquet
4 -rw-r--r-- 1 NBuser  486 Apr 26 02:31 part-00003-5963f002-d98a-421f-9c2d-22376b7f87e4-c000.snappy.parquet
```

</details>

### Delta Rust API

1. Open a bash shell (if on windows use git bash, WSL, or any shell configured for bash commands)

2. Run a container from the built image with a bash entrypoint

   ```bash
   docker run --name delta_quickstart --rm -it --entrypoint bash delta_quickstart
   ```

3. Execute `examples/read_delta_table.rs` to review the Delta Lake table metadata and files of the `covid19_nyt` Delta Lake table.
   ```bash
   cd rs
   cargo run --example read_delta_table
   ```

<details><summary>Click to view output</summary>
<p>

#### View output

```bash
cargo run --example read_delta_table

=== Delta table metadata ===
DeltaTable(../quickstart_docker/rs/data/COVID-19_NYT)
   version: 0
   metadata: GUID=7245fd1d-8a6d-4988-af72-92a95b646511, name=None, description=None, partitionColumns=[], createdTime=Some(1619121484605), configuration={}
   min_version: read=1, write=2
   files count: 8


=== Delta table files ===
[
   Path { raw: "part-00000-a496f40c-e091-413a-85f9-b1b69d4b3b4e-c000.snappy.parquet" },
   Path { raw: "part-00001-9d9d980b-c500-4f0b-bb96-771a515fbccc-c000.snappy.parquet" },
   Path { raw: "part-00002-8826af84-73bd-49a6-a4b9-e39ffed9c15a-c000.snappy.parquet" },
   Path { raw: "part-00003-539aff30-2349-4b0d-9726-c18630c6ad90-c000.snappy.parquet" },
   Path { raw: "part-00004-1bb9c3e3-c5b0-4d60-8420-23261f58a5eb-c000.snappy.parquet" },
   Path { raw: "part-00005-4d47f8ff-94db-4d32-806c-781a1cf123d2-c000.snappy.parquet" },
   Path { raw: "part-00006-d0ec7722-b30c-4e1c-92cd-b4fe8d3bb954-c000.snappy.parquet" },
   Path { raw: "part-00007-4582392f-9fc2-41b0-ba97-a74b3afc8239-c000.snappy.parquet" }
]
```

</p>
</details>

4. Execute `examples/read_delta_datafusion.rs` to query the `covid19_nyt` Delta Lake table using `datafusion`

```bash
cargo run --example read_delta_datafusion
```

<details><summary>Click to view output</summary>
<p>

```bash
cargo run --example read_delta_datafusion

[
   RecordBatch {
      schema: Schema {
         fields: [
            Field { name: "cases", data_type: Int32, nullable: true, dict_id: 0, dict_is_ordered: false, metadata: None },
            Field { name: "county", data_type: Utf8, nullable: true, dict_id: 0, dict_is_ordered: false, metadata: None },
            Field { name: "date", data_type: Utf8, nullable: true, dict_id: 0, dict_is_ordered: false, metadata: None }
         ], metadata: {}
      },
      columns: [PrimitiveArray<Int32>
      [
      1,
      1,
      1,
      1,
      1,
      ], StringArray
      [
      "Snohomish",
      "Snohomish",
      "Snohomish",
      "Cook",
      "Snohomish",
      ], StringArray
      [
      "2020-01-21",
      "2020-01-22",
      "2020-01-23",
      "2020-01-24",
      "2020-01-24",
      ]],
      row_count: 5
   }
]
```

</p>
</details>

### [Optional] ROAPI

You can query your Delta Lake table with [Apache Arrow](https://github.com/apache/arrow) and [Datafusion](https://github.com/apache/arrow-datafusion) using [ROAPI](https://roapi.github.io/docs/config/dataset-formats/delta.html) which are pre-installed in this docker.

> Note: If you need to do this in your own environment, run the command `pip3 install roapi==0.8.1`

1. Open a bash shell (if on windows use git bash, WSL, or any shell configured for bash commands)

2. Run a container from the built image with a bash entrypoint

   ```bash
   docker run --name delta_quickstart --rm -it -p 8080:8080 --entrypoint bash delta_quickstart
   ```

3. Start the `roapi` API using the following command. Notes:

   - the API calls are pushed to the `nohup.out` file.
   - if you haven't created the `deltars_table` in your container create it via the [delta-rs Python](#delta-rs-python) option above. Alternatively you may omit the following from the command:
     `--table 'deltars_table=/tmp/deltars_table/,format=delta'` as well as any steps that call the `deltars_table`

   ```bash
   nohup roapi --addr-http 0.0.0.0:8080 --table 'deltars_table=/tmp/deltars_table/,format=delta' --table 'covid19_nyt=/opt/spark/work-dir/rs/data/COVID-19_NYT,format=delta' &
   ```

4. Open another shell to connect to the same Docker image

   ```bash
   docker exec -it delta_quickstart /bin/bash
   ```

> Note: Run the below steps in the shell launched in the previous step

5. Check the schema of the two Delta Lake tables
   ```bash
   curl localhost:8080/api/schema
   ```

<details><summary>Click to view output</summary>

```bash

curl localhost:8080/api/schema

{
   "covid19_nyt":{"fields":[{"name":"date","data_type":"Utf8","nullable":true,"dict_id":0,"dict_is_ordered":false},{"name":"county","data_type":"Utf8","nullable":true,"dict_id":0,"dict_is_ordered":false},{"name":"state","data_type":"Utf8","nullable":true,"dict_id":0,"dict_is_ordered":false},{"name":"fips","data_type":"Int32","nullable":true,"dict_id":0,"dict_is_ordered":false},{"name":"cases","data_type":"Int32","nullable":true,"dict_id":0,"dict_is_ordered":false},{"name":"deaths","data_type":"Int32","nullable":true,"dict_id":0,"dict_is_ordered":false}]},

   "deltars_table":{"fields":[{"name":"0","data_type":"Int64","nullable":true,"dict_id":0,"dict_is_ordered":false}]}
}
```

</details>

5. Query the `deltars_table`
   ```bash
   curl -X POST -d "SELECT * FROM deltars_table"  localhost:8080/api/sql
   ```

<details><summary>Click to view output</summary>

```bash

curl -X POST -d "SELECT * FROM deltars_table"  localhost:8080/api/sql

[{"0":0},{"0":1},{"0":2},{"0":3},{"0":4},{"0":6},{"0":7},{"0":8},{"0":9},{"0":10}]
```

</details>

6. Query the `covid19_nyt` table
   ```bash
   curl -X POST -d "SELECT cases, county, date FROM covid19_nyt ORDER BY cases DESC LIMIT 5" localhost:8080/api/sql
   ```

<details><summary>Click to view output</summary>

```bash

curl -X POST -d "SELECT cases, county, date FROM covid19_nyt ORDER BY cases DESC LIMIT 5" localhost:8080/api/sql

[
    {"cases":1208672,"county":"Los Angeles","date":"2021-03-11"},
    {"cases":1207361,"county":"Los Angeles","date":"2021-03-10"},
    {"cases":1205924,"county":"Los Angeles","date":"2021-03-09"},
    {"cases":1204665,"county":"Los Angeles","date":"2021-03-08"},
    {"cases":1203799,"county":"Los Angeles","date":"2021-03-07"}
]
```

</details>
