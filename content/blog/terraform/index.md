---
title: "Terraform ☁️"
date: 2022-08-28T23:27:25+02:00
draft: false
hideLastModified: true
summaryImage: "img/terraform.webp"
keepImageRatio: true
summary: "Terraform ist ein Tool zum Wolken bauen. Ein erster Einblick im Zusammenspiel mit Digital Ocean."
showInMenu: false
tags: ["Terraform", "DevOps", "IaC"]
---

Terraform ist ein mächtiges Tool, das es ermöglicht, **Infrastruktur als Code (IaC)** zu verwalten.
Es ist besonders nützlich für große Cloud-Umgebungen, da es die Bereitstellung, Verwaltung und Skalierung von Ressourcen automatisiert.
In diesem Erfahrungsbericht beschreibe ich,
wie ich mithilfe von Terraform virtuelle Maschinen (VMs) bei [DigitalOcean](https://www.digitalocean.com)
erstellt und darauf das [Juice Shop](https://owasp.org/www-project-juice-shop/) Projekt bereitgestellt habe.

**Hinweis**: Juice Shop ist ein absichtlich unsicheres Webprojekt, das zur Übung von Sicherheitsprüfungen dient.
Es sollte nur zu Lernzwecken verwendet und niemals in einer Produktionsumgebung betrieben werden.


## Installation von Terraform ✨

Die Installation von Terraform unter Ubuntu oder Debian ist unkompliziert.
Mit den folgenden Befehlen kann es schnell eingerichtet werden:

{{< codeWide >}}
wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor | sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg]https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install terraform
{{< /codeWide >}}

## Aufbau einer Terraform-Konfigurationsdatei
Terraform-Konfigurationen werden in Dateien geschrieben, die die Bereitstellung von Infrastruktur definieren.
Im Folgenden zeige ich den grundlegenden Aufbau einer Konfiguration, um VMs auf DigitalOcean zu erstellen.


### Festlegen des Providers

Zunächst muss der Cloud-Provider festgelegt werden.
Terraform unterstützt viele Anbieter, wie AWS, Microsoft Azure und andere. 
Es ist sogar möglich, mit der eigenen Cloud zu kommunizieren, z.B. mit Kubernetes, VMware oder auch Proxmox.
In meinem Test habe ich DigitalOcean verwendet, da die Anzahl der zu verfügung stehenden Dienste überschaubar ist.


Hier ist der Code, um den DigitalOcean-Provider zu konfigurieren:
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

Nachdem der Provider definiert ist, benötigt Terraform Zugriff auf das DigitalOcean-Konto.
Dazu muss ein API-Token erstellt werden.
Diesen Token können wir Terraform übergeben, am besten über Umgebungsvariablen oder ein Secrets-Management-System.
Der Einfachheit halber habe ich ihn direkt im Code hinterlegt (dies sollte jedoch in der Praxis vermieden werden):

{{< codeWide >}}
provider "digitalocean" {
    token = "DEIN_DIGITALOCEAN_TOKEN"
}
{{< /codeWide >}}


### Ressourcen anlegen

Nun können wir Ressourcen, wie eine Droplet-VM, definieren.
Eine Droplet ist bei DigitalOcean der Begriff für eine VM.

{{< codeWide >}}
resource "digitalocean_droplet" "web" {
    count = 1
    image = "ubuntu-22-04-x64"
    name = "saftig.${count.index}"
    region = "fra1"
    size = "s-1vcpu-1gb"
    ssh_keys = [""]
{{< /codeWide >}}

Der Parameter `count` gibt die Anzahl der zu erstellenden VMs an.
Mit Terraform lässt sich problemlos eine große Anzahl von Instanzen bereitstellen, ohne zusätzlichen Aufwand.
So ist es beispielsweise genauso einfach, zwei VMs zu erstellen wie 200. 

Für die SSH-Verbindung müssen zuvor die Fingerprints der SSH-Keys bei DigitalOcean hinterlegt werden.

### Verbindung zu den VMs herstellen

Um Befehle auf den VMs auszuführen, wird eine SSH-Verbindung benötigt:
{{< codeWide >}}
    connection {
        host = self.ipv4_address
        user = "root"
        type = "ssh"
        private_key = file("")
        timeout = "2m"
    }
{{< /codeWide >}}

Bei `private_key` muss der Pfad zum File eingetragen werden.

### Installation von Juice Shop 🧃
Es folgen nun die Commands, die nach dem Erstellen der VM ausgeführt werden.

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


Hiermit wird der Juice Shop-Container heruntergeladen und gestartet, mithilfe von `podman`.

## Nützliche Terraform-Befehle

Terraform arbeitet ähnlich wie Git mit verschiedenen Sub-Kommandos. 
Im Folgenden die wichtigsten:


- Um die Infrastruktur bereitzustellen, verwenden wir:
{{< codeWide >}}
terraform apply
{{< /codeWide >}}

- Um sich den aktuellen Zustand der Ressourcen anzusehen:
{{< codeWide >}}
terraform show
{{< /codeWide >}}

- Um alle erstellten Ressourcen wieder zu löschen:
{{< codeWide >}}
terraform destroy
{{< /codeWide >}}

## Fazit 🎉

Terraform hat mich beeindruckt.
Der Einstieg war überraschend einfach, und ich konnte in kürzester Zeit Infrastruktur bereitstellen.
Besonders die Fähigkeit, Infrastruktur skalierbar und wiederholbar zu verwalten,
macht Terraform für zukünftige Projekte sehr interessant.

Falls Sie Anmerkungen, Vorschläge oder Fragen haben, können Sie sich gerne per E-Mail, LinkedIn oder GitHub bei mir melden.
