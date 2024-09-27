---
title: "Terraform ☁️"
date: 2022-08-28T23:27:25+02:00
draft: false
hideLastModified: true
summaryImage: "img/terraform.png"
keepImageRatio: true
summary: "A first insight into Terraform with the interaction to Digital Ocean."
showInMenu: false
tags: ["Terraform", "DevOps", "IaC"]
---

Terraform is a powerful tool that enables **Infrastructure as Code (IaC)** management.
It is particularly useful for large cloud environments, automating the provisioning,
management, and scaling of resources.
In this post, I will describe how I used Terraform to create virtual machines (VMs) on [DigitalOcean](https://www.digitalocean.com) and deployed the Juice Shop project on them.

**Note**: Juice Shop is a deliberately insecure web application designed to teach security testing.
It should only be used for educational purposes and never in a production environment.

## Installing Terraform ✨

Installing Terraform on Ubuntu or Debian is straightforward. You can set it up quickly using the following commands:

{{< codeWide >}}
wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor | sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg]https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install terraform
{{< /codeWide >}}

## Building a Terraform Configuration File

Terraform configurations are written in files that define the infrastructure resources you want to create.
Below is a basic example of how to configure Terraform to create VMs on DigitalOcean.

### Defining the Provider

First, the cloud provider must be specified.
Terraform supports many providers such as Amazon AWS, Microsoft Azure, and others.
For this test, I chose DigitalOcean as it offers a simpler alternative to larger providers.

Here’s the code to configure the DigitalOcean provider:
{{< codeWide >}}
terraform {
    required_providers {
        digitalocean = {
            source = "digitalocean/digitalocean"
            version = "~> 2.0"
        }
    }
}
{{< /codeWide >}}

After defining the provider, Terraform needs access to your DigitalOcean account via an API token.
This token can be passed to Terraform through environment variables or a secret management tool.
For simplicity, I have included it directly in the code (though this is not recommended for production):

{{< codeWide >}}
provider "digitalocean" {
    token = "YOUR_DIGITALOCEAN_TOKEN"
}
{{< /codeWide >}}

### Defining Resources

Now we can define resources, such as a droplet, which is DigitalOcean's term for a VM.

{{< codeWide >}}
resource "digitalocean_droplet" "web" {
    count = 1
    image = "ubuntu-22-04-x64"
    name = "saftig.${count.index}"
    region = "fra1"
    size = "s-1vcpu-1gb"
    ssh_keys = [""]
{{< /codeWide >}}

The `count` parameter defines how many VMs to create.
Terraform makes it as easy to create 200 VMs as it is to create two.

For SSH access, you need to provide the fingerprints of your SSH keys, which must be pre-registered with DigitalOcean.

### Establishing a Connection

To execute commands on the VMs, we need to set up an SSH connection:
{{< codeWide >}}
    connection {
        host = self.ipv4_address
        user = "root"
        type = "ssh"
        private_key = file("PATH_TO_SSH_KEY")
        timeout = "2m"
    }
{{< /codeWide >}}

### Installing Juice Shop 🧃

Once the VMs are created, we can use `podman` to pull and run the Juice Shop container on the droplets:
{{< codeWide >}}
    provisioner "remote-exec" {
        inline = [
            "export PATH=$PATH:/usr/bin",
            # install Juice Shop
            "sudo apt install -y podman",
            "sudo podman pull docker.io/bkimminich/juice-shop",
            "sudo podman run -d --rm -p 3000:3000 bkimminich/juice-shop"
        ]
    }
}
{{< /codeWide >}}

This pulls and starts the Juice Shop container.

## Useful Terraform Commands

Terraform uses a similar command structure to Git.
Here are some of the key commands:

- To apply your configuration and provision resources:
{{< codeWide >}}
terraform apply
{{< /codeWide >}}

- To view the current state of your deployment:
{{< codeWide >}}
terraform show
{{< /codeWide >}}

- Um alle erstellten Ressourcen wieder zu löschen:
{{< codeWide >}}
terraform destroy
{{< /codeWide >}}

## Conclusion 🎉
I was really impressed with how easy it was to get started with Terraform.
I can definitely see myself using it for more projects in the future, especially with its ability to manage infrastructure at scale with minimal effort.