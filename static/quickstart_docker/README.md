# What is this?

This folder contains instructions and materials to get new users started with Delta Lake and work through the quickstart materials. Follow the steps below to build an Apache Spark image with Delta Lake intalled, run a container, and follow the quickstart in an interactive notebook or shell.

1. [Build the image](#Build-the-Image)
2. [Choose an interface](#Choose-an-Interface)

## Build the Image

1. Clone this repo
2. Navigate to the cloned folder
3. Navigate to the quickstart_docker folder
4. open a bash shell (if on windows use git bash, WSL, or any shell configured for bash commands)
5. Execute the following

   ```bash
   cd quickstart_docker
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
   write_deltalake("/tmp/deltars-table", df)

   # Append new data
   df = pd.DataFrame(range(6, 11))
   write_deltalake("/tmp/deltars-table", df, mode="append")

   # Read Delta Lake table
   dt = DeltaTable("/tmp/deltars-table")

   # If you want to read the Delta table that you created in PySpark/Spark-shell previously 
   # Uncomment the following line and run this one instead
   #dt = DeltaTable("/tmp/delta-table")

   # Show Delta table
   dt.to_pandas()

   ## Output
       0
   0   0
   ... ...
   8   9
   9  10
   ```

<details>
  <summary><b>Click for more examples including files information and time travel</b></summary>

  1. Review the files
  ```
  # List files for the Delta table
  dt.files()

  ## Output
  ['0-0ba7c7af-28bd-4125-84a4-acab9898b2dc-0.parquet', '1-00e32c3a-d7ec-484f-a347-29d9f54c1a6c-0.parquet']
  ```

  2. Review history
  ```
  # Review history
   dt.history()

  ## Output
  [{'delta-rs': '0.5.0', 'timestamp': 1670708720583}, {'clientVersion': 'delta-rs.0.5.0', 'operation': 'delta-rs.Write', 'operationParameters': {'mode': 'Append', 'partitionBy': [], 'predicate': None}, 'timestamp': 1670708731359}]
  ```

  3. Time Travel (load older version of table)
  ```
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

6. To verify that you have a Delta table, you can list the contents within the folder of your Delta table. For example, in the previous code, you saved the table in /tmp/deltars-table. Once you close your pyspark process, run a list command in your Docker shell and you should get something similar to below.

   ```bash
   $ ls -lsgA /tmp/deltars-table
   total 8
   4 -rw-r--r-- 1 NBuser 1610 Nov 30 04:42 0-8ec75750-f9f5-40e8-b098-f54a60fd2112-0.parquet
   4 drwxr-xr-x 2 NBuser 4096 Nov 30 04:42 _delta_log
   ```


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

