#[tokio::main(flavor = "current_thread")]
async fn main() -> Result<(), deltalake::DeltaTableError> {
    // Note, this table was created using the Delta Rust Python example
    let table_path = "/tmp/deltars_table";
    let table_meta = deltalake::open_table(table_path).await?;
    println!("\r\n=== Delta Table Metadata from Transaction Log ===");
    println!("{}", table_meta);

    Ok(())
}