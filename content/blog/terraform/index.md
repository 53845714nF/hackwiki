---
title: "Erfahrungsbericht über Terraform ☁️"
date: 2022-08-28T23:27:25+02:00
draft: false
hideLastModified: true
summaryImage: "img/terraform.png"
keepImageRatio: true
summary: "Terraform ist ein Tool zum Wolken bauen. Ein erster Einblick im Zusammenspiel mit Digital Ocean"
showInMenu: false
tags: ["Cloud"]
---

## Erste Schritte bei Digital Ocean

Terraform ist ein Tool, das es ermöglicht, Infrastruktur als Code abzubilden und ist insbesondere für große Cloud-Instanzen gedacht. In diesem Erfahrungsbericht werde ich beschreiben, wie ich mit Hilfe von Terraform virtuelle Maschinen (VMs) bei Digital Ocean erstellt habe und auf ihnen das Projekt [Juice Shop](https://owasp.org/www-project-juice-shop/) zum Laufen gebracht habe.

Hinweis: Juice Shop ist ein Projekt, das absichtlich Web-Schwachstellen enthält. Es dient nur zu Lernzwecken und ist nicht für den produktiven Einsatz gedacht.

## Installation

Die Installation von Terraform ist einfach. Unter Ubuntu kann es wie folgt installiert werden:

{{< codeWide >}}
wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor | sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg]https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install terraform
{{< /codeWide >}}

## Aufbau eines Terraform-Files

Der Aufbau eines Terraform-Files besteht darin, Code in eine Datei zu schreiben, die Terraform ausführen wird.

### Festlegen des Providers

Zunächst muss der Provider definiert werden. Hierfür gibt es verschiedene Anbieter die Terraform unterstützt. Die bekanntesten Anbieter sind Amazon's AWS und Microsoft's Azure. Es gibt jedoch auch viele andere Provider. Es ist sogar möglich, mit der eigenen Cloud zu kommunizieren, z.B. mit K8S, VMware oder auch Proxmox.

In meinem Test habe ich mich für [Digital Ocean](https://www.digitalocean.com) entschieden. Es ist nicht sehr günstig, aber es gibt gelegentlich Rabattcodes, um ihre Produkte zu testen.
Digital Ocean ist ein recht kleiner Cloud-Anbieter, der keine so komplexe Struktur wie AWS hat.

Um einen Provider in Terraform zu konfigurieren, wird ein `main.tf` File erstellt. Der Code für Digital Ocean sieht wie folgt aus:

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

Danach müssen wir einen Token in Digital Ocean erstellen, dieser erlaubt es Terraform dann unter euren Account, auf die Cloud zuzugreifen.
Natürlich müssen wir diesen Token dann auch Terraform mitteilen, hierfür gibt es verschiedene Methoden, da so sensible Daten nicht direkt im Code stehen sollten.
Der einfach halt halber hab ich ihn erst mal in den Code geschrieben:

{{< codeWide >}}
provider "digitalocean" {
token = ""
}
{{< /codeWide >}}

Anstelle von "" muss der Token von Digital Ocean eingefügt werden.

### Anlegen von Ressourcen

Nun können wir Ressourcen definieren, in unserem Fall eine Droplet, was der Begriff für VMs bei Digital Ocean ist.

{{< codeWide >}}
resource "digitalocean_droplet" "web" {
count = 1
image = "ubuntu-22-04-x64"
name = "saftig.${count.index}"
region = "fra1"
size = "s-1vcpu-1gb"
ssh_keys = [""]
{{< /codeWide >}}

Der `count` gibt an, wie viele VMs erzeugt werden sollen. Dies ist optional. Ich habe das ergänzt, um zu sehen, wie es ist, mehrere VMs gleichzeitig zu erstellen. So wie ich das sehe, ist hier eine der Stärken von Terraform. Es macht genauso viel Aufwand, zwei VMs zu erzeugen wie 200.

Bei den `ssh_keys` müssen die Fingerprints der SSH-Keys eingetragen werden. Diese müssen jedoch schon bei Digital Ocean hinterlegt sein.

### Connection definieren

Um nun Commands auf den Servern auszuführen, muss die Verbindung aufgebaut werden. Dies passiert über SSH.

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

Hier wird mit `podman` der Container von Juice Shop geladen und ausgeführt.

## Terraform Commands

Die Terraform Commands sind ähnlich wie Git aufgebaut. Es gibt den `terraform` Command und dieser hat verschiedene Sub-Commands.

Mit `apply` können wir nun unseren Code ausrollen:
{{< codeWide >}}
terraform apply
{{< /codeWide >}}

Unser aktuelles Deployment können wir mit `show` ansehen:
{{< codeWide >}}
terraform show
{{< /codeWide >}}

Mit `destroy` können wir unser Werk auch wieder schnell zerstören.
{{< codeWide >}}
terraform destroy
{{< /codeWide >}}

## Fazit

Ich war sehr positiv beeindruckt, wie einfach der Einstieg in Terraform ist. Ich kann mir vorstellen, dass ich das in Zukunft noch öfter für Projekte einsetzen werde.
