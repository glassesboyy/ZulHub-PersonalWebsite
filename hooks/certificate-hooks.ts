import { useToast } from "@/hooks/use-toast";
import { Certificate } from "@/types/certificate";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

export function useCertificates() {
  const { toast } = useToast();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const supabase = createClient();

  const fetchCertificates = async () => {
    try {
      const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .order('created_at', { ascending: false });
      if (error) {
        console.error("Error fetching certificates:", error.message);
        return;
      }
      setCertificates(data || []);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const uploadImage = async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `certificates/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('certificate-image')  // Mengubah nama bucket sesuai dengan yang ada di Supabase
        .upload(filePath, file);

      if (uploadError) {
        console.error('Error uploading image:', uploadError.message);
        return null;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('certificate-image')  // Mengubah nama bucket sesuai dengan yang ada di Supabase
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

  const createCertificate = async (title: string, imageFile: File) => {
    try {
      const imageUrl = await uploadImage(imageFile);
      if (!imageUrl) {
        toast({
          title: "Error",
          description: "Failed to upload image",
          variant: "destructive",
        });
        return false;
      }

      const { error } = await supabase
        .from("certificates")
        .insert([{ title, certificate_image: imageUrl }]);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to create certificate",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Success",
        description: "Certificate created successfully",
      });
      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateCertificate = async (id: string, title: string, imageFile: File | null) => {
    try {
      let imageUrl = null;
      
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
        if (!imageUrl) {
          toast({
            title: "Error",
            description: "Failed to upload image",
            variant: "destructive",
          });
          return false;
        }
      }

      const updateData = {
        title,
        ...(imageUrl && { certificate_image: imageUrl }),
      };

      const { error } = await supabase
        .from("certificates")
        .update(updateData)
        .eq("id", id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update certificate",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Success",
        description: "Certificate updated successfully",
      });
      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteCertificate = async (id: number) => {
    try {
      // Ambil data sertifikat terlebih dahulu untuk mendapatkan URL gambar
      const certificate = await fetchCertificateById(id.toString());
      if (!certificate) return false;

      // Extract filename dari URL
      const imageUrl = certificate.certificate_image;
      const fileName = imageUrl.split('/').pop();
      const filePath = `certificates/${fileName}`;

      // Hapus file dari storage
      const { error: storageError } = await supabase.storage
        .from('certificate-image')
        .remove([filePath]);

      if (storageError) {
        console.error("Error deleting image from storage:", storageError.message);
        toast({
          title: "Error",
          description: "Failed to delete certificate",
          variant: "destructive",
        });
        return false;
      }

      // Hapus data dari database
      const { error: dbError } = await supabase
        .from("certificates")
        .delete()
        .eq("id", id);

      if (dbError) {
        console.error("Error deleting certificate:", dbError.message);
        toast({
          title: "Error",
          description: "Failed to delete certificate",
          variant: "destructive",
        });
        return false;
      }

      await fetchCertificates();
      toast({
        title: "Success",
        description: "Certificate deleted successfully",
      });
      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    }
  };

  const bulkDeleteCertificates = async (ids: number[]) => {
    try {
      // Ambil semua certificate yang akan dihapus
      const { data: certificates } = await supabase
        .from("certificates")
        .select()
        .in("id", ids);

      if (certificates) {
        // Hapus semua file dari storage
        for (const cert of certificates) {
          const fileName = cert.certificate_image.split('/').pop();
          const filePath = `certificates/${fileName}`;
          
          await supabase.storage
            .from('certificate-image')
            .remove([filePath]);
        }
      }

      // Hapus data dari database
      const { error } = await supabase
        .from("certificates")
        .delete()
        .in("id", ids);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to delete certificates",
          variant: "destructive",
        });
        return false;
      }
      
      await fetchCertificates();
      toast({
        title: "Success",
        description: `${ids.length} certificate(s) deleted successfully`,
      });
      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    }
  };

  const fetchCertificateById = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from("certificates")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching certificate:", error.message);
        return null;
      }
      return data;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  return {
    certificates,
    fetchCertificates,
    createCertificate,
    updateCertificate,
    deleteCertificate,
    fetchCertificateById,
    uploadImage,
    bulkDeleteCertificates,
  };
}
