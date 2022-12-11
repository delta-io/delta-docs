# What is this?

This folder contains instructions and materials to get new users started with Delta Lake and work through the quickstart materials. Follow the steps below to build an Apache Spark image with Delta Lake intalled, run a container, and follow the quickstart in an interactive notebook or shell.

1. [Build the image](#Build-the-Image)
2. [Choose an interface](#Choose-an-Interface)

## Build the Image

1. Clone this repo
2. Navigate to the cloned folder
3. Navigate to the quickstart_docker folder
4. open a bash shell (if on windows use git bash, WSL, or any shell configured for bash commands)
5. Execute the following from the `static/quickstart_docker` folder

   ```bash
   docker build -t delta_quickstart -f Dockerfile_quickstart .
   ```

Once the image has been built, you can then move on to running the quickstart in a notebook or shell.

## Choose the Delta Package version

In the following instructions, the variable `${DELTA_PACKAGE_VERSION}` refers to the Delta Package version.

The current version is `delta-core_2.12:2.1.0` which corresponds to Apache Spark 3.3.1.

## Choose an Interface
- [Delta Rust Python bindings](#Delta-Rust-Python-bindings)
- [Pyspark Jupyter Lab Notebook](#Pyspark-Jupyter-Lab-Notebook)
- [Pyspark Shell](#Pyspark-Shell)
- [Scala Shell](#Scala-Shell)
- [Rust API](#delta-rust-api)
- [ROAPI](#optional-roapi)


### Delta Rust Python bindings
1. Open a bash shell (if on windows use git bash, WSL, or any shell configured for bash commands)

2. Run a container from the built image with a bash entrypoint

   ```bash
   docker run --rm -it --entrypoint bash delta_quickstart
   ```

3. Launch a _python_ interactive shell session

   ```bash
   python3
   ```

   > Note, the Delta Rust Python bindings is already installed in this docker. To do this manually in your own environment, you can install `pip3 install deltalake`

4. Run some basic commands in the shell

   ```python
   import pandas as pd
   from deltalake.writer import write_deltalake
   from deltalake import DeltaTable

   # Create Pandas DataFrame
   df = pd.DataFrame(range(5))

   # Write Delta Lake table
   write_deltalake("/tmp/deltars_table", df)

   # Append new data
   df = pd.DataFrame(range(6, 11))
   write_deltalake("/tmp/deltars_table", df, mode="append")

   # Read Delta Lake table
   dt = DeltaTable("/tmp/deltars_table")

   # Show Delta table
   dt.to_pandas()
   ```

<details>
  <summary>Click to view output</summary>

   ```bash
   dt.to_pandas() 

   ## Output
       0
   0   0
   ... ...
   8   9
   9  10
   ```
</details>

<details>
  <summary><b>Click for more examples including files information and time travel</b></summary>

  4.1. Review the files
  ```python
  # List files for the Delta table
  dt.files()
  ```
  ```python
  ## Output
  ['0-0ba7c7af-28bd-4125-84a4-acab9898b2dc-0.parquet', '1-00e32c3a-d7ec-484f-a347-29d9f54c1a6c-0.parquet']
  ```

  4.2. Review history
  ```python
  # Review history
  dt.history()
  ```
  ```python  
  ## Output
  [{'delta-rs': '0.5.0', 'timestamp': 1670708720583}, {'clientVersion': 'delta-rs.0.5.0', 'operation': 'delta-rs.Write', 'operationParameters': {'mode': 'Append', 'partitionBy': [], 'predicate': None}, 'timestamp': 1670708731359}]
  ```

  4.3. Time Travel (load older version of table)
  ```python
  # Load initial version of table
  dt.load_version(0)

  # Show table
  dt.to_pandas()
  ```
  ```python  
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

6. To verify that you have a Delta table, you can list the contents within the folder of your Delta table. For example, in the previous code, you saved the table in /tmp/deltars-table. Once you close your pyspark process, run a list command in your Docker shell and you should get something similar to below.

<details><summary>Click to view output</summary>
```bash
$ ls -lsgA /tmp/deltars_table
total 12
4 -rw-r--r-- 1 NBuser 1610 Dec 10 21:45 0-0ba7c7af-28bd-4125-84a4-acab9898b2dc-0.parquet
4 -rw-r--r-- 1 NBuser 1612 Dec 10 21:45 1-00e32c3a-d7ec-484f-a347-29d9f54c1a6c-0.parquet
4 drwxr-xr-x 2 NBuser 4096 Dec 10 21:45 _delta_log   
```
</details>

7. [Optional] Skip ahead to try out the [Delta Rust API](#delta-rust-api) and [ROAPI](#optional-roapi)

### Jupyter Lab Notebook

1. Open a bash shell (if on windows use git bash, WSL, or any shell configured for bash commands)
2. Run a container from the built image with a Juypter Lab entrypoint

   ```bash
   docker run --rm -it -p 8888-8889:8888-8889 delta_quickstart
   ```

3. Follow or cut/paste the Jupyter Lab
4. Open the quickstart notebook and follow along

**Note that you may also use launch the pyspark or scala shells after launching a terminal in Jupyter Lab**

### Pyspark Shell

1. Open a bash shell (if on windows use git bash, WSL, or any shell configured for bash commands)
2. Run a container from the built image with a bash entrypoint

   ```bash
   docker run --rm -it --entrypoint bash delta_quickstart
   ```

3. Launch a pyspark interactive shell session

   ```bash
   $SPARK_HOME/bin/pyspark --packages io.delta:${DELTA_PACKAGE_VERSION} \
   --conf "spark.sql.extensions=io.delta.sql.DeltaSparkSessionExtension" \
   --conf "spark.sql.catalog.spark_catalog=org.apache.spark.sql.delta.catalog.DeltaCatalog"
   ```

4. Run some basic commands in the shell

   ```python
   # Create Spark DataFrame
   data = spark.range(0, 5)

   # Write Delta table
   data.write.format("delta").save("/tmp/delta-table")

   # Read Delta table
   df = spark.read.format("delta").load("/tmp/delta-table")

   # Show Delta table
   df.show()
   ```

5. Continue with the quickstart [here](https://docs.delta.io/latest/quick-start.html#create-a-table&language-python)

6. To verify that you have a Delta table, you can list the contents within the folder of your Delta table. For example, in the previous code, you saved the table in /tmp/delta-table. Once you close your pyspark process, run a list command in your Docker shell and you should get something similar to below.

<details><summary>Click to view output</summary>
```bash
$ ls -lsgA /tmp/delta-table
total 36
4 drwxr-xr-x 2 NBuser 4096 Oct 18 02:02 _delta_log
4 -rw-r--r-- 1 NBuser  478 Oct 18 02:02 part-00000-b968d89a-b299-401f-a6db-ba0c160633ab-c000.snappy.parquet
4 -rw-r--r-- 1 NBuser   12 Oct 18 02:02 .part-00000-b968d89a-b299-401f-a6db-ba0c160633ab-c000.snappy.parquet.crc
4 -rw-r--r-- 1 NBuser  478 Oct 18 02:02 part-00001-f0f8ea27-b522-4c2c-8fe3-7224fccacb91-c000.snappy.parquet
4 -rw-r--r-- 1 NBuser   12 Oct 18 02:02 .part-00001-f0f8ea27-b522-4c2c-8fe3-7224fccacb91-c000.snappy.parquet.crc
4 -rw-r--r-- 1 NBuser  478 Oct 18 02:02 part-00002-b8a1ea0d-0637-4432-8ab6-8ec864edb6b0-c000.snappy.parquet
4 -rw-r--r-- 1 NBuser   12 Oct 18 02:02 .part-00002-b8a1ea0d-0637-4432-8ab6-8ec864edb6b0-c000.snappy.parquet.crc
4 -rw-r--r-- 1 NBuser  486 Oct 18 02:02 part-00003-ba20f466-8cb6-4827-9c10-218e8933f0f7-c000.snappy.parquet
4 -rw-r--r-- 1 NBuser   12 Oct 18 02:02 .part-00003-ba20f466-8cb6-4827-9c10-218e8933f0f7-c000.snappy.parquet.crc
```
</details>

### Scala Shell

1. Open a bash shell (if on windows use git bash, WSL, or any shell configured for bash commands)
2. Run a container from the built image with a bash entrypoint

   ```bash
   docker run --rm -it --entrypoint bash delta_quickstart
   ```

3. Launch a scala interactive shell session

   ```bash
   $SPARK_HOME/bin/spark-shell --packages io.delta:${DELTA_PACKAGE_VERSION} \
   --conf "spark.sql.extensions=io.delta.sql.DeltaSparkSessionExtension" \
   --conf "spark.sql.catalog.spark_catalog=org.apache.spark.sql.delta.catalog.DeltaCatalog"
   ```

4. Run some basic commands in the shell

   ```scala

   // Create Spark DataFrame
   val data = spark.range(0, 5)

   // Write Delta table
   data.write.format("delta").save("/tmp/delta-table")

   // Read Delta table
   val df = spark.read.format("delta").load("/tmp/delta-table")

   // Show Delta table
   df.show()
   ```

5. Follow the quickstart [here](https://docs.delta.io/latest/quick-start.html#create-a-table&language-scala)

6. To verify that you have a Delta table, you can list the contents within the folder of your Delta table. For example, in the previous code, you saved the table in /tmp/delta-table. Once you close your pyspark process, run a list command in your Docker shell and you should get something similar to below.

<details><summary>Click to view output</summary>
```bash
$ ls -lsgA /tmp/delta-table
total 36
4 drwxr-xr-x 2 NBuser 4096 Oct 18 02:02 _delta_log
4 -rw-r--r-- 1 NBuser  478 Oct 18 02:02 part-00000-b968d89a-b299-401f-a6db-ba0c160633ab-c000.snappy.parquet
4 -rw-r--r-- 1 NBuser   12 Oct 18 02:02 .part-00000-b968d89a-b299-401f-a6db-ba0c160633ab-c000.snappy.parquet.crc
4 -rw-r--r-- 1 NBuser  478 Oct 18 02:02 part-00001-f0f8ea27-b522-4c2c-8fe3-7224fccacb91-c000.snappy.parquet
4 -rw-r--r-- 1 NBuser   12 Oct 18 02:02 .part-00001-f0f8ea27-b522-4c2c-8fe3-7224fccacb91-c000.snappy.parquet.crc
4 -rw-r--r-- 1 NBuser  478 Oct 18 02:02 part-00002-b8a1ea0d-0637-4432-8ab6-8ec864edb6b0-c000.snappy.parquet
4 -rw-r--r-- 1 NBuser   12 Oct 18 02:02 .part-00002-b8a1ea0d-0637-4432-8ab6-8ec864edb6b0-c000.snappy.parquet.crc
4 -rw-r--r-- 1 NBuser  486 Oct 18 02:02 part-00003-ba20f466-8cb6-4827-9c10-218e8933f0f7-c000.snappy.parquet
4 -rw-r--r-- 1 NBuser   12 Oct 18 02:02 .part-00003-ba20f466-8cb6-4827-9c10-218e8933f0f7-c000.snappy.parquet.crc
```
</details>

### Delta Rust API
1. Open a bash shell (if on windows use git bash, WSL, or any shell configured for bash commands)

2. Run a container from the built image with a bash entrypoint

   ```bash
   docker run --rm -it --entrypoint bash delta_quickstart
   ```

3. Execute `examples/read_delta_table.rs` to review the Delta table metadata and files of the `covid19_nyt` Delta table.
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


4. Execute `examples/read_delta_datafusion.rs` to query the `covid19_nyt` Delta table using `datafusion`
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
You can query your Delta Lake table with [Apache Arrow](https://github.com/apache/arrow) and [Datafusion](https://github.com/apache/arrow-datafusion) using [ROAPI](https://roapi.github.io/docs/config/dataset-formats/delta.html) which is pre-installed in this docker.

> Note, If you need to do this in your environment, run the command `pip3 install roapi`

1. Open a bash shell (if on windows use git bash, WSL, or any shell configured for bash commands)

2. Run a container from the built image with a bash entrypoint

   ```bash
   docker run --rm -it --entrypoint bash delta_quickstart
   ```


3. Start the `roapi` API using the following command.  Note, the API calls are pushed to the `nohup.out` file.
   ```bash
   nohup roapi --table 'deltars_table=/tmp/deltars_table/,format=delta' --table 'covid19_nyt=/opt/spark/work-dir/rs/data/COVID-19_NYT,format=delta' &
   ```

4. Check the schema of the two Delta tables
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

[{"0":6},{"0":7},{"0":8},{"0":9},{"0":10},{"0":0},{"0":1},{"0":2},{"0":3},{"0":4}]
```
</details>


6. Query the `covid19_nyt` table
   ```bash
   curl -X POST -d "SELECT cases, county, date FROM covid19_nyt LIMIT 5" localhost:8080/api/sql
   ```

<details><summary>Click to view output</summary>
```bash
curl -X POST -d "SELECT cases, county, date FROM covid19_nyt LIMIT 5" localhost:8080/api/sql

[
   {"cases":987,"county":"San Benito","date":"2020-08-25"},
   {"cases":45666,"county":"San Bernardino","date":"2020-08-25"},
   {"cases":37057,"county":"San Diego","date":"2020-08-25"},
   {"cases":8984,"county":"San Francisco","date":"2020-08-25"},
   {"cases":16565,"county":"San Joaquin","date":"2020-08-25"}
]
```
</details>