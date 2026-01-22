# How to Use Google Cloud Storage for Project Thumbnails

Since we switched to manual URL input for thumbnails, here is the process to host your images on Google Cloud Storage (GCS) and use them in the Admin Panel.

## Prerequisite: Create a Public Bucket
If you haven't already, you need a GCS bucket that allows public access to its files.

1.  Go to the [Google Cloud Console - Cloud Storage](https://console.cloud.google.com/storage/browser).
2.  Click **Create Bucket**.
3.  **Name**: Enter a unique name (e.g., `my-portfolio-assets-public`).
4.  **Location**: Choose a region close to your users (e.g., `us-central1`).
5.  **Access Control**:
    *   Uncheck "Enforce public access prevention on this bucket".
    *   Choose **Uniform** access control (simplifies permissions).
6.  Click **Create**.
7.  **Make it Public**:
    *   Go to the **Permissions** tab of your new bucket.
    *   Click **Grant Access**.
    *   **New Principals**: Type `allUsers`.
    *   **Role**: Select `Cloud Storage` > `Storage Object Viewer`.
    *   Click **Save** and confirm.

> **Note**: This makes *everything* in this bucket publicly readable. Do not store sensitive data here.

## Step-by-Step Upload Process

1.  **Upload Image**:
    *   Open your bucket in the Google Cloud Console.
    *   Click **Upload Files**.
    *   Select your image file (e.g., `thumbnail.png`) from your computer.

2.  **Get the Link**:
    *   Once uploaded, find the file in the list.
    *   Click on the file name or the three dots menu.
    *   Look for the **Public URL** or **Authenticated URL**.
    *   Since we made the bucket public, you can use the direct link format:
        ```
        https://storage.googleapis.com/<YOUR_BUCKET_NAME>/<YOUR_FILE_NAME>
        ```
    *   *Example*: `https://storage.googleapis.com/my-portfolio-assets-public/project-alpha-thumb.jpg`

3.  **Use in Admin Panel**:
    *   Go to your Portfolio Admin Panel > Projects.
    *   Create or Edit a project.
    *   Paste the link into the **Thumbnail URL** field.
    *   Save the project.

Your image should now appear on the public site!
